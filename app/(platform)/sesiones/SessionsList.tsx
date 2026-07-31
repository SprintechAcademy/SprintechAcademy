'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Session, Progress } from '@/types'

interface Props {
  sessions: Session[]
  progress: Progress[]
  enrollmentId: string
}

export function SessionsList({ sessions, progress: initialProgress, enrollmentId }: Props) {
  const [progress, setProgress] = useState<Progress[]>(initialProgress)
  const [toggling, setToggling] = useState<string | null>(null)

  function isCompleted(sessionId: string) {
    return progress.some(p => p.session_id === sessionId && p.completado)
  }

  async function toggleProgress(sessionId: string) {
    if (toggling) return
    setToggling(sessionId)

    const current = isCompleted(sessionId)
    const next = !current

    // Optimistic update
    setProgress(prev => {
      const exists = prev.find(p => p.session_id === sessionId)
      if (exists) return prev.map(p => p.session_id === sessionId ? { ...p, completado: next } : p)
      return [...prev, { id: 'temp', enrollment_id: enrollmentId, session_id: sessionId, completado: next, fecha_completado: null }]
    })

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollment_id: enrollmentId, session_id: sessionId, completado: next }),
      })
    } catch {
      // Revert on error
      setProgress(prev => prev.map(p => p.session_id === sessionId ? { ...p, completado: current } : p))
    } finally {
      setToggling(null)
    }
  }

  const completed = sessions.filter(s => isCompleted(s.id)).length

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-white/40">
          <span className="text-white font-medium">{completed}</span> de {sessions.length} completadas
        </p>
        <div className="h-1.5 w-36 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime rounded-full transition-all duration-500"
            style={{ width: `${sessions.length ? (completed / sessions.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {sessions.map((session, index) => {
          const done = isCompleted(session.id)
          const isToggling = toggling === session.id
          const prevDone = index === 0 || isCompleted(sessions[index - 1].id)
          const unlocked = index === 0 || prevDone

          return (
            <div
              key={session.id}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                done
                  ? 'bg-lime/5 border-lime/15'
                  : 'bg-white/3 border-white/6 hover:bg-white/5 hover:border-white/10'
              }`}
            >
              {/* Check toggle */}
              <button
                onClick={() => toggleProgress(session.id)}
                disabled={isToggling}
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  done
                    ? 'bg-lime border-lime'
                    : 'border-white/20 hover:border-lime/60'
                } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                title={done ? 'Marcar como pendiente' : 'Marcar como completada'}
              >
                {done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {session.dia_relativo && (
                    <span className="text-xs text-white/30" style={{ fontFamily: 'var(--font-syne)' }}>
                      Día {session.dia_relativo}
                    </span>
                  )}
                </div>
                <Link
                  href={`/sesiones/${session.id}`}
                  className={`font-medium text-sm block hover:text-lime transition-colors ${done ? 'text-white/60' : 'text-white'}`}
                >
                  {session.numero_orden}. {session.titulo}
                </Link>
                {session.descripcion && (
                  <p className="text-xs text-white/35 mt-1 line-clamp-2">{session.descripcion}</p>
                )}
              </div>

              {/* Content type badge */}
              {session.content_url && (
                <span className="flex-shrink-0 text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
                  {session.content_type === 'video' ? '▶ Video' : session.content_type === 'pdf' ? '📄 PDF' : '📝 Texto'}
                </span>
              )}

              <Link
                href={`/sesiones/${session.id}`}
                className="flex-shrink-0 text-white/20 hover:text-white/60 transition-colors text-sm"
              >
                →
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
