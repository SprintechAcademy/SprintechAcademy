import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { enrollment_id, session_id, completado } = await req.json()

    if (!enrollment_id || !session_id || completado === undefined) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    // Verify enrollment belongs to user
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('id', enrollment_id)
      .eq('user_id', user.id)
      .single()

    if (!enrollment) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

    await supabase.from('progress').upsert({
      enrollment_id,
      session_id,
      completado,
      fecha_completado: completado ? new Date().toISOString() : null,
    }, { onConflict: 'enrollment_id,session_id' })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('progress error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
