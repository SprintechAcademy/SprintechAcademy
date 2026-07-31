'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { Session, Progress } from '@/types'

interface Props {
  session: Session
  enrollmentId: string
  initialProgress: Progress | null
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/)
  return match?.[1]
}

function getVideoEmbed(url: string) {
  // YouTube
  const ytId = getYouTubeId(url)
  if (ytId) return `https://www.youtube-nocookie.com/embed/${ytId}?rel=0`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  // Loom
  if (url.includes('loom.com/share/')) return url.replace('/share/', '/embed/')
  return url
}

export function SessionContent({ session, enrollmentId, initialProgress }: Props) {
  const [completed, setCompleted] = useState(initialProgress?.completado ?? false)
  const [loading, setLoading] = useState(false)

  async function toggleComplete() {
    setLoading(true)
    const next = !completed
    setCompleted(next)
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollment_id: enrollmentId,
          session_id: session.id,
          completado: next,
        }),
      })
    } catch {
      setCompleted(!next)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Video */}
      {session.content_type === 'video' && session.content_url && (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-8">
          <iframe
            src={getVideoEmbed(session.content_url)}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* PDF */}
      {session.content_type === 'pdf' && session.content_url && (
        <div className="mb-8">
          <div className="bg-white/4 border border-white/8 rounded-xl p-6 flex items-center gap-4">
            <span className="text-3xl">📄</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-1">{session.titulo}</p>
              <p className="text-xs text-white/40">Documento PDF</p>
            </div>
            <a
              href={session.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-lime hover:text-lime/80 transition-colors"
            >
              Abrir →
            </a>
          </div>
        </div>
      )}

      {/* Description */}
      {session.descripcion && (
        <div className="prose prose-invert max-w-none mb-8">
          <div
            className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap"
            style={{ lineHeight: '1.8' }}
          >
            {session.descripcion}
          </div>
        </div>
      )}

      {/* Mark complete */}
      <div className={`flex items-center gap-4 p-5 rounded-xl border mt-8 ${
        completed ? 'bg-lime/8 border-lime/20' : 'bg-white/3 border-white/8'
      }`}>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">
            {completed ? '¡Sesión completada!' : 'Marcar como completada'}
          </p>
          <p className="text-xs text-white/40 mt-0.5">
            {completed ? 'Tu progreso ha sido guardado.' : 'Márcala cuando hayas terminado el contenido.'}
          </p>
        </div>
        <Button
          variant={completed ? 'ghost' : 'lime'}
          size="sm"
          onClick={toggleComplete}
          loading={loading}
        >
          {completed ? 'Desmarcar' : 'Completada ✓'}
        </Button>
      </div>
    </div>
  )
}
