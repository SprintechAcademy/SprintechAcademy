'use client'

import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const fieldBase =
  'w-full bg-white/8 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/35 text-sm transition-colors outline-none focus:border-purple focus:bg-white/10'

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium text-white/70 tracking-wide uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
          {label}
        </label>
      )}
      <input className={`${fieldBase} ${error ? 'border-red-500' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Select({
  label,
  error,
  className = '',
  children,
  ...props
}: TextareaHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium text-white/70 tracking-wide uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
          {label}
        </label>
      )}
      <select
        className={`${fieldBase} ${error ? 'border-red-500' : ''} ${className}`}
        style={{ backgroundImage: 'none' }}
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium text-white/70 tracking-wide uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
          {label}
        </label>
      )}
      <textarea
        className={`${fieldBase} resize-none min-h-[100px] ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
