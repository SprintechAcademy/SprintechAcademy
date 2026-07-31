import Link from 'next/link'

export function Logo({ href = '/inicio' }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-baseline gap-0.5">
      <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
        Sprintech
      </span>
      <span className="italic font-normal text-white/50 text-[15px]">
        Academy
      </span>
    </Link>
  )
}
