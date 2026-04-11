import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { fetchCandidatesList } from '@/lib/api/services/candidates.service'
import { fetchAdminEmployersList } from '@/lib/api/services/employers.service'
import type { CommonAjaxProps } from '@/types/commonAjax.types'
import type { JsonObject } from '@/types/json.types'

function isPaginatedListGet(arg: { type?: string; data?: unknown }): boolean {
  const method = String(arg.type ?? 'GET').toUpperCase()
  if (method !== 'GET') return false
  const d = arg.data
  if (d == null || typeof d !== 'object' || d instanceof FormData) return false
  const o = d as JsonObject
  return 'page' in o || 'limit' in o
}

function listParams(data: JsonObject | undefined) {
  const d = data ?? {}
  return {
    page: Number(d.page) || 1,
    limit: Number(d.limit) || 10,
    search: (d.search as string | undefined) || undefined,
  }
}

/** List → SkillSure services (mock when `VITE_API_BASE_URL` unset); other verbs → `commonAjax`. */
export async function skillsureAdminEmployersExecuteAjax<TResponse = unknown>(
  arg: CommonAjaxProps<JsonObject, TResponse>,
): Promise<TResponse> {
  if (isPaginatedListGet(arg)) {
    const r = await fetchAdminEmployersList(listParams(arg.data as JsonObject))
    return {
      data: { result: r.result as unknown as JsonObject[], totalRecords: r.totalRecords },
    } as TResponse
  }
  return commonAjax<JsonObject, TResponse>(arg as CommonAjaxProps<JsonObject, TResponse>)
}

export async function skillsureAdminCandidatesExecuteAjax<TResponse = unknown>(
  arg: CommonAjaxProps<JsonObject, TResponse>,
): Promise<TResponse> {
  if (isPaginatedListGet(arg)) {
    const r = await fetchCandidatesList('admin', listParams(arg.data as JsonObject))
    return {
      data: { result: r.result as unknown as JsonObject[], totalRecords: r.totalRecords },
    } as TResponse
  }
  return commonAjax<JsonObject, TResponse>(arg as CommonAjaxProps<JsonObject, TResponse>)
}

export async function skillsureEmployerCandidatesExecuteAjax<TResponse = unknown>(
  arg: CommonAjaxProps<JsonObject, TResponse>,
): Promise<TResponse> {
  if (isPaginatedListGet(arg)) {
    const r = await fetchCandidatesList('employer', listParams(arg.data as JsonObject))
    return {
      data: { result: r.result as unknown as JsonObject[], totalRecords: r.totalRecords },
    } as TResponse
  }
  return commonAjax<JsonObject, TResponse>(arg as CommonAjaxProps<JsonObject, TResponse>)
}
