import skillsureLogoFull from '@/assets/svg/skillsure-logo-full.svg'
import { DashboardStickyHeader } from '@/components/layouts/DashboardStickyHeader'
import { DashboardSideNavLayout } from '@/components/layouts/DashboardSideNavLayout'
import { EmployerFooter } from '@/components/layouts/EmployerFooter'
import { adminNavItems } from '@/lib/adminNavItems'
import { appRoutes } from '@/lib/utils/routes'
import { type ReactNode } from 'react'

export type AdminLayoutProps = {
  children: ReactNode
  searchPlaceholder?: string
  profileImageSrc?: string
  profileName?: string
}

/**
 * Admin shell: same sidebar, sticky header, and footer chrome as the employer dashboard.
 */
export function AdminLayout({
  children,
  searchPlaceholder = 'Search platform, employers, or candidates...',
  profileImageSrc,
  profileName = 'Admin',
}: AdminLayoutProps) {
  return (
    <DashboardSideNavLayout
      logoSrc={skillsureLogoFull}
      logoAlt="SkillSure"
      logoHref={appRoutes.home}
      navItems={adminNavItems}
    >
      <main className="relative z-0 flex min-h-screen min-w-0 flex-col bg-[#F7F9FB] text-foreground">
        <DashboardStickyHeader
          searchPlaceholder={searchPlaceholder}
          profileImageSrc={profileImageSrc}
          profileName={profileName}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>

        <EmployerFooter />
      </main>
    </DashboardSideNavLayout>
  )
}
