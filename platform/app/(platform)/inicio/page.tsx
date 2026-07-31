import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProgressRing } from '@/components/platform/ProgressRing'
import { LinkButton } from '@/components/ui/Button'
import type { EnrollmentWithProgram, Session, Progress } from '@/types'

export default async function InicioPge() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('nombre_completo')
    .eq('id', user.id)
    .single()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, program:programs(*)')
    .eq('user_id', user.id)
    .eq('activo', true)
    .order('fecha_inicio', { ascending: false })

  const nombre = profile?.nombre_completo?.split(' ')[0] ?? 'Sprinter'

  if (!enrollments?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl">🎯</div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Bienvenido/a, {nombre}</h1>
          <p className="text-white/45 text-sm max-w-xs">
            Aún no estás inscrito en ningún programa. Explora nuestros retos y cursos.
          </p>
        </div>
        <LinkButton href="/" variant="lime">Ver programas</LinkButton>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-medium text-white/35 uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
          Plataforma
        </p>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Bienvenido/a, {nombre} 👋
        </h1>
      </div>

      <div className="grid gap-4">
        {(enrollments as EnrollmentWithProgram[]).map(enrollment => (
          <ProgramCard key={enrollment.id} enrollment={enrollment} userId={user.id} />
        ))}
      </div>
    </div>
  )
}

async function ProgramCard({ enrollment, userId }: { enrollment: EnrollmentWithProgram; userId: string }) {
  const supabase = await createClient()
  const program = enrollment.program

  const { data: sessions } = await supabase
    .from('sessions')
    .select('id')
    .eq('program_id', program.id)
    .order('numero_orden')

  const totalSessions = sessions?.length ?? 0

  const { count: completedCount } = await supabase
    .from('progress')
    .select('id', { count: 'exact', head: true })
    .eq('enrollment_id', enrollment.id)
    .eq('completado', true)

  const completed = completedCount ?? 0
  const percent = totalSessions > 0 ? Math.round((completed / totalSessions) * 100) : 0

  const durLabel = `${program.duracion_valor} ${program.duracion_unidad}`
  const tipoLabel = program.tipo === 'reto' ? 'Reto gratuito' : 'Curso'

  return (
    <div className="bg-surface border border-white/6 rounded-2xl p-6 flex items-start gap-6">
      {/* Left: program info + linear progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border text-white/50 border-white/12"
            style={{ fontFamily: 'var(--font-syne)' }}>
            {tipoLabel}
          </span>
          <span className="text-xs text-white/30">{durLabel}</span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight mb-1">{program.nombre}</h2>
        {program.descripcion && (
          <p className="text-sm text-white/40 mb-5 line-clamp-2">{program.descripcion}</p>
        )}

        {/* Linear progress bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-lime rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-white/35">
          {completed} de {totalSessions} sesiones completadas
        </p>

        <div className="mt-5">
          <LinkButton href={`/sesiones?program=${program.id}`} variant="ghost" size="sm">
            Ver sesiones →
          </LinkButton>
        </div>
      </div>

      {/* Right: ring */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <ProgressRing percent={percent} size={88} strokeWidth={5} />
        <p className="text-xs text-white/30 text-center">Progreso</p>
      </div>
    </div>
  )
}
