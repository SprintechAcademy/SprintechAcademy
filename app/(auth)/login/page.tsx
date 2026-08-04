'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/platform/Logo'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const enrolled = params.get('enrolled')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error enviando código')
        return
      }
      router.push(`/verificar?email=${encodeURIComponent(email.trim())}`)
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Heading */}
      <div className="text-center">
        {enrolled && (
          <div className="mb-6 px-5 py-3 rounded-2xl bg-lime/10 border border-lime/20 text-sm text-lime text-center leading-snug">
            ¡Pago exitoso! Ingresa tu correo para acceder.
          </div>
        )}
        <h1
          className="font-bold tracking-tight leading-[1.1] mb-4 text-white"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}
        >
          Accede a la{' '}
          <span className="text-lime">plataforma.</span>
        </h1>
        <p className="text-base text-white/45 leading-relaxed max-w-sm mx-auto">
          Te enviamos un código de 6 dígitos a tu correo. Sin contraseña, sin fricción.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          className="w-full h-14 bg-white/[0.06] border border-white/10 rounded-2xl px-5 text-white placeholder:text-white/35 text-base transition-all duration-200 outline-none focus:border-purple/60 focus:bg-white/[0.09] focus:ring-2 focus:ring-purple/15"
        />

        {error && (
          <p className="text-sm text-red-400 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-full bg-lime text-carbon font-bold text-base tracking-tight hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-carbon/30 border-t-carbon rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar código'
          )}
        </button>

        <p className="text-xs text-white/30 text-center pt-1">
          Acceso vía código de un solo uso · sin contraseña
        </p>
      </form>

      {/* Footer */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-white/25">
          ¿No tienes cuenta? Inscríbete en un reto o programa.
        </p>
        <a
          href="/"
          className="text-xs text-white/25 hover:text-white/55 transition-colors duration-200"
        >
          ← Volver al inicio
        </a>
      </div>

    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-carbon overflow-hidden">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 35%, rgba(139,92,246,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative w-full max-w-lg flex flex-col gap-8">

        {/* Logo + eyebrow */}
        <div className="flex flex-col items-center gap-4">
          <Logo href="/" />
          <p
            className="text-xs tracking-widest uppercase text-white/30 font-medium"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Plataforma · Acceso seguro
          </p>
        </div>

        {/* Form content */}
        <Suspense>
          <LoginForm />
        </Suspense>

      </div>
    </div>
  )
}
