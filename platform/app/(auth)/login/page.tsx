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

      <h1 className="text-2xl font-bold text-white tracking-tight mb-2 text-center">
        Accede a la plataforma
      </h1>
      <p className="text-sm text-white/45 text-center mb-10">
        Te enviamos un código de 6 dígitos a tu correo.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <Button type="submit" variant="lime" size="lg" loading={loading} className="w-full mt-2">
          Enviar código
        </Button>
      </form>

      <p className="text-xs text-white/25 text-center mt-8">
        ¿No tienes cuenta? Inscríbete en un reto o programa.
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-carbon">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-12">
          <Logo href="/" />
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
