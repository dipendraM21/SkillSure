export type AuthRole = 'admin' | 'employer' | 'candidate'

export type AuthSession = {
  role: AuthRole
  accessToken: string
  email?: string
}

const STORAGE_KEY = 'skillsure_session'

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthSession
    if (!parsed?.role || !parsed?.accessToken) return null
    return parsed
  } catch {
    return null
  }
}

export function setSession(session: AuthSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasRole(role: AuthRole): boolean {
  return getSession()?.role === role
}
