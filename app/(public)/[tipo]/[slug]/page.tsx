import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { EnrollForm } from './EnrollForm'
import { PaidEnrollButton } from './PaidEnrollButton'
import { Logo } from '@/components/platform/Logo'
import Link from 'next/link'

interface Props {
  params: Promise<{ tipo: string; slug: string }>
}

export default async function ProgramLandingPage({ params }: Props) {
  const { tipo, slug } = await params
  const supabase = createServiceClient()

  const { data: program } = await supabase
    .from('programs')
    .select('*, sessions(id, numero_orden, titulo, dia_relativo)')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (!program) notFound()

  const sessions = (program.sessions ?? []).sort((a: { numero_orden: number }, b: { numero_orden: number }) => a.numero_orden - b.numero_orden)
  const isFree = !program.precio_usd

  return (
    <div className="min-h-screen bg-carbon text-white">
      {/* Minimal nav */}
      <nav className="border-b border-white/6 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo href="/" />
          <Link href="/login" className="text-sm text-white/45 hover:text-white transition-colors">
            Iniciar sesión
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-12 items-start">
        {/* Left: info */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-lime/10 text-lime border border-lime/20"
              style={{ fontFamily: 'var(--font-syne)' }}>
              {isFree ? 'Reto gratuito' : 'Curso'}
            </span>
            <span className="text-xs text-white/35">
              {program.duracion_valor} {program.duracion_unidad}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            {program.nombre}
          </h1>

          {program.descripcion && (
            <p className="text-white/55 leading-relaxed mb-10">{program.descripcion}</p>
          )}

          {sessions.length > 0 && (
            <div>
              <p className="text-xs text-white/35 uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-syne)' }}>
                Contenido · {sessions.length} sesiones
              </p>
              <div className="flex flex-col gap-2">
                {sessions.map((s: { id: string; numero_orden: number; titulo: string; dia_relativo: number | null }) => (
                  <div key={s.id} className="flex items-center gap-3 text-sm text-white/55 py-2 border-b border-white/5">
                    <span className="w-5 h-5 rounded-full border border-white/12 flex items-center justify-center text-xs flex-shrink-0 text-white/35">
                      {s.numero_orden}
                    </span>
                    <span>{s.titulo}</span>
                    {s.dia_relativo && (
                      <span className="ml-auto text-xs text-white/25">Día {s.dia_relativo}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: enrollment card */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-white/8 rounded-2xl p-6 sticky top-8">
            {isFree ? (
              <>
                <p className="text-xs text-lime font-medium mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                  GRATIS
                </p>
                <h2 className="text-lg font-bold text-white mb-6">Inscíbete ahora</h2>
                <EnrollForm programId={program.id} />
                <p className="text-xs text-white/25 text-center mt-4 leading-relaxed">
                  Tus datos solo se usan para enviarte información del reto. No los compartimos con terceros.
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-white mb-1">${program.precio_usd} USD</p>
                <p className="text-xs text-white/40 mb-6">Acceso completo al programa</p>
                <PaidEnrollButton programId={program.id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
