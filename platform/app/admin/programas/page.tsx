import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Program } from '@/types'

export default async function ProgramasPage() {
  const supabase = await createClient()
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Programas</h1>
        <Link
          href="/admin/programas/nuevo"
          className="inline-flex items-center gap-2 bg-lime text-carbon font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          + Nuevo
        </Link>
      </div>

      {!programs?.length ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg mb-2">Sin programas aún</p>
          <p className="text-sm">Crea tu primer programa para comenzar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {(programs as Program[]).map(program => (
            <div key={program.id} className="bg-white/3 border border-white/6 rounded-xl p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-white text-sm">{program.nombre}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    program.activo ? 'bg-lime/10 text-lime border border-lime/20' : 'bg-white/5 text-white/30 border border-white/8'
                  }`}>
                    {program.activo ? 'Activo' : 'Borrador'}
                  </span>
                  <span className="text-xs text-white/30 border border-white/8 px-2 py-0.5 rounded-full">
                    {program.tipo}
                  </span>
                </div>
                <p className="text-xs text-white/35">
                  /{program.slug} · {program.duracion_valor} {program.duracion_unidad}
                  {program.precio_usd ? ` · $${program.precio_usd} USD` : ' · Gratis'}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/programas/${program.id}/sesiones/nueva`}
                  className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 border border-white/8 rounded-lg"
                >
                  + Sesión
                </Link>
                <Link
                  href={`/admin/programas/${program.id}`}
                  className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 border border-white/8 rounded-lg"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
