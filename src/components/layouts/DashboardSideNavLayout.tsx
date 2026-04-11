import { cn } from '@/lib/utils'
import { type LucideIcon, Menu, X } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

const SIDEBAR_W_CLASS = 'w-64' /* 256px — matches Figma */

export type DashboardSideNavItem = {
  to: string
  label: string
  icon: LucideIcon
  /** When true, renders a non-link row (use until the route exists). */
  disabled?: boolean
}

export type DashboardSideNavLayoutProps = {
  /** Shown when `logoSrc` is omitted */
  title?: string
  /** Sidebar wordmark — max width fits 192px Figma header column */
  logoSrc?: string
  logoAlt?: string
  logoHref?: string
  tierLabel?: string
  navItems: DashboardSideNavItem[]
  children: ReactNode
}

export function DashboardSideNavLayout({
  title,
  logoSrc,
  logoAlt = '',
  logoHref = '/',
  tierLabel,
  navItems,
  children,
}: DashboardSideNavLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <div className="min-h-screen bg-bg-light text-foreground font-body">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobile}
        />
      ) : null}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full min-h-screen flex-col bg-slate-50',
          SIDEBAR_W_CLASS,
          'transition-transform duration-200 ease-out lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Main navigation"
      >
        {/* Header: 32px padding, 4px gap — Figma */}
        <div className="flex shrink-0 flex-col gap-1 p-8">
          <div className="flex items-center justify-between gap-2 lg:justify-start">
            <div className="min-w-0 flex-1">
              {logoSrc ? (
                <Link to={logoHref} className="inline-block max-w-full outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 focus-visible:ring-offset-2" viewTransition onClick={closeMobile}>
                  <img src={logoSrc} alt={logoAlt} className="h-9 w-auto max-w-[192px] object-contain object-left" width={192} height={36} />
                </Link>
              ) : title ? (
                <h1 className="flex min-h-7 items-center fs-20 font-bold font-heading leading-7 tracking-[-0.5px] text-slate-900">{title}</h1>
              ) : null}
            </div>
            <button
              type="button"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label="Close sidebar"
              onClick={closeMobile}
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>
          {tierLabel ? (
            <p className="flex min-h-4 items-center fs-12 font-semibold uppercase leading-4 tracking-[1.2px] text-slate-500">{tierLabel}</p>
          ) : null}
        </div>

        {/* Nav: horizontal 16px inset, 4px gap between links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4" aria-label="Dashboard">
          {navItems.map((item) => {
            const Icon = item.icon
            if (item.disabled) {
              return (
                <div
                  key={item.to}
                  className="box-border flex h-11 w-full max-w-[224px] shrink-0 cursor-not-allowed flex-row items-center border-r-2 border-transparent px-4 py-3 font-normal text-slate-500"
                  aria-disabled="true"
                >
                  <span className="flex h-4-5 w-[30px] shrink-0 items-center justify-start pr-3">
                    <Icon className="size-4-5 shrink-0 text-slate-500" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 truncate fs-14 font-normal leading-5">{item.label}</span>
                </div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={closeMobile}
                className={({ isActive }) =>
                  cn(
                    'box-border flex h-11 w-full max-w-[224px] shrink-0 flex-row items-center rounded-none px-4 py-3 transition-colors',
                    isActive
                      ? 'border-r-2 border-blue-600 bg-slate-100 font-semibold text-blue-600'
                      : 'border-r-2 border-transparent font-normal text-slate-500 hover:bg-slate-100/80',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex h-4-5 w-[30px] shrink-0 items-center justify-start pr-3">
                      <Icon
                        className={cn('size-4-5 shrink-0', isActive ? 'text-blue-600' : 'text-slate-500')}
                        strokeWidth={isActive ? 2.25 : 2}
                      />
                    </span>
                    <span className="min-w-0 truncate fs-14 leading-5">{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className={cn('min-h-screen min-w-0', 'lg:pl-64')}>
        <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200/80 bg-slate-50/95 px-4 backdrop-blur-sm lg:hidden">
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-900 hover:bg-slate-100"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-6" strokeWidth={2} />
          </button>
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt} className="h-7 w-auto max-w-[140px] object-contain object-left" width={140} height={28} />
          ) : (
            <span className="min-w-0 truncate fs-16 font-semibold font-heading text-slate-900">{title}</span>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
