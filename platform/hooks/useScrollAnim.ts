'use client'
import { useEffect, useRef } from 'react'

export default function useScrollAnim(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, ...options }
    )

    const children = el.querySelectorAll('.anim-ready')
    if (children.length > 0) {
      children.forEach((child) => observer.observe(child))
    } else {
      el.classList.add('anim-ready')
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
