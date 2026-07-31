export type ProgramTipo = 'reto' | 'curso'
export type DuracionUnidad = 'dias' | 'semanas'
export type EstadoPago = 'gratis' | 'pendiente' | 'pagado'
export type ContentType = 'video' | 'pdf' | 'texto'

export interface User {
  id: string
  nombre_completo: string
  whatsapp: string | null
  email: string
  a_que_te_dedicas: string | null
  como_nos_conociste: string | null
  es_admin: boolean
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  nombre: string
  slug: string
  tipo: ProgramTipo
  duracion_valor: number
  duracion_unidad: DuracionUnidad
  precio_usd: number | null
  descripcion: string | null
  imagen_url: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  program_id: string
  numero_orden: number
  titulo: string
  descripcion: string | null
  dia_relativo: number | null
  content_url: string | null
  content_type: ContentType
  created_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  program_id: string
  estado_pago: EstadoPago
  stripe_session_id: string | null
  fecha_inicio: string
  activo: boolean
  created_at: string
  program?: Program
}

export interface Progress {
  id: string
  enrollment_id: string
  session_id: string
  completado: boolean
  fecha_completado: string | null
}

export interface EnrollmentWithProgram extends Enrollment {
  program: Program
}

export interface SessionWithProgress extends Session {
  progress?: Progress
}
