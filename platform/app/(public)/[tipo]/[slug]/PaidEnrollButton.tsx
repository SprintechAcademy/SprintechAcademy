'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function PaidEnrollButton({ programId }: { programId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program_id: programId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} variant="lime" size="lg" loading={loading} className="w-full">
      Inscribirme ahora
    </Button>
  )
}
