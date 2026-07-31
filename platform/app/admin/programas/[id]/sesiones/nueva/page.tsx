'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NuevaSesionPage() {
  const router = useRouter()
  const params = useParams()
  const programId = params.id as string
  const supabase = createClient()

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    dia_relativo: '',
    numero_orden: '1',
    content_type: 'video',
    content_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: err } = await supabase.from('sessions').insert({
        program_id: programId,
        titulo: form.titulo,
        descripcion: form.descripcion || null,
        dia_relativo: form.dia_relativo ? parseInt(form.dia_relativo) : null,
        numero_orden: parseInt(form.numero_orden),
        content_type: form.content_type,
        content_url: form.content_url || null,
      })
      if (err) { setError(err.message); return }
      router.push(`/admin/programas/${programId}`)
    } catch {
      setError('Error guardando sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Nueva sesión</h1>
        <Link href={`/admin/programas/${programId}`} className="text-sm text-white/40 hover:text-white transition-colors">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input label="Título" value={form.titulo} onChange={e => set('titulo', e.target.value)} required />
        <Textarea label="Descripción" value={form.descripcion} onChange={e => set('descripcion', e.target.value)} />

        <div className="grid grid-cols-2 gap-3">
          <Input label="Número de orden" type="number" min="1" value={form.numero_orden} onChange={e => set('numero_orden', e.target.value)} required />
          <Input label="Día relativo (opcional)" type="number" min="1" placeholder="Ej: 3" value={form.dia_relativo} onChange={e => set('dia_relativo', e.target.value)} />
        </div>

        <Select label="Tipo de contenido" value={form.content_type} onChange={e => set('content_type', (e.target as HTMLSelectElement).value)}>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="texto">Texto</option>
        </Select>

        <Input
          label="URL del contenido"
          type="url"
          placeholder={form.content_type === 'video' ? 'https://youtube.com/watch?v=...' : form.content_type === 'pdf' ? 'https://...' : ''}
          value={form.content_url}
          onChange={e => set('content_url', e.target.value)}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="lime" loading={loading}>Crear sesión</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
        </div>
      </form>
    </div>
  )
}
