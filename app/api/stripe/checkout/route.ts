import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const { program_id, email } = await req.json()

    if (!program_id) {
      return NextResponse.json({ error: 'program_id requerido' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: program } = await supabase
      .from('programs')
      .select('*')
      .eq('id', program_id)
      .eq('activo', true)
      .single()

    if (!program || !program.precio_usd) {
      return NextResponse.json({ error: 'Programa no encontrado o gratuito' }, { status: 404 })
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: program.nombre,
              description: program.descripcion ?? undefined,
            },
            unit_amount: Math.round(program.precio_usd * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { program_id },
      success_url: `${APP_URL}/login?enrolled=1&email={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/cursos/${program.slug}?cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('stripe checkout error:', err)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
