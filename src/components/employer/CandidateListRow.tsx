import { EmployerScoreCell } from '@/components/employer/EmployerScoreCell'
import { EmployerStatusPill, type EmployerStatusVariant } from '@/components/employer/EmployerStatusPill'
import { employerDemoPortraitByCandidateId } from '@/lib/employerDemoCandidatePortraits'
import { MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'

export type CandidateListRowData = {
  id: string
  name: string
  email: string
  scorePercent?: number | null
  statusLabel: string
  statusVariant: EmployerStatusVariant
  date: Date
  avatarUrl?: string
}

function formatCandidateDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export type CandidateListRowProps = {
  row: CandidateListRowData
  borderTop?: boolean
  onRowMenu?: (id: string) => void
  /** When set, the candidate name links to this path (e.g. profile page). */
  detailHref?: string
}

export function CandidateListRow({ row, borderTop, onRowMenu, detailHref }: CandidateListRowProps) {
  const avatar = row.avatarUrl ?? employerDemoPortraitByCandidateId(row.id)

  return (
    <div
      className={`flex min-w-[920px] flex-row items-center px-6 py-4 transition-colors hover:bg-[#F8FAFC] ${borderTop ? 'border-t border-slate-100' : ''}`}
    >
      <div className="flex min-w-[200px] flex-1 flex-row items-center gap-3">
        <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/80">
          <img
            src={avatar}
            alt={row.name}
            className="size-full object-cover object-center"
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
          />
        </div>
        {detailHref ? (
          <Link
            to={detailHref}
            className="truncate text-[14px] font-semibold leading-5 text-[#191C1E] transition-colors hover:text-primary"
            viewTransition
          >
            {row.name}
          </Link>
        ) : (
          <span className="truncate text-[14px] font-semibold leading-5 text-[#191C1E]">{row.name}</span>
        )}
      </div>

      <div className="min-w-[200px] flex-1 truncate px-2 text-[14px] font-normal leading-5 text-[#64748B] sm:px-0">
        {row.email}
      </div>

      <div className="w-36 shrink-0 pr-3">
        <EmployerScoreCell percent={row.scorePercent} />
      </div>

      <div className="flex min-w-[156px] w-44 shrink-0 items-center px-2">
        <EmployerStatusPill label={row.statusLabel} variant={row.statusVariant} />
      </div>

      <div className="w-36 shrink-0 pl-2 text-[14px] font-medium tabular-nums text-[#434655]">
        {formatCandidateDate(row.date)}
      </div>

      <div className="flex w-12 shrink-0 justify-end">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-[#64748B] transition-colors hover:bg-slate-100 hover:text-[#191C1E]"
          aria-label={`Actions for ${row.name}`}
          onClick={() => onRowMenu?.(row.id)}
        >
          <MoreVertical className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
