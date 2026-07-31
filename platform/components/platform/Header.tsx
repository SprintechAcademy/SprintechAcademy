'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from './Logo'
import { createClient } from '@/lib/supabase/client'

interface HeaderProps {
  isAdmin?: boolean
}

export function Header({ isAdmin }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const nav = [
    { href: '/inicio',   label: 'Inicio' },
    { href: '/sesiones', label: 'Sesiones' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-carbon/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center h-16 gap-8">
        <Logo />

        <nav className="flex items-center gap-1 flex-1">
          {nav.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'text-white bg-white/8'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/admin')
                  ? 'text-lime bg-lime/8'
                  : 'text-lime/60 hover:text-lime hover:bg-lime/5'
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <button
          onClick={handleSignOut}
          className="text-xs text-white/35 hover:text-white/70 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
