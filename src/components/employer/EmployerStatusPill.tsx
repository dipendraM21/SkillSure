const variants = {
  completed: 'bg-[#EDE9FE] text-[#5B21B6]',
  inProgress: 'bg-[#FFEDD5] text-[#9A3412]',
  invited: 'bg-[#F3F4F6] text-[#4B5563]',
  reviewRequired: 'bg-[#FEF3C7] text-[#B45309]',
} as const

export type EmployerStatusVariant = keyof typeof variants

export type EmployerStatusPillProps = {
  label: string
  variant: EmployerStatusVariant
}

export function EmployerStatusPill({ label, variant }: EmployerStatusPillProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold capitalize  leading-4 text-nowrap tracking-wide ${variants[variant]}`}
    >
      {label}
    </span>
  )
}
