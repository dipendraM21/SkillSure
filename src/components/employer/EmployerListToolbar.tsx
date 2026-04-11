import type { ChangeEvent } from 'react'
import { Filter, Search } from 'lucide-react'

export type EmployerListToolbarProps = {
  searchPlaceholder?: string
  /** Controlled search (e.g. sync with URL + common CRUD list query). */
  searchValue?: string
  onSearchChange?: (value: string) => void
  /** Called when filter button is pressed */
  onFilterClick?: () => void
  className?: string
}

/**
 * Search field + Filter button — reuse on any employer list page (candidates, assessments, etc.).
 */
export function EmployerListToolbar({
  searchPlaceholder = 'Search by name or email...',
  searchValue,
  onSearchChange,
  onFilterClick,
  className,
}: EmployerListToolbarProps) {
  return (
    <div className={`flex w-full min-w-0 flex-row flex-wrap items-center gap-3 sm:w-auto ${className ?? ''}`}>
      <div className="relative h-10 w-full min-w-[200px] max-w-md sm:w-72">
        <div className="relative flex h-full w-full flex-row items-center rounded-lg border border-slate-200/80 bg-white px-4 py-2 pl-10 shadow-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A3B8]" aria-hidden />
          <input
            type="search"
            placeholder={searchPlaceholder}
            {...(onSearchChange != null
              ? { value: searchValue ?? '', onChange: (e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value) }
              : {})}
            className="h-5 w-full border-none bg-transparent text-[14px] font-normal leading-5 text-[#191C1E] outline-none placeholder:text-[#94A3B8]"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onFilterClick}
        className="inline-flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border border-slate-200/80 bg-[#F2F4F6] px-4 text-[14px] font-semibold text-[#191C1E] transition-colors hover:bg-[#E8EAED]"
      >
        <Filter className="size-4 text-[#191C1E]" strokeWidth={2} aria-hidden />
        Filter
      </button>
    </div>
  )
}
