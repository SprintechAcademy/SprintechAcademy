import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { verifyCode } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Find latest valid code
    const { data: record } = await supabase
      .from('access_codes')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!record) {
      return NextResponse.json(
        { error: 'Código expirado o no encontrado. Solicita uno nuevo.' },
        { status: 400 }
      )
    }

    // Check attempt limit
    if (record.attempts >= 3) {
      await supabase.from('access_codes').update({ used: true }).eq('id', record.id)
      return NextResponse.json(
        { error: 'Demasiados intentos. Solicita un nuevo código.' },
        { status: 400 }
      )
    }

    const valid = await verifyCode(code.trim(), record.code_hash)

    if (!valid) {
      await supabase
        .from('access_codes')
        .update({ attempts: record.attempts + 1 })
        .eq('id', record.id)

      const remaining = 3 - (record.attempts + 1)
      return NextResponse.json(
        { error: `Código incorrecto. ${remaining > 0 ? `${remaining} intento(s) restante(s).` : 'Solicita un nuevo código.'}` },
        { status: 400 }
      )
    }

    // Mark code as used
    await supabase.from('access_codes').update({ used: true }).eq('id', record.id)

    // Get or create auth user
    const { data: existingUser } = await supabase.auth.admin.listUsers()
    const authUser = existingUser?.users.find((u: { email?: string }) => u.email === normalizedEmail)

    let userId: string

    if (authUser) {
      userId = authUser.id
    } else {
      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
      })
      if (createErr || !newUser.user) {
        return NextResponse.json({ error: 'Error creando cuenta' }, { status: 500 })
      }
      userId = newUser.user.id
    }

    // Generate a magic link token to create a real session
    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: normalizedEmail,
    })

    if (linkErr || !linkData?.properties?.hashed_token) {
      return NextResponse.json({ error: 'Error generando sesión' }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      token_hash: linkData.properties.hashed_token,
    })
  } catch (err) {
    console.error('verify error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
