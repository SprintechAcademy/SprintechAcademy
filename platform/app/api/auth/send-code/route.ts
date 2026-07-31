import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateOTPCode, hashCode } from '@/lib/auth'
import { sendAccessCode } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Correo inválido' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Rate limit: 1 code per 60 seconds per email
    const since = new Date(Date.now() - 60_000).toISOString()
    const { count } = await supabase
      .from('access_codes')
      .select('id', { count: 'exact', head: true })
      .eq('email', normalizedEmail)
      .eq('used', false)
      .gte('created_at', since)

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        { error: 'Espera 60 segundos antes de solicitar otro código' },
        { status: 429 }
      )
    }

    // Invalidate previous unused codes
    await supabase
      .from('access_codes')
      .update({ used: true })
      .eq('email', normalizedEmail)
      .eq('used', false)

    // Generate & store new code
    const code = generateOTPCode()
    const code_hash = await hashCode(code)
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    await supabase.from('access_codes').insert({
      email: normalizedEmail,
      code_hash,
      expires_at,
    })

    // Get user name if exists
    const { data: userProfile } = await supabase
      .from('users')
      .select('nombre_completo')
      .eq('email', normalizedEmail)
      .single()

    await sendAccessCode(normalizedEmail, code, userProfile?.nombre_completo)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('send-code error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
