/** Typical paginated envelope from SkillSure-style APIs */
export type PaginatedResult<T> = {
  result: T[]
  totalRecords: number
}

export type PaginatedParams = {
  page?: number
  limit?: number
  search?: string
}
