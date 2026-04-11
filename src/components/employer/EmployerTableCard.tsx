import { type ReactNode } from 'react'

export type EmployerTableCardProps = {
  children: ReactNode
  className?: string
}

/** White rounded table shell — same chrome as dashboard “Recent Candidates” card. */
export function EmployerTableCard({ children, className }: EmployerTableCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_40px_rgba(0,74,198,0.06)] ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
