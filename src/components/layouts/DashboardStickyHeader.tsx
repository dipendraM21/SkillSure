import { Bell, Search, Settings } from 'lucide-react'

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

export type DashboardStickyHeaderProps = {
  searchPlaceholder?: string
  profileImageSrc?: string
  profileName?: string
}

/** Sticky top bar — shared by employer and admin app shells. */
export function DashboardStickyHeader({
  searchPlaceholder = 'Search assessments or candidates...',
  profileImageSrc = DEFAULT_AVATAR,
  profileName = 'Account',
}: DashboardStickyHeaderProps) {
  return (
    <header className="sticky top-14 z-30 flex h-16 w-full min-w-0 shrink-0 flex-row items-center justify-between gap-4 border-b border-slate-200/90 bg-white px-4 shadow-[0_1px_0_0_rgba(15,23,42,0.06)] sm:px-8 lg:top-0">
      <div className="relative min-w-0 flex-1">
        <div className="relative mx-auto w-full max-w-md sm:mx-0">
          <div className="relative flex h-9 flex-row items-center rounded-lg border border-slate-200/60 bg-[#F2F4F6] px-4 py-2 pl-10">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-[13.5px] -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-[17px] w-full min-w-0 border-none bg-transparent fs-14 font-normal leading-[17px] text-slate-800 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="flex h-9 shrink-0 flex-row items-center gap-1 sm:gap-2">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="size-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Settings"
        >
          <Settings className="size-4-5" strokeWidth={1.75} />
        </button>
        <div className="ml-1 flex items-center pl-1 sm:ml-2 sm:pl-2">
          <div className="size-9 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-2 ring-slate-100">
            <img src={profileImageSrc} alt={profileName} className="size-full object-cover" width={36} height={36} />
          </div>
        </div>
      </div>
    </header>
  )
}
