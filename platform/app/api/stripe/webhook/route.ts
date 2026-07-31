import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEnrollmentConfirmation } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as unknown as Record<string, unknown>
    const program_id = (session.metadata as Record<string, string>)?.program_id
    const customerEmail = session.customer_email as string | null
    const customerDetails = session.customer_details as Record<string, string> | null
    const email = customerEmail ?? customerDetails?.email

    if (!program_id || !email) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const nombre = customerDetails?.name ?? email.split('@')[0]

    // Get or create auth user
    const { data: userList } = await supabase.auth.admin.listUsers()
    let authUser = userList?.users.find((u: { email?: string }) => u.email === email)

    if (!authUser) {
      const { data: created } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { nombre_completo: nombre },
      })
      authUser = created?.user ?? undefined
    }

    if (!authUser) return NextResponse.json({ error: 'User error' }, { status: 500 })

    // Upsert profile
    await supabase.from('users').upsert({
      id: authUser.id,
      email,
      nombre_completo: nombre,
    }, { onConflict: 'id' })

    // Upsert enrollment
    await supabase.from('enrollments').upsert({
      user_id: authUser.id,
      program_id,
      estado_pago: 'pagado',
      stripe_session_id: session.id as string,
      activo: true,
    }, { onConflict: 'user_id,program_id' })

    // Get program name
    const { data: program } = await supabase
      .from('programs')
      .select('nombre')
      .eq('id', program_id)
      .single()

    if (program) {
      await sendEnrollmentConfirmation(email, nombre, program.nombre)
    }
  }

  return NextResponse.json({ received: true })
}
