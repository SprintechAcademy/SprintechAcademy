import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LinkButton } from '@/components/ui/Button'
import { SessionContent } from './SessionContent'

interface Props {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (!session) notFound()

  // Verify user is enrolled
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('program_id', session.program_id)
    .eq('activo', true)
    .single()

  if (!enrollment) redirect('/inicio')

  const { data: allSessions } = await supabase
    .from('sessions')
    .select('id, numero_orden, titulo')
    .eq('program_id', session.program_id)
    .order('numero_orden')

  const currentIndex = allSessions?.findIndex(s => s.id === id) ?? 0
  const prevSession = currentIndex > 0 ? allSessions?.[currentIndex - 1] : null
  const nextSession = allSessions && currentIndex < allSessions.length - 1 ? allSessions[currentIndex + 1] : null

  const { data: progress } = await supabase
    .from('progress')
    .select('*')
    .eq('enrollment_id', enrollment.id)
    .eq('session_id', id)
    .single()

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <div className="mb-6">
        <LinkButton href={`/sesiones?program=${session.program_id}`} variant="ghost" size="sm">
          ← Volver a sesiones
        </LinkButton>
      </div>

      {/* Header */}
      <div className="mb-8">
        {session.dia_relativo && (
          <p className="text-xs text-white/35 uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
            Día {session.dia_relativo}
          </p>
        )}
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {session.numero_orden}. {session.titulo}
        </h1>
      </div>

      {/* Content */}
      <SessionContent session={session} enrollmentId={enrollment.id} initialProgress={progress} />

      {/* Navigation */}
      <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-white/6">
        {prevSession ? (
          <LinkButton href={`/sesiones/${prevSession.id}`} variant="ghost" size="sm">
            ← {prevSession.titulo}
          </LinkButton>
        ) : <div />}
        {nextSession && (
          <LinkButton href={`/sesiones/${nextSession.id}`} variant="purple" size="sm">
            {nextSession.titulo} →
          </LinkButton>
        )}
      </div>
    </div>
  )
}
