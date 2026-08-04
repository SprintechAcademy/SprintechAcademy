'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/platform/Logo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

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
    <>
      {/* Success banner (post-payment) */}
      {enrolled && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-lime/10 border border-lime/25 text-sm text-lime text-center leading-snug">
          ¡Pago exitoso! Ingresa tu correo para acceder.
        </div>
      )}

      {/* Heading block */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight leading-snug mb-2">
          Accede a la plataforma
        </h1>
        <p className="text-sm text-white/45 leading-relaxed">
          Te enviamos un código de 6 dígitos a tu correo.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="tu@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
        />

        {error && (
          <p className="text-sm text-red-400 text-center -mt-1">{error}</p>
        )}

        <Button
          type="submit"
          variant="lime"
          size="lg"
          loading={loading}
          className="w-full h-12 hover:brightness-110 transition-all duration-200"
        >
          Enviar código
        </Button>
      </form>

      {/* Footer links */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-xs text-white/35">
          ¿No tienes cuenta? Inscríbete en un reto o programa.
        </p>
        <a
          href="/"
          className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
        >
          ← Volver al inicio
        </a>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-carbon overflow-hidden">

      {/* Subtle purple radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 38%, rgba(139,92,246,0.09) 0%, transparent 68%)',
        }}
      />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo href="/" />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm px-10 py-10 shadow-2xl shadow-black/50">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

      </div>
    </div>
  )
}
