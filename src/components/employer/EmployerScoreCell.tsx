export type EmployerScoreCellProps = {
  /** 0–100; omit for pending */
  percent?: number | null
  pendingLabel?: string
}

/**
 * Score column: percentage + bar, or pending state (no bar).
 */
export function EmployerScoreCell({ percent, pendingLabel = 'Pending' }: EmployerScoreCellProps) {
  if (percent == null) {
    return <span className="text-[14px] font-medium text-[#94A3B8]">{pendingLabel}</span>
  }

  return (
    <div className="flex min-w-[7rem] flex-row items-center gap-2">
      <span className="w-10 shrink-0 text-[14px] font-bold tabular-nums text-[#4427AD]">{percent}%</span>
      <div className="h-2 min-w-[4rem] flex-1 rounded-full bg-[#E6E8EA]">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#004AC6] to-[#6D28D9]"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  )
}
