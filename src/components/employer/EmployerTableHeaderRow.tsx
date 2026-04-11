export type EmployerTableHeaderRowProps = {
  /** Column labels; use empty string for an actions column */
  columns: string[]
  /** Tailwind width classes per column (same length as columns), e.g. ['flex-1 min-w-[180px]', ...] */
  columnWidths?: string[]
}

const defaultWidths = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    if (i === 0) return 'min-w-[200px] flex-1'
    if (i === n - 1) return 'w-12 shrink-0'
    if (i === 1) return 'min-w-[200px] flex-1'
    if (i === 2) return 'w-36 shrink-0 pr-3'
    if (i === 3) return 'min-w-[156px] w-44 shrink-0 px-2'
    return 'w-36 shrink-0 pl-2'
  })

export function EmployerTableHeaderRow({ columns, columnWidths }: EmployerTableHeaderRowProps) {
  const widths = columnWidths ?? defaultWidths(columns.length)

  return (
    <div className="flex min-w-[920px] flex-row items-stretch border-b border-slate-100 bg-[#F9FAFB] px-6">
      {columns.map((label, i) => (
        <div
          key={i}
          className={`flex items-center py-4 ${widths[i] ?? 'min-w-0 flex-1'} ${i === columns.length - 1 && !label ? 'justify-end' : ''}`}
        >
          {label ? (
            <span className="text-[13px] font-semibold leading-4 text-[#64748B]">{label}</span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
