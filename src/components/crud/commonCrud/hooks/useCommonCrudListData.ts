import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { JsonObject } from '@/types/json.types'
import { useIsFetching } from '@tanstack/react-query'

/**
 * Same list query wiring as {@link CommonCrudView} (React Query + `useDataHandler`),
 * for SkillSure-styled tables that do not use `CommonCrudTable`.
 */
export function useCommonCrudListData<TRecord extends JsonObject = JsonObject>() {
  const API = useModuleApi<TRecord>()
  const { useDataHandler } = API.crudApi.crudHandler
  const query = useDataHandler()
  const moduleData = (query.data?.data ?? { result: [], totalRecords: 0 }) as {
    result: TRecord[]
    totalRecords: number
  }
  const isListFetching = useIsFetching({ queryKey: API.crudApi.queryKeys.dataHandlerKey }) > 0

  return {
    ...query,
    moduleData,
    isListFetching,
    dataHandlerQueryKey: API.crudApi.queryKeys.dataHandlerKey,
  }
}
