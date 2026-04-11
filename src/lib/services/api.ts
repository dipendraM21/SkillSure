import { getApiBaseUrl } from '@/lib/api/env'
import { getSession } from '@/lib/auth/session'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const BaseUrl = {
  PRODUCTION: import.meta.env.VITE_PRODUCTION_URL,
  STAGING: import.meta.env.VITE_STAGING_URL,
  DEVELOPMENT: import.meta.env.VITE_DEVELOPMENT_URL,
}

const legacyBase = BaseUrl[(import.meta.env.VITE_ENV as keyof typeof BaseUrl) || 'DEVELOPMENT']

/** Prefer `VITE_API_BASE_URL` (SkillSure) when set; else legacy env-based base for recipe-style CRUD demos. */
export const API_BASE = getApiBaseUrl() || legacyBase

export const axiosApi = axios.create({ baseURL: API_BASE })

axiosApi.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const session = getSession()
  const token = session?.accessToken ?? Cookies.get('token')
  if (token) {
    cfg.headers['Authorization'] = `Bearer ${token}`
  }
  return cfg
})

//  Response interceptor
axiosApi.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError) => {
    const status = err.response?.status

    // not authorize
    if (status && [401, 403].includes(status)) {
      // privateHookStore.navigate?.('/login')
    }

    // page not found
    if (status && [404].includes(status)) {
      // privateHookStore.navigate?.('/NotFound')
    }

    // network error show
    if (err.code == 'ERR_NETWORK') {
      toast.error(err.message, { autoClose: 3000 })
    }

    return Promise.reject(err)
  },
)
