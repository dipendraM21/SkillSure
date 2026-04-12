import { ChevronLeft, ChevronRight } from 'lucide-react'

export type EmployerTableFooterBarProps = {
  /** Inclusive start index (1-based for display) */
  showingFrom: number
  showingTo: number
  total: number
  entityLabel?: string
  onPrevious?: () => void
  onNext?: () => void
  canGoPrevious?: boolean
  canGoNext?: boolean
  /** When set with `totalPages`, shows numbered page controls between the chevrons. */
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  /** Max page number buttons in the numbered strip (default 5). */
  maxPageButtons?: number
}

function visiblePageNumbers(current: number, total: number, max: number): number[] {
  if (total <= 0) return []
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const half = Math.floor(max / 2)
  let start = Math.max(1, current - half)
  const end = Math.min(total, start + max - 1)
  start = Math.max(1, end - max + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function EmployerTableFooterBar({
  showingFrom,
  showingTo,
  total,
  entityLabel = 'candidates',
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = true,
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
}: EmployerTableFooterBarProps) {
  const isNumbered =
    typeof currentPage === 'number' &&
    typeof totalPages === 'number' &&
    totalPages >= 1 &&
    typeof onPageChange === 'function'

  const goPrev = () => {
    if (isNumbered && currentPage > 1) {
      onPageChange(currentPage - 1)
    } else {
      onPrevious?.()
    }
  }

  const goNext = () => {
    if (isNumbered && currentPage < totalPages) {
      onPageChange(currentPage + 1)
    } else {
      onNext?.()
    }
  }

  const prevDisabled = isNumbered ? currentPage <= 1 : !canGoPrevious
  const nextDisabled = isNumbered ? currentPage >= totalPages : !canGoNext

  const pages = isNumbered ? visiblePageNumbers(currentPage, totalPages, maxPageButtons) : []

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-[#FAFBFC] px-6 py-4">
      <p className="text-[12px] font-medium leading-4 tracking-wide text-[#64748B] font-body">
        Showing {showingFrom}–{showingTo} of {total} {entityLabel}
      </p>
      <div className="flex flex-row items-center gap-1.5">
        <button
          type="button"
          onClick={goPrev}
          disabled={prevDisabled}
          className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[#191C1E] shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        {isNumbered
          ? pages.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? 'page' : undefined}
                className={`flex min-h-8 min-w-8 items-center justify-center rounded-lg px-2.5 font-body text-fs-size-12 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 ${
                  p === currentPage
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-transparent text-[#191C1E] hover:border-slate-200 hover:bg-white'
                }`}
              >
                {p}
              </button>
            ))
          : null}
        <button
          type="button"
          onClick={goNext}
          disabled={nextDisabled}
          className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[#191C1E] shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
