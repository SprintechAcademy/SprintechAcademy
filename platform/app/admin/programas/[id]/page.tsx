'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Program, Session } from '@/types'

export default function EditarProgramaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const [program, setProgram] = useState<Program | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [form, setForm] = useState({
    nombre: '',
    slug: '',
    tipo: 'reto',
    duracion_valor: '5',
    duracion_unidad: 'semanas',
    precio_usd: '',
    descripcion: '',
    activo: false,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [{ data: prog }, { data: sess }] = await Promise.all([
        supabase.from('programs').select('*').eq('id', id).single(),
        supabase.from('sessions').select('*').eq('program_id', id).order('numero_orden'),
      ])
      if (prog) {
        setProgram(prog)
        setForm({
          nombre: prog.nombre,
          slug: prog.slug,
          tipo: prog.tipo,
          duracion_valor: prog.duracion_valor.toString(),
          duracion_unidad: prog.duracion_unidad,
          precio_usd: prog.precio_usd?.toString() ?? '',
          descripcion: prog.descripcion ?? '',
          activo: prog.activo,
        })
      }
      setSessions(sess ?? [])
      setLoading(false)
    }
    load()
  }, [id])

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const { error: err } = await supabase.from('programs').update({
        nombre: form.nombre,
        slug: form.slug,
        tipo: form.tipo,
        duracion_valor: parseInt(form.duracion_valor),
        duracion_unidad: form.duracion_unidad,
        precio_usd: form.precio_usd ? parseFloat(form.precio_usd) : null,
        descripcion: form.descripcion || null,
        activo: form.activo,
      }).eq('id', id)
      if (err) setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function deleteSession(sessionId: string) {
    if (!confirm('¿Eliminar esta sesión?')) return
    await supabase.from('sessions').delete().eq('id', sessionId)
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  if (loading) return <div className="text-white/40">Cargando...</div>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Editar programa</h1>
        <Link href="/admin/programas" className="text-sm text-white/40 hover:text-white transition-colors">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5 mb-12">
        <Input label="Nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
        <Input label="Slug" value={form.slug} onChange={e => set('slug', e.target.value)} required />

        <div className="grid grid-cols-2 gap-3">
          <Select label="Tipo" value={form.tipo} onChange={e => set('tipo', (e.target as HTMLSelectElement).value)}>
            <option value="reto">Reto</option>
            <option value="curso">Curso</option>
          </Select>
          <Select label="Unidad" value={form.duracion_unidad} onChange={e => set('duracion_unidad', (e.target as HTMLSelectElement).value)}>
            <option value="dias">Días</option>
            <option value="semanas">Semanas</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Duración" type="number" min="1" value={form.duracion_valor} onChange={e => set('duracion_valor', e.target.value)} />
          <Input label="Precio USD" type="number" step="0.01" placeholder="Vacío = gratis" value={form.precio_usd} onChange={e => set('precio_usd', e.target.value)} />
        </div>

        <Textarea label="Descripción" value={form.descripcion} onChange={e => set('descripcion', e.target.value)} />

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.activo} onChange={e => set('activo', e.target.checked)} className="w-4 h-4 rounded accent-lime" />
          <span className="text-sm text-white/70">Publicado</span>
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" variant="lime" loading={saving}>Guardar cambios</Button>
      </form>

      {/* Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Sesiones ({sessions.length})</h2>
          <Link
            href={`/admin/programas/${id}/sesiones/nueva`}
            className="text-xs font-medium bg-purple/20 text-purple border border-purple/30 px-4 py-2 rounded-full hover:bg-purple/30 transition-colors"
          >
            + Nueva sesión
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {sessions.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 bg-white/3 border border-white/6 rounded-xl">
              <span className="text-xs text-white/30 w-5 text-center flex-shrink-0">{s.numero_orden}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{s.titulo}</p>
                {s.dia_relativo && <p className="text-xs text-white/30">Día {s.dia_relativo}</p>}
              </div>
              <span className="text-xs text-white/25 border border-white/8 px-2 py-0.5 rounded-full flex-shrink-0">
                {s.content_type}
              </span>
              <Link href={`/admin/sesiones/${s.id}`} className="text-xs text-white/30 hover:text-white transition-colors">
                Editar
              </Link>
              <button onClick={() => deleteSession(s.id)} className="text-xs text-red-500/50 hover:text-red-400 transition-colors">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
