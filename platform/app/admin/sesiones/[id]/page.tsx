'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Session } from '@/types'

export default function EditarSesionPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const [session, setSession] = useState<Session | null>(null)
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    dia_relativo: '',
    numero_orden: '1',
    content_type: 'video',
    content_url: '',
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('sessions').select('*').eq('id', id).single()
      if (data) {
        setSession(data)
        setForm({
          titulo: data.titulo,
          descripcion: data.descripcion ?? '',
          dia_relativo: data.dia_relativo?.toString() ?? '',
          numero_orden: data.numero_orden.toString(),
          content_type: data.content_type,
          content_url: data.content_url ?? '',
        })
      }
      setLoading(false)
    }
    load()
  }, [id])

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const { error: err } = await supabase.from('sessions').update({
        titulo: form.titulo,
        descripcion: form.descripcion || null,
        dia_relativo: form.dia_relativo ? parseInt(form.dia_relativo) : null,
        numero_orden: parseInt(form.numero_orden),
        content_type: form.content_type,
        content_url: form.content_url || null,
      }).eq('id', id)
      if (err) setError(err.message)
      else router.push(`/admin/programas/${session?.program_id}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('¿Eliminar esta sesión? Esta acción no se puede deshacer.')) return
    await supabase.from('sessions').delete().eq('id', id)
    router.push(`/admin/programas/${session?.program_id}`)
  }

  if (loading) return <div className="text-white/40">Cargando...</div>
  if (!session) return <div className="text-white/40">Sesión no encontrada.</div>

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Editar sesión</h1>
        <Link href={`/admin/programas/${session.program_id}`} className="text-sm text-white/40 hover:text-white transition-colors">
          ← Volver al programa
        </Link>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
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
          placeholder="https://..."
          value={form.content_url}
          onChange={e => set('content_url', e.target.value)}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="lime" loading={saving}>Guardar cambios</Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-white/6">
        <h3 className="text-sm font-medium text-white/40 mb-3">Zona de peligro</h3>
        <Button variant="danger" onClick={handleDelete}>Eliminar sesión</Button>
      </div>
    </div>
  )
}
