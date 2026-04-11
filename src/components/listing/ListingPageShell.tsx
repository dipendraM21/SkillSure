import { EmployerPageHeader } from '@/components/employer/EmployerPageHeader'
import { type ReactNode } from 'react'

export type ListingPageShellProps = {
  title?: string
  description?: string
  trailing?: ReactNode
  /** When false, only error/loading/children render (use for secondary sections under a custom header). */
  showHeader?: boolean
  isLoading?: boolean
  error?: Error | null
  onRetry?: () => void
  /** Shown instead of children while loading (keeps header + optional error). */
  loadingLabel?: string
  children: ReactNode
  className?: string
}

/**
 * Shared chrome for SkillSure listing pages (admin + employer).
 * Pairs with React Query hooks in `lib/hooks/*` and API services in `lib/api/services/*`.
 */
export function ListingPageShell({
  title,
  description,
  trailing,
  showHeader = true,
  isLoading,
  error,
  onRetry,
  loadingLabel = 'Loading…',
  children,
  className = '',
}: ListingPageShellProps) {
  return (
    <div className={`flex w-full min-w-0 flex-col gap-8 p-6 sm:p-8 ${className}`}>
      {showHeader ? (
        <EmployerPageHeader title={title ?? ''} description={description} trailing={trailing} />
      ) : null}

      {error ? (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-fs-size-14 font-medium text-red-900 font-body">{error.message || 'Something went wrong.'}</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="shrink-0 rounded-xl bg-white px-4 py-2 text-fs-size-13 font-bold text-primary shadow-sm ring-1 ring-red-100 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 font-body"
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : null}

      {isLoading ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
          <div
            className="size-9 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden
          />
          <p className="text-fs-size-14 font-medium text-[#64748B] font-body">{loadingLabel}</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
