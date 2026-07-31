import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/platform/Header'

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('es_admin')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-carbon">
      <Header isAdmin={profile?.es_admin} />
      <main className="pt-16 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
