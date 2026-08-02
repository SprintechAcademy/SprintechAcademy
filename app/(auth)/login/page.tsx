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
      {enrolled && (
        <div className="mb-6 p-4 rounded-xl bg-lime/10 border border-lime/20 text-sm text-lime text-center">
          ¡Pago exitoso! Ingresa tu correo para acceder.
        </div>
      )}

      <h1 className="text-3xl font-bold text-white tracking-tight mb-3 text-center">
        Accede a la plataforma
      </h1>
      <p className="text-sm text-white/50 text-center mb-8">
        Te enviamos un código de 6 dígitos a tu correo.
      </p>

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
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        <Button type="submit" variant="lime" size="lg" loading={loading} className="w-full">
          Enviar código
        </Button>
      </form>

      <p className="text-xs text-white/35 text-center mt-8">
        ¿No tienes cuenta? Inscríbete en un reto o programa.
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-carbon overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo href="/" />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-8 py-10 shadow-xl shadow-black/40">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        {/* Back link */}
        <div className="flex justify-center mt-8">
          <a
            href="/"
            className="text-xs text-white/30 hover:text-white/55 transition-colors flex items-center gap-1.5"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  )
}
