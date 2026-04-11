import { clearSession, getSession } from '@/lib/auth/session'
import { appRoutes } from '@/lib/utils/routes'
import axios, { type AxiosError } from 'axios'
import { getApiBaseUrl } from './env'

function loginPathForCurrentApp(): string {
  if (typeof window === 'undefined') return appRoutes.home
  const path = window.location.pathname
  if (path.startsWith('/admin')) return appRoutes.admin.login
  if (path.startsWith('/employer')) return appRoutes.employer.login
  if (path.startsWith('/candidate')) return appRoutes.candidate.login
  return appRoutes.login
}

/** Axios client for JSON APIs. When `VITE_API_BASE_URL` is unset, most services use mocks instead of this client. */
export const apiClient = axios.create({
  baseURL: getApiBaseUrl() || undefined,
  timeout: 30_000,
  headers: { Accept: 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const session = getSession()
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    if (status === 401) {
      clearSession()
      window.location.assign(loginPathForCurrentApp())
    }
    return Promise.reject(error)
  },
)
