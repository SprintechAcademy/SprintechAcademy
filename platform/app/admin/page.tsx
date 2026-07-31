import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: programs },
    { count: users },
    { count: enrollments },
  ] = await Promise.all([
    supabase.from('programs').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('enrollments').select('id', { count: 'exact', head: true }).eq('activo', true),
  ])

  const stats = [
    { label: 'Programas', value: programs ?? 0, href: '/admin/programas' },
    { label: 'Usuarios', value: users ?? 0, href: '/admin/usuarios' },
    { label: 'Inscripciones activas', value: enrollments ?? 0, href: '/admin/usuarios' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white/3 border border-white/6 rounded-xl p-6 hover:border-white/12 transition-colors"
          >
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-white/40">{label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/programas/nuevo"
          className="inline-flex items-center gap-2 bg-lime text-carbon font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          + Nuevo programa
        </Link>
      </div>
    </div>
  )
}
