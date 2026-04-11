import { getSearchParams, setSearchPrams } from '@/components/crud/commonHelper/SearchParams'
import { useCommonCrudListData } from '@/components/crud/commonCrud/hooks/useCommonCrudListData'
import {
  CandidateListRow,
  EmployerListToolbar,
  EmployerTableCard,
  EmployerTableFooterBar,
  EmployerTableHeaderRow,
  type CandidateListRowData,
} from '@/components/employer'
import { ListingPageShell } from '@/components/listing'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { skillsureListingCrudApiNames } from '@/config/crudModules.data'
import { adminCandidateProfile } from '@/lib/utils/routes'
import { ModuleProvider } from '@/lib/providers/ModuleProvider'
import type { JsonObject } from '@/types/json.types'
import { useEffect, useState } from 'react'

const PAGE_SIZE = 10

const AdminCandidates = () => {
  return (
    <AdminLayout>
      <ModuleProvider apiName={skillsureListingCrudApiNames.adminCandidates}>
        <AdminCandidatesCrudBody />
      </ModuleProvider>
    </AdminLayout>
  )
}

function AdminCandidatesCrudBody() {
  const { moduleData, isLoading, isError, error, refetch, isFetching, isListFetching } = useCommonCrudListData()

  const params = getSearchParams<{ page?: number; limit?: number; search?: string }>()
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || PAGE_SIZE

  const [searchDraft, setSearchDraft] = useState(() => params.search ?? '')
  useEffect(() => {
    setSearchDraft(params.search ?? '')
  }, [params.search])

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

  const rows = moduleData.result as unknown as CandidateListRowData[]
  const total = moduleData.totalRecords
  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1
  const showingTo = (page - 1) * limit + rows.length
  const busy = isFetching || isListFetching

  return (
    <ListingPageShell
      title="Candidates"
      description="Manage and evaluate your talent pipeline with high-precision assessment analytics."
      trailing={
        <EmployerListToolbar
          searchPlaceholder="Search by name or email…"
          searchValue={searchDraft}
          onSearchChange={setSearchDraft}
        />
      }
      isLoading={isLoading && rows.length === 0}
      error={isError ? (error instanceof Error ? error : new Error('Failed to load candidates')) : null}
      onRetry={() => void refetch()}
    >
      <EmployerTableCard className={busy ? 'opacity-60 transition-opacity' : ''}>
        <div className="overflow-x-auto">
          <EmployerTableHeaderRow columns={['Name', 'Email', 'Score', 'Status', 'Date', '']} />
          <div className="min-w-[880px]">
            {rows.map((row, i) => (
              <CandidateListRow
                key={row.id}
                row={row}
                borderTop={i > 0}
                detailHref={adminCandidateProfile(row.id)}
              />
            ))}
          </div>
        </div>
        <EmployerTableFooterBar
          showingFrom={showingFrom}
          showingTo={showingTo}
          total={total}
          entityLabel="candidates"
          canGoPrevious={page > 1 && !busy}
          canGoNext={page * limit < total && !busy}
          onPrevious={() => setSearchPrams({ page: Math.max(1, page - 1), limit })}
          onNext={() => setSearchPrams({ page: page + 1, limit })}
        />
      </EmployerTableCard>
    </ListingPageShell>
  )
}

export default AdminCandidates
