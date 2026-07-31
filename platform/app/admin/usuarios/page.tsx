import { createClient } from '@/lib/supabase/server'

export default async function UsuariosPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('users')
    .select(`
      id,
      nombre_completo,
      email,
      es_admin,
      created_at,
      enrollments (
        id,
        activo,
        estado_pago,
        programs ( nombre )
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Usuarios</h1>
        <span className="text-sm text-white/30">{users?.length ?? 0} registrados</span>
      </div>

      {!users?.length ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg mb-2">Sin usuarios aún</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {users.map(user => {
            const enrollments = (user.enrollments as unknown as Array<{
              id: string
              activo: boolean
              estado_pago: string
              programs: { nombre: string } | null
            }>) ?? []

            return (
              <div key={user.id} className="bg-white/3 border border-white/6 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-white text-sm">{user.nombre_completo || '—'}</p>
                      {user.es_admin && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-lime/10 text-lime border border-lime/20">Admin</span>
                      )}
                    </div>
                    <p className="text-xs text-white/40">{user.email}</p>
                  </div>
                  <p className="text-xs text-white/25 flex-shrink-0">
                    {new Date(user.created_at).toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {enrollments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {enrollments.map(e => (
                      <span
                        key={e.id}
                        className={`text-xs px-2.5 py-1 rounded-full border ${
                          e.activo
                            ? 'bg-purple/10 text-purple border-purple/20'
                            : 'bg-white/5 text-white/30 border-white/8'
                        }`}
                      >
                        {e.programs?.nombre ?? 'Programa eliminado'}
                        {e.estado_pago === 'pagado' && ' · ✓'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
