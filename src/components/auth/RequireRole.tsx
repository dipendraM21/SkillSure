import { getSession, type AuthRole } from '@/lib/auth/session'
import { appRoutes } from '@/lib/utils/routes'
import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function loginRouteForRole(role: AuthRole): string {
  if (role === 'admin') return appRoutes.admin.login
  if (role === 'employer') return appRoutes.employer.login
  return appRoutes.candidate.login
}

export type RequireRoleProps = {
  role: AuthRole
  children: ReactNode
}

/**
 * When `VITE_ENFORCE_AUTH=true`, blocks children until session matches `role`.
 * Off by default so local demos work without logging in first.
 */
export function RequireRole({ role, children }: RequireRoleProps) {
  const location = useLocation()
  const enforce = import.meta.env.VITE_ENFORCE_AUTH === 'true'

  if (!enforce) {
    return children
  }

  const session = getSession()
  if (!session || session.role !== role) {
    return <Navigate to={loginRouteForRole(role)} replace state={{ from: location.pathname }} />
  }

  return children
}
