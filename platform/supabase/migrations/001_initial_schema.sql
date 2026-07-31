-- ==============================================
-- Sprintech Academy — Schema v1
-- ==============================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==============================================
-- USERS (profile extending auth.users)
-- ==============================================
CREATE TABLE public.users (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT        NOT NULL,
  whatsapp        TEXT,
  email           TEXT        UNIQUE NOT NULL,
  a_que_te_dedicas TEXT,
  como_nos_conociste TEXT,
  es_admin        BOOLEAN     DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- PROGRAMS
-- ==============================================
CREATE TABLE public.programs (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre           TEXT        NOT NULL,
  slug             TEXT        UNIQUE NOT NULL,
  tipo             TEXT        NOT NULL CHECK (tipo IN ('reto', 'curso')),
  duracion_valor   INTEGER     NOT NULL,
  duracion_unidad  TEXT        NOT NULL CHECK (duracion_unidad IN ('dias', 'semanas')),
  precio_usd       NUMERIC(10,2),  -- NULL = free
  descripcion      TEXT,
  imagen_url       TEXT,
  activo           BOOLEAN     DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- SESSIONS
-- ==============================================
CREATE TABLE public.sessions (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id      UUID        NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  numero_orden    INTEGER     NOT NULL,
  titulo          TEXT        NOT NULL,
  descripcion     TEXT,
  dia_relativo    INTEGER,
  content_url     TEXT,
  content_type    TEXT        DEFAULT 'texto' CHECK (content_type IN ('video', 'pdf', 'texto')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(program_id, numero_orden)
);

-- ==============================================
-- ENROLLMENTS
-- ==============================================
CREATE TABLE public.enrollments (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  program_id        UUID        NOT NULL REFERENCES public.programs(id),
  estado_pago       TEXT        NOT NULL CHECK (estado_pago IN ('gratis', 'pendiente', 'pagado')),
  stripe_session_id TEXT,
  fecha_inicio      TIMESTAMPTZ DEFAULT NOW(),
  activo            BOOLEAN     DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, program_id)
);

-- ==============================================
-- PROGRESS
-- ==============================================
CREATE TABLE public.progress (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id    UUID        NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  session_id       UUID        NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  completado       BOOLEAN     DEFAULT FALSE,
  fecha_completado TIMESTAMPTZ,
  UNIQUE(enrollment_id, session_id)
);

-- ==============================================
-- ACCESS CODES (OTP)
-- ==============================================
CREATE TABLE public.access_codes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL,
  code_hash   TEXT        NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  attempts    INTEGER     DEFAULT 0,
  used        BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_access_codes_email ON public.access_codes(email);

-- ==============================================
-- UPDATED_AT trigger
-- ==============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================
-- AUTO-CREATE USER PROFILE on Auth signup
-- ==============================================
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nombre_completo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre_completo', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- ==============================================
-- ROW LEVEL SECURITY
-- ==============================================
ALTER TABLE public.users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Users: own row only
CREATE POLICY "users_own_row" ON public.users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "admin_users_all" ON public.users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.es_admin = TRUE)
  );

-- Programs: public read if active, admin write
CREATE POLICY "programs_public_read" ON public.programs
  FOR SELECT USING (activo = TRUE);

CREATE POLICY "programs_admin_all" ON public.programs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.es_admin = TRUE)
  );

-- Sessions: public read (joined through programs)
CREATE POLICY "sessions_read_enrolled" ON public.sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.program_id = sessions.program_id
        AND e.user_id = auth.uid()
        AND e.activo = TRUE
    )
    OR EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.es_admin = TRUE)
  );

CREATE POLICY "sessions_admin_all" ON public.sessions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.es_admin = TRUE)
  );

-- Enrollments: own only
CREATE POLICY "enrollments_own" ON public.enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "enrollments_admin_all" ON public.enrollments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.es_admin = TRUE)
  );

-- Progress: own only
CREATE POLICY "progress_own" ON public.progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.id = progress.enrollment_id AND e.user_id = auth.uid()
    )
  );

-- Access codes: server-side only (service role), no client access
CREATE POLICY "access_codes_deny_all" ON public.access_codes
  FOR ALL USING (FALSE);
