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
    <div className="flex flex-col gap-8">

      {/* Heading */}
      <div className="text-center">
        {enrolled && (
          <div className="mb-6 px-5 py-3 rounded-2xl bg-lime/10 border border-lime/20 text-sm text-lime leading-snug">
            ¡Pago exitoso! Ingresa tu correo para acceder.
          </div>
        )}

        <h1 className="font-bold tracking-tight leading-[1.15] mb-4">
          <span className="block text-white" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
            Accede a la
          </span>
          <span className="block text-lime" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
            plataforma.
          </span>
        </h1>

        <p className="text-sm text-white/45 leading-relaxed mx-auto" style={{ maxWidth: '26ch' }}>
          Te enviamos un código de 6 dígitos a tu correo.
          Sin contraseña, sin fricción.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          className="w-full bg-white/[0.06] border border-white/10 rounded-2xl text-white placeholder:text-white/35 text-sm transition-all duration-200 outline-none focus:border-purple/60 focus:bg-white/[0.09] focus:ring-2 focus:ring-purple/15"
          style={{ height: '52px', paddingLeft: '20px', paddingRight: '20px' }}
        />

        {error && (
          <p className="text-xs text-red-400 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-lime text-carbon font-bold text-sm tracking-tight hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ height: '52px' }}
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
      </form>

      {/* Footer */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs text-white/30">
          Acceso vía código de un solo uso · sin contraseña
        </p>
        <p className="text-xs text-white/22">
          ¿No tienes cuenta? Inscríbete en un reto o programa.
        </p>
        <a
          href="/"
          className="text-xs text-white/28 hover:text-white/55 transition-colors duration-200 mt-1"
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 35%, rgba(139,92,246,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative w-full max-w-sm flex flex-col gap-8">

        <div className="flex flex-col items-center gap-3">
          <Logo href="/" />
          <p
            className="text-[10px] tracking-widest uppercase text-white/28 font-medium"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Plataforma · Acceso seguro
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

      </div>
    </div>
  )
}
