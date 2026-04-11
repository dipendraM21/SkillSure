import { apiClient } from '@/lib/api/client'
import { isApiConfigured } from '@/lib/api/env'
import { withMockLatency } from '@/lib/api/mock/delay'
import type { PaginatedParams, PaginatedResult } from '@/lib/api/types'

export type AdminEmployerRow = {
  id: string
  name: string
  logoBg: string
  sector: string
  assessments: number
  barPct: number
  status: 'inProgress' | 'completed'
}

const MOCK_EMPLOYERS: AdminEmployerRow[] = [
  {
    id: 'SKL-4920',
    name: 'Vellum Dynamics',
    logoBg: 'from-slate-700 to-slate-900',
    sector: 'Cloud infrastructure',
    assessments: 148,
    barPct: 80,
    status: 'inProgress',
  },
  {
    id: 'SKL-4891',
    name: 'Helix Biologics',
    logoBg: 'from-emerald-600 to-emerald-800',
    sector: 'Bio-engineering',
    assessments: 312,
    barPct: 100,
    status: 'completed',
  },
  {
    id: 'SKL-5012',
    name: 'Northwind Labs',
    logoBg: 'from-amber-600 to-orange-800',
    sector: 'Data platforms',
    assessments: 12,
    barPct: 20,
    status: 'inProgress',
  },
]

type ApiEmployer = {
  id: string
  name: string
  sector?: string
  assessments_count?: number
  completion_percent?: number
  status?: string
  brand_gradient?: string
}

function mapEmployer(row: ApiEmployer): AdminEmployerRow {
  const st = (row.status ?? 'in_progress').toLowerCase().replace(/-/g, '')
  const status: 'inProgress' | 'completed' = st === 'completed' ? 'completed' : 'inProgress'
  return {
    id: String(row.id),
    name: row.name,
    logoBg: row.brand_gradient ?? 'from-slate-700 to-slate-900',
    sector: row.sector ?? '—',
    assessments: row.assessments_count ?? 0,
    barPct: Math.min(100, Math.max(0, row.completion_percent ?? 0)),
    status,
  }
}

export async function fetchAdminEmployersList(params: PaginatedParams = {}): Promise<PaginatedResult<AdminEmployerRow>> {
  if (!isApiConfigured()) {
    const page = Math.max(1, params.page ?? 1)
    const limit = Math.max(1, params.limit ?? 10)
    const start = (page - 1) * limit
    return withMockLatency({
      result: MOCK_EMPLOYERS.slice(start, start + limit),
      totalRecords: 1284,
    })
  }

  const { data } = await apiClient.get<{ data: { result: ApiEmployer[]; totalRecords: number } }>('/v1/admin/employers', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search,
    },
  })
  const payload = data?.data ?? data
  const result = (payload as { result: ApiEmployer[] }).result ?? []
  const totalRecords = (payload as { totalRecords: number }).totalRecords ?? result.length
  return { result: result.map(mapEmployer), totalRecords }
}
