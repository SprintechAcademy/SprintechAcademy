'use client'

import { Suspense, useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/platform/Logo'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

function VerificarForm() {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get('email') ?? ''
  const supabase = createClient()

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendCountdown <= 0) return
    const t = setInterval(() => setResendCountdown(c => c - 1), 1000)
    return () => clearInterval(t)
  }, [resendCountdown])

  function handleDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < 5) inputRefs.current[index + 1]?.focus()
    if (next.every(d => d !== '') && digit) {
      submitCode(next.join(''))
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 6) {
      setDigits(paste.split(''))
      submitCode(paste)
    }
  }

  async function submitCode(code: string) {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error verificando código')
        setDigits(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        return
      }

      // Sign in with the magic link token
      const { error: signInErr } = await supabase.auth.verifyOtp({
        token_hash: data.token_hash,
        type: 'magiclink',
      })

      if (signInErr) {
        setError('Error iniciando sesión. Intenta de nuevo.')
        return
      }

      router.push('/inicio')
      router.refresh()
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResendLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      setResendCountdown(60)
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2 text-center">
          Ingresa tu código
        </h1>
        <p className="text-sm text-white/45 text-center mb-2">
          Enviamos un código de 6 dígitos a
        </p>
        <p className="text-sm text-white font-medium text-center mb-10">{email}</p>

        <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              disabled={loading}
              className="w-12 h-14 text-center text-xl font-bold text-white bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}

        {loading && (
          <p className="text-sm text-white/45 text-center mb-4">Verificando...</p>
        )}

        <div className="text-center mt-6">
          {resendCountdown > 0 ? (
            <p className="text-xs text-white/30">
              Reenviar código en {resendCountdown}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2"
            >
              {resendLoading ? 'Enviando...' : 'Reenviar código'}
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/login')}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ← Cambiar correo
          </button>
        </div>
    </>
  )
}

export default function VerificarPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-carbon">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-12">
          <Logo href="/" />
        </div>
        <Suspense>
          <VerificarForm />
        </Suspense>
      </div>
    </div>
  )
}
