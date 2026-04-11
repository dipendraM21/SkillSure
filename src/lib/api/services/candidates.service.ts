import type { CandidateListRowData } from '@/components/employer'
import { apiClient } from '@/lib/api/client'
import { isApiConfigured } from '@/lib/api/env'
import { withMockLatency } from '@/lib/api/mock/delay'
import type { PaginatedParams, PaginatedResult } from '@/lib/api/types'

const MOCK_ROWS: CandidateListRowData[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    scorePercent: 94,
    statusLabel: 'Completed',
    statusVariant: 'completed',
    date: new Date('2024-10-24'),
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus.chen@tech.io',
    scorePercent: 82,
    statusLabel: 'In progress',
    statusVariant: 'inProgress',
    date: new Date('2024-10-22'),
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.rod@global.com',
    scorePercent: null,
    statusLabel: 'Invited',
    statusVariant: 'invited',
    date: new Date('2024-10-20'),
  },
  {
    id: '4',
    name: 'Jordan Smith',
    email: 'jordan.s@startup.co',
    scorePercent: 71,
    statusLabel: 'Review required',
    statusVariant: 'reviewRequired',
    date: new Date('2024-10-18'),
  },
]

type ApiCandidateRow = {
  id: string
  full_name?: string
  name?: string
  email: string
  score_percent?: number | null
  status?: string
  assessed_at?: string
  updated_at?: string
}

function mapApiRow(row: ApiCandidateRow): CandidateListRowData {
  const status = (row.status ?? 'invited').toLowerCase().replace(/\s+/g, '')
  const variant =
    status === 'completed'
      ? 'completed'
      : status === 'inprogress' || status === 'in_progress'
        ? 'inProgress'
        : status === 'reviewrequired' || status === 'review_required'
          ? 'reviewRequired'
          : 'invited'
  const labels: Record<string, string> = {
    completed: 'Completed',
    inProgress: 'In progress',
    invited: 'Invited',
    reviewRequired: 'Review required',
  }
  const rawDate = row.assessed_at ?? row.updated_at
  return {
    id: String(row.id),
    name: row.full_name ?? row.name ?? 'Unknown',
    email: row.email,
    scorePercent: row.score_percent ?? null,
    statusLabel: labels[variant] ?? row.status ?? 'Unknown',
    statusVariant: variant,
    date: rawDate ? new Date(rawDate) : new Date(),
  }
}

async function fetchFromApi(
  path: string,
  params: PaginatedParams,
): Promise<PaginatedResult<CandidateListRowData>> {
  const { data } = await apiClient.get<{ data: { result: ApiCandidateRow[]; totalRecords: number } }>(path, {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search,
    },
  })
  const payload = data?.data ?? data
  const result = (payload as { result: ApiCandidateRow[] }).result ?? []
  const totalRecords = (payload as { totalRecords: number }).totalRecords ?? result.length
  return {
    result: result.map(mapApiRow),
    totalRecords,
  }
}

export async function fetchCandidatesList(
  scope: 'admin' | 'employer',
  params: PaginatedParams = {},
): Promise<PaginatedResult<CandidateListRowData>> {
  if (!isApiConfigured()) {
    const page = Math.max(1, params.page ?? 1)
    const limit = Math.max(1, params.limit ?? 10)
    const start = (page - 1) * limit
    const slice = MOCK_ROWS.slice(start, start + limit)
    return withMockLatency({
      result: slice,
      totalRecords: 128,
    })
  }

  const path = scope === 'admin' ? '/v1/admin/candidates' : '/v1/employer/candidates'
  return fetchFromApi(path, params)
}
