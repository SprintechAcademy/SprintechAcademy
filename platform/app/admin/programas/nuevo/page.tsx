'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function NuevoProgramaPage() {
  const router = useRouter()
  const supabase = createClient()

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
  const [error, setError] = useState('')

  function set(field: string, value: string | boolean) {
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'nombre' && typeof value === 'string'
        ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }
        : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: err } = await supabase.from('programs').insert({
        nombre: form.nombre,
        slug: form.slug,
        tipo: form.tipo,
        duracion_valor: parseInt(form.duracion_valor),
        duracion_unidad: form.duracion_unidad,
        precio_usd: form.precio_usd ? parseFloat(form.precio_usd) : null,
        descripcion: form.descripcion || null,
        activo: form.activo,
      })

      if (err) { setError(err.message); return }

      router.push('/admin/programas')
    } catch {
      setError('Error guardando programa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">Nuevo programa</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Nombre del programa"
          placeholder="Ad Operations Sprint"
          value={form.nombre}
          onChange={e => set('nombre', e.target.value)}
          required
        />
        <Input
          label="Slug (URL)"
          placeholder="ad-operations-sprint"
          value={form.slug}
          onChange={e => set('slug', e.target.value)}
          required
        />

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
          <Input
            label="Duración"
            type="number"
            min="1"
            value={form.duracion_valor}
            onChange={e => set('duracion_valor', e.target.value)}
            required
          />
          <Input
            label="Precio USD (vacío = gratis)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={form.precio_usd}
            onChange={e => set('precio_usd', e.target.value)}
          />
        </div>

        <Textarea
          label="Descripción"
          placeholder="Descripción del programa..."
          value={form.descripcion}
          onChange={e => set('descripcion', e.target.value)}
        />

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.activo}
            onChange={e => set('activo', e.target.checked)}
            className="w-4 h-4 rounded accent-lime"
          />
          <span className="text-sm text-white/70">Publicar (visible para inscripciones)</span>
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="lime" loading={loading}>
            Crear programa
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
