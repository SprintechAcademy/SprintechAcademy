import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SessionsList } from './SessionsList'
import type { EnrollmentWithProgram } from '@/types'

interface Props {
  searchParams: Promise<{ program?: string }>
}

export default async function SesionesPage({ searchParams }: Props) {
  const { program: programId } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, program:programs(*)')
    .eq('user_id', user.id)
    .eq('activo', true)
    .order('fecha_inicio', { ascending: false })

  if (!enrollments?.length) redirect('/inicio')

  const activeEnrollment = programId
    ? (enrollments as EnrollmentWithProgram[]).find(e => e.program_id === programId) ?? (enrollments[0] as EnrollmentWithProgram)
    : (enrollments[0] as EnrollmentWithProgram)

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('program_id', activeEnrollment.program_id)
    .order('numero_orden')

  const { data: progress } = await supabase
    .from('progress')
    .select('*')
    .eq('enrollment_id', activeEnrollment.id)

  return (
    <div>
      {/* Program selector */}
      {(enrollments as EnrollmentWithProgram[]).length > 1 && (
        <div className="flex gap-2 mb-8 flex-wrap">
          {(enrollments as EnrollmentWithProgram[]).map(e => (
            <a
              key={e.id}
              href={`/sesiones?program=${e.program_id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                e.program_id === activeEnrollment.program_id
                  ? 'bg-purple text-white'
                  : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {e.program.nombre}
            </a>
          ))}
        </div>
      )}

      <div className="mb-8">
        <p className="text-xs text-white/35 uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
          {activeEnrollment.program.tipo === 'reto' ? 'Reto' : 'Curso'}
        </p>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {activeEnrollment.program.nombre}
        </h1>
      </div>

      <SessionsList
        sessions={sessions ?? []}
        progress={progress ?? []}
        enrollmentId={activeEnrollment.id}
      />
    </div>
  )
}
