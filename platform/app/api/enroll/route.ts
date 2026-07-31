import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { sendEnrollmentConfirmation } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre_completo, whatsapp, email, a_que_te_dedicas, como_nos_conociste, program_id } = body

    if (!nombre_completo || !email || !program_id) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const service = createServiceClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Verify program exists and is active
    const { data: program } = await service
      .from('programs')
      .select('*')
      .eq('id', program_id)
      .eq('activo', true)
      .single()

    if (!program) {
      return NextResponse.json({ error: 'Programa no encontrado' }, { status: 404 })
    }

    // Get or create auth user
    const { data: userList } = await service.auth.admin.listUsers()
    let authUser = userList?.users.find((u: { email?: string }) => u.email === normalizedEmail)

    if (!authUser) {
      const { data: created } = await service.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
        user_metadata: { nombre_completo },
      })
      authUser = created?.user ?? undefined
    }

    if (!authUser) {
      return NextResponse.json({ error: 'Error creando usuario' }, { status: 500 })
    }

    // Upsert profile
    await service.from('users').upsert({
      id: authUser.id,
      email: normalizedEmail,
      nombre_completo,
      whatsapp: whatsapp || null,
      a_que_te_dedicas: a_que_te_dedicas || null,
      como_nos_conociste: como_nos_conociste || null,
    }, { onConflict: 'id' })

    // Create enrollment (or skip if already exists)
    const { data: existing } = await service
      .from('enrollments')
      .select('id')
      .eq('user_id', authUser.id)
      .eq('program_id', program_id)
      .single()

    if (!existing) {
      await service.from('enrollments').insert({
        user_id: authUser.id,
        program_id,
        estado_pago: 'gratis',
        activo: true,
      })

      await sendEnrollmentConfirmation(normalizedEmail, nombre_completo, program.nombre)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('enroll error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
