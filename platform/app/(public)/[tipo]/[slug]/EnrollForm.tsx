'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const DEDICAS = ['Estudiante', 'Profesional de marketing', 'Profesional de publicidad', 'Emprendedor/a', 'Freelancer', 'Otro']
const CONOCISTE = ['Instagram', 'LinkedIn', 'YouTube', 'Recomendación de alguien', 'Google', 'Otro']

export function EnrollForm({ programId }: { programId: string }) {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre_completo: '',
    whatsapp: '',
    email: '',
    a_que_te_dedicas: '',
    como_nos_conociste: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, program_id: programId }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error al inscribirse')
        return
      }

      setSuccess(true)
      setTimeout(() => router.push(`/login?email=${encodeURIComponent(form.email)}`), 2000)
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="text-3xl mb-3">🎉</div>
        <p className="text-white font-semibold mb-1">¡Te inscribiste!</p>
        <p className="text-sm text-white/45">Revisa tu correo. Redirigiendo...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        label="Nombre completo"
        placeholder="Tu nombre"
        value={form.nombre_completo}
        onChange={e => set('nombre_completo', e.target.value)}
        required
      />
      <Input
        label="WhatsApp"
        placeholder="+57 300 000 0000"
        value={form.whatsapp}
        onChange={e => set('whatsapp', e.target.value)}
      />
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="tu@correo.com"
        value={form.email}
        onChange={e => set('email', e.target.value)}
        required
      />
      <Select
        label="¿A qué te dedicas?"
        value={form.a_que_te_dedicas}
        onChange={e => set('a_que_te_dedicas', (e.target as HTMLSelectElement).value)}
      >
        <option value="">Selecciona...</option>
        {DEDICAS.map(d => <option key={d} value={d}>{d}</option>)}
      </Select>
      <Select
        label="¿Cómo nos conociste?"
        value={form.como_nos_conociste}
        onChange={e => set('como_nos_conociste', (e.target as HTMLSelectElement).value)}
      >
        <option value="">Selecciona...</option>
        {CONOCISTE.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      <Button type="submit" variant="lime" size="md" loading={loading} className="w-full mt-1">
        Inscribirme gratis
      </Button>
    </form>
  )
}
