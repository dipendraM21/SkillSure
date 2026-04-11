import skillsureLogoFull from '@/assets/svg/skillsure-logo-full.svg'
import { DashboardStickyHeader } from '@/components/layouts/DashboardStickyHeader'
import { DashboardSideNavLayout } from '@/components/layouts/DashboardSideNavLayout'
import { EmployerFooter } from '@/components/layouts/EmployerFooter'
import { employerNavItems } from '@/lib/employerNavItems'
import { appRoutes } from '@/lib/utils/routes'
import { type ReactNode } from 'react'

export type EmployerAppLayoutProps = {
  children: ReactNode
  /** Search field placeholder (shared across employer pages) */
  searchPlaceholder?: string
  profileImageSrc?: string
  profileName?: string
}

/**
 * Shared shell for employer-facing pages: sidebar + sticky top bar + slim footer on every screen.
 */
export function EmployerAppLayout({
  children,
  searchPlaceholder = 'Search assessments or candidates...',
  profileImageSrc,
  profileName,
}: EmployerAppLayoutProps) {
  return (
    <DashboardSideNavLayout
      logoSrc={skillsureLogoFull}
      logoAlt="SkillSure"
      logoHref={appRoutes.home}
      navItems={employerNavItems}
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
