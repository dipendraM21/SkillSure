import { appRoutes } from '@/lib/utils/routes'
import { BarChart3, FileText, LayoutDashboard, Users, type LucideIcon } from 'lucide-react'

export type EmployerNavItem = {
  to: string
  label: string
  icon: LucideIcon
  disabled?: boolean
}

export const employerNavItems: EmployerNavItem[] = [
  { to: appRoutes.employer.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { to: appRoutes.employer.candidates, label: 'Candidates', icon: Users },
  { to: '/employer/assessments', label: 'Assessments', icon: FileText, disabled: true },
  { to: '/employer/analytics', label: 'Analytics', icon: BarChart3, disabled: true },
]
