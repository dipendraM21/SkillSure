import { getSearchParams, setSearchPrams } from '@/components/crud/commonHelper/SearchParams'
import { useCommonCrudListData } from '@/components/crud/commonCrud/hooks/useCommonCrudListData'
import { EmployerPageHeader } from '@/components/employer/EmployerPageHeader'
import { EmployerTableCard } from '@/components/employer/EmployerTableCard'
import { EmployerTableFooterBar } from '@/components/employer/EmployerTableFooterBar'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { skillsureListingCrudApiNames } from '@/config/crudModules.data'
import type { AdminEmployerRow } from '@/lib/api/services/employers.service'
import { ModuleProvider } from '@/lib/providers/ModuleProvider'
import type { JsonObject } from '@/types/json.types'
import { Building2, Plus, Search, SquarePen, Star, Trash2 } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

const FILTER_TABS = ['All', 'Active', 'Pending', 'Suspended'] as const
const PAGE_SIZE = 10

const AdminEmployers = () => {
  return (
    <AdminLayout>
      <ModuleProvider apiName={skillsureListingCrudApiNames.adminEmployers}>
        <AdminEmployersCrudBody />
      </ModuleProvider>
    </AdminLayout>
  )
}

function AdminEmployersCrudBody() {
  const [filter, setFilter] = useState<(typeof FILTER_TABS)[number]>('All')
  const { moduleData, isLoading, isError, error, refetch, isFetching, isListFetching } =
    useCommonCrudListData<AdminEmployerRow>()

  const params = getSearchParams<{ page?: number; limit?: number; search?: string }>()
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || PAGE_SIZE

  const urlSearch = params.search ?? ''
  const [searchDraft, setSearchDraft] = useState(urlSearch)
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch)
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch)
    setSearchDraft(urlSearch)
  }

  useEffect(() => {
    const t = window.setTimeout(() => {
      const next = searchDraft.trim()
      const cur = (params.search ?? '').trim()
      if (next === cur) return
      setSearchPrams({
        page: 1,
        limit,
        ...(next ? { search: next } : { search: undefined }),
      } as JsonObject)
    }, 400)
    return () => window.clearTimeout(t)
  }, [searchDraft, limit, params.search])

  const rows = moduleData.result
  const total = moduleData.totalRecords
  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1
  const showingTo = (page - 1) * limit + rows.length
  const busy = isFetching || isListFetching

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-8 bg-[#F7F9FB] px-6 py-8 sm:px-8">
      <EmployerPageHeader
        title="Employer management"
        description="Oversee partner organizations, monitor assessment throughput, and manage platform access permissions."
        trailing={
          <button
            type="button"
            className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-br from-primary to-[#6D28D9] px-6 text-[14px] font-bold leading-5 text-white shadow-[0_10px_24px_rgba(68,39,173,0.28)] transition-[transform,box-shadow] hover:shadow-[0_14px_28px_rgba(68,39,173,0.32)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F9FB] sm:w-auto sm:px-8 font-body"
          >
            <Building2 className="size-[18px] shrink-0 text-white" strokeWidth={2} aria-hidden />
            <Plus className="size-4 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
            Add employer
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard label="Total active partners" value="1,284" chip="+12% this month" chipTone="primary" />
        <StatCard label="Pending requests" value="42" chip="Requires review" chipTone="amber" />
        <StatCard label="Average integrity score" value="9.8" stars />
      </div>

      <EmployerTableCard className="shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <div className="relative min-h-10 min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Filter by company name, sector, or ID…"
              className="h-10 w-full rounded-lg border border-slate-200/80 bg-[#F2F4F6] pl-10 pr-4 text-[14px] font-semibold leading-5 text-[#191C1E] outline-none ring-0 transition-colors placeholder:font-semibold placeholder:text-slate-500 focus:border-primary/30 focus:bg-white focus:shadow-[0_0_0_3px_rgba(68,39,173,0.12)] font-body"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-[#F2F4F6] p-1 sm:shrink-0">
            {FILTER_TABS.map((tab) => {
              const active = filter === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-3.5 py-2 text-[12px] font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 font-body ${
                    active
                      ? 'bg-white text-[#191C1E] shadow-sm ring-1 ring-slate-200/80'
                      : 'text-[#64748B] hover:bg-white/60 hover:text-[#191C1E]'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        {isError ? (
          <div
            role="alert"
            className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-fs-size-14 font-medium text-red-800 font-body">
              {error instanceof Error ? error.message : 'Failed to load employers.'}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="shrink-0 rounded-xl bg-primary/10 px-4 py-2 text-fs-size-13 font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 font-body"
            >
              Retry
            </button>
          </div>
        ) : null}

        <div className={`overflow-x-auto ${busy ? 'opacity-60' : ''} transition-opacity`}>
          <div className="min-w-[880px]">
            <div className="flex flex-row border-b border-slate-100 bg-[#F9FAFB] px-6">
              <HeaderCell className="min-w-[240px] flex-[1.2]">Employer</HeaderCell>
              <HeaderCell className="w-44 shrink-0">Sector</HeaderCell>
              <HeaderCell className="w-40 shrink-0">Assessments</HeaderCell>
              <HeaderCell className="w-36 shrink-0">Status</HeaderCell>
              <HeaderCell className="w-28 shrink-0 justify-end text-right">Actions</HeaderCell>
            </div>
            {isLoading && rows.length === 0 ? (
              <div className="flex min-h-[200px] items-center justify-center gap-3 py-8">
                <div className="size-9 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden />
                <span className="text-fs-size-14 font-medium text-[#64748B] font-body">Loading employers…</span>
              </div>
            ) : (
              rows.map((row, i) => <EmployerRowView key={row.id} row={row} borderTop={i > 0} />)
            )}
          </div>
        </div>

        <EmployerTableFooterBar
          showingFrom={showingFrom}
          showingTo={showingTo}
          total={total}
          entityLabel="employers"
          canGoPrevious={page > 1 && !busy}
          canGoNext={page * limit < total && !busy}
          onPrevious={() => setSearchPrams({ page: Math.max(1, page - 1), limit })}
          onNext={() => setSearchPrams({ page: page + 1, limit })}
        />
      </EmployerTableCard>
    </div>
  )
}

function HeaderCell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center py-4 ${className}`}>
      <span className="text-[13px] font-semibold leading-4 text-[#64748B] font-body">{children}</span>
    </div>
  )
}

function StatCard({
  label,
  value,
  chip,
  chipTone,
  stars,
}: {
  label: string
  value: string
  chip?: string
  chipTone?: 'primary' | 'amber'
  stars?: boolean
}) {
  const chipClasses =
    chipTone === 'amber' ? 'bg-amber-100/90 text-amber-900' : 'bg-primary/12 text-primary'

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
      <p className="text-[12px] font-semibold leading-4 text-[#64748B] font-body">{label}</p>
      <div className="mt-3 flex flex-row flex-wrap items-end justify-between gap-3">
        <span className="font-heading text-[28px] font-bold leading-8 tracking-tight text-[#191C1E] sm:text-fs-size-30 sm:leading-9">
          {value}
        </span>
        {chip != null ? (
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold leading-4 ${chipClasses} font-body`}>{chip}</span>
        ) : null}
        {stars ? (
          <div className="flex flex-row gap-0.5 pb-0.5" aria-label="5 of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-primary text-primary" strokeWidth={0} aria-hidden />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function EmployerRowView({ row, borderTop }: { row: AdminEmployerRow; borderTop: boolean }) {
  const status =
    row.status === 'inProgress'
      ? { wrap: 'bg-orange-100/80', dot: 'bg-orange-600', text: 'text-orange-900', label: 'In progress' }
      : { wrap: 'bg-[#EDE9FE]', dot: 'bg-primary', text: 'text-[#5B21B6]', label: 'Completed' }

  return (
    <div
      className={`flex min-h-[72px] flex-row items-center px-6 py-4 transition-colors hover:bg-[#F8FAFC] ${borderTop ? 'border-t border-slate-100' : ''}`}
    >
      <div className="flex min-w-0 flex-[1.2] flex-row items-center gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${row.logoBg} shadow-sm ring-1 ring-black/5`}
        >
          <span className="font-heading text-lg font-bold text-white">{row.name.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-[15px] font-bold leading-5 text-[#191C1E]">{row.name}</p>
          <p className="mt-0.5 text-[12px] font-semibold leading-4 text-[#64748B] font-body">ID: {row.id}</p>
        </div>
      </div>

      <div className="flex w-44 shrink-0 items-center px-2">
        <span className="inline-flex max-w-full truncate rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary font-body">
          {row.sector}
        </span>
      </div>

      <div className="flex w-40 shrink-0 flex-col gap-2 pr-2">
        <span className="text-[14px] font-bold tabular-nums text-[#191C1E] font-body">{row.assessments}</span>
        <div className="h-2 w-full max-w-[7rem] overflow-hidden rounded-full bg-[#E6E8EA]">
          <div className="h-full rounded-full bg-linear-to-r from-primary to-[#6D28D9]" style={{ width: `${row.barPct}%` }} />
        </div>
      </div>

      <div className="flex w-36 shrink-0 items-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold font-body ${status.wrap} ${status.text}`}
        >
          <span className={`size-1.5 shrink-0 rounded-full ${status.dot}`} aria-hidden />
          {status.label}
        </span>
      </div>

      <div className="flex w-28 shrink-0 items-center justify-end gap-1">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#191C1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          aria-label={`Edit ${row.name}`}
        >
          <SquarePen className="size-[18px]" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/20"
          aria-label={`Remove ${row.name}`}
        >
          <Trash2 className="size-[17px]" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

export default AdminEmployers
