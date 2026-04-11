import { type ReactNode } from 'react'

export type EmployerPageHeaderProps = {
  title: string
  description?: string
  /** Right side: search + filter, buttons, etc. */
  trailing?: ReactNode
}

/**
 * Reusable page title block for employer list/detail screens (title + subtitle + optional toolbar).
 */
export function EmployerPageHeader({ title, description, trailing }: EmployerPageHeaderProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <h1 className="fs-30 font-bold font-heading tracking-[-0.75px] text-[#191C1E]">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl fs-16 font-normal leading-6 text-[#434655]">{description}</p>
        ) : null}
      </div>
      {trailing ? <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">{trailing}</div> : null}
    </div>
  )
}
