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
  'w-full h-12 bg-white/6 border border-white/15 rounded-lg px-4 text-white placeholder:text-white/30 text-sm transition-all duration-200 outline-none focus:border-purple/70 focus:bg-white/10 focus:ring-2 focus:ring-purple/20'

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-xs font-semibold text-white/60 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {label}
        </label>
      )}
      <input
        className={`${fieldBase} ${error ? 'border-red-500 focus:ring-red-500/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
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
        <label
          className="text-xs font-semibold text-white/60 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {label}
        </label>
      )}
      <select
        className={`${fieldBase} ${error ? 'border-red-500 focus:ring-red-500/20' : ''} ${className}`}
        style={{ backgroundImage: 'none' }}
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-xs font-semibold text-white/60 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-white/6 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm transition-all duration-200 outline-none focus:border-purple/70 focus:bg-white/10 focus:ring-2 focus:ring-purple/20 resize-none min-h-[100px] ${error ? 'border-red-500 focus:ring-red-500/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  )
}
