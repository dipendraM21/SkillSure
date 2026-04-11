import type { DashboardSideNavItem } from '@/components/layouts/DashboardSideNavLayout'
import { appRoutes } from '@/lib/utils/routes'
import { Building2, Database, FileQuestion, LayoutDashboard, ShieldAlert, Users } from 'lucide-react'

/** Admin sidebar — same nav contract as {@link employerNavItems}. */
export const adminNavItems: DashboardSideNavItem[] = [
  { to: appRoutes.admin.dashboard, label: 'Overview', icon: LayoutDashboard },
  { to: appRoutes.admin.candidates, label: 'Candidates', icon: Users },
  { to: appRoutes.admin.employers, label: 'Employers', icon: Building2 },
  { to: appRoutes.admin.questions, label: 'Questions', icon: FileQuestion },
  { to: appRoutes.admin.flags, label: 'Security logs', icon: ShieldAlert },
  { to: appRoutes.admin.auditLog, label: 'Resources', icon: Database },
]
