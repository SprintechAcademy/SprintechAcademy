import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Logo } from '@/components/platform/Logo'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('es_admin, nombre_completo')
    .eq('id', user.id)
    .single()

  if (!profile?.es_admin) redirect('/inicio')

  const adminNav = [
    { href: '/admin',           label: 'Dashboard' },
    { href: '/admin/programas', label: 'Programas' },
    { href: '/admin/usuarios',  label: 'Usuarios' },
    { href: '/inicio',          label: '← Plataforma' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/6 flex flex-col">
        <div className="p-6 border-b border-white/6">
          <Logo />
          <p className="text-xs text-lime mt-1" style={{ fontFamily: 'var(--font-syne)' }}>Admin</p>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {adminNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/6">
          <p className="text-xs text-white/25 truncate">{profile.nombre_completo}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
