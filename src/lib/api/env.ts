/** Base URL for REST API (no trailing slash). Empty = use local mock data in services. */
export function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''
}

export function isApiConfigured(): boolean {
  return getApiBaseUrl().length > 0
}
