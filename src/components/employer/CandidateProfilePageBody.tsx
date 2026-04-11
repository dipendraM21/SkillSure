import { employerDemoCandidateHeader } from '@/lib/employerDemoCandidatePortraits'
import { AlertTriangle, ArrowLeft, Filter, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOCK = {
  assessmentBadge: 'Completed',
  overallScore: '94.2%',
  experience: '8.5 yrs',
  status: 'Vetted',
  education: 'M.Sc. Computer Science, Stanford',
  location: 'Austin, Texas',
  dimensions: [
    { label: 'Algorithmic efficiency', pct: 98 },
    { label: 'System architecture', pct: 89 },
    { label: 'Cognitive flexibility', pct: 92 },
    { label: 'Logical deductions', pct: 85 },
  ] as const,
  integrity: [
    { label: 'Tab switching', badge: '2 detected', tone: 'danger' as const },
    { label: 'Clipboard usage', badge: '0 detected', tone: 'neutral' as const },
    { label: 'Device motion', badge: 'Stable', tone: 'accent' as const },
  ],
  responses: [
    {
      index: '01',
      question:
        'How would you handle a circular dependency in a large-scale microservices architecture?',
      body: 'I would first identify if the services can be merged or if the shared logic can be extracted into a new library. If the coupling is logical, I’d implement an event-driven pattern using a message broker like Kafka to decouple the synchronous call…',
      rating: 5.0,
      code: null as string | null,
      note: null as string | null,
    },
    {
      index: '02',
      question: 'Optimize the following Big O complexity for a search function…',
      body: null as string | null,
      code: '[Code response provided: O(log n) implementation using binary search]',
      note: 'Correct implementation with edge-case handling.',
      rating: 4.8,
    },
  ],
}

export type CandidateProfilePageBodyProps = {
  candidateId: string | undefined
  backHref: string
  backLabel?: string
}

export function CandidateProfilePageBody({
  candidateId,
  backHref,
  backLabel = 'Back to candidates',
}: CandidateProfilePageBodyProps) {
  const header = employerDemoCandidateHeader(candidateId)

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 py-6 sm:px-6 sm:py-8 lg:gap-12 lg:px-8">
      <div className="flex flex-col gap-4">
        <Link
          to={backHref}
          className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-lg border border-slate-200/70 bg-white px-3.5 text-[14px] font-semibold text-[#434655] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-[color,background,border-color,box-shadow] hover:border-slate-300 hover:bg-[#FAFBFC] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F9FB] font-body"
          viewTransition
        >
          <ArrowLeft className="size-4 shrink-0 text-[#64748B]" strokeWidth={2} aria-hidden />
          {backLabel}
        </Link>
      </div>

      <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="relative isolate mx-auto shrink-0 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] lg:mx-0">
          <div className="size-40 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/90 sm:size-44 lg:h-48 lg:w-48">
            <img
              src={header.avatarUrl}
              alt={`${header.name} profile photo`}
              className="h-full w-full object-cover object-[center_15%]"
              width={192}
              height={192}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <span className="absolute right-2 top-2 rounded bg-primary/30 px-2 py-1 text-[10px] font-bold leading-[15px] text-primary font-body">
            {MOCK.assessmentBadge}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#191C1D] sm:text-[32px] lg:text-[36px] lg:leading-[40px] font-heading">
              {header.name}
            </h1>
            <span className="w-fit rounded-full bg-[#E7E8E9] px-3 py-1 text-[12px] font-semibold tracking-wide text-primary font-body">
              {header.role}
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-6 lg:gap-8">
            <Metric label="Overall score" value={MOCK.overallScore} valueClassName="text-primary" />
            <Divider className="hidden sm:flex" />
            <Metric label="Experience" value={MOCK.experience} valueClassName="text-[#191C1D]" />
            <Divider className="hidden sm:flex" />
            <Metric label="Status" value={MOCK.status} valueClassName="text-primary" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)] sm:p-8 lg:col-span-8">
          <div>
            <h2 className="text-fs-size-20 font-bold leading-7 tracking-tight text-[#191C1D] font-heading">Dimension breakdown</h2>
            <p className="mt-1 max-w-xl text-[14px] font-normal leading-5 text-[#464554] font-body">
              Performance across core cognitive and technical vectors
            </p>
          </div>
          <div className="flex flex-col gap-8 lg:gap-10">
            {MOCK.dimensions.map((d) => (
              <DimensionBar key={d.label} label={d.label} pct={d.pct} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="flex flex-col gap-4 rounded-xl border-l-4 border-destructive bg-[#E7E8E9]/50 p-6 sm:p-8">
            <div className="flex flex-row items-center gap-3">
              <AlertTriangle className="size-5 shrink-0 text-destructive" aria-hidden />
              <h2 className="text-fs-size-18 font-bold leading-7 text-[#191C1D] font-heading">Integrity flags</h2>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK.integrity.map((row) => (
                <IntegrityBadge key={row.label} label={row.label} badge={row.badge} tone={row.tone} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,74,198,0.04)]">
            <h2 className="text-[14px] font-bold tracking-tight text-[#464554] font-body">Full profile details</h2>
            <div className="flex flex-col gap-6">
              <DetailField label="Email address" value={header.email} />
              <DetailField label="Education" value={MOCK.education} />
              <DetailField label="Current location" value={MOCK.location} />
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-8 rounded-xl bg-[#F3F4F5] p-6 sm:p-8 lg:gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-fs-size-24 font-bold leading-8 tracking-tight text-[#191C1D] font-heading">Response summary</h2>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 text-[13px] font-semibold leading-5 text-[#191C1D] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-[background,border-color,box-shadow,transform] hover:border-slate-300 hover:bg-[#FAFBFC] hover:shadow-[0_2px_8px_rgba(15,23,42,0.07)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F4F5] font-body"
            >
              <Filter className="size-[15px] shrink-0 text-[#64748B]" strokeWidth={2} aria-hidden />
              <span className="min-w-0 truncate">Filter: incorrect</span>
            </button>
            <button
              type="button"
              className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand-deep-purple)_35%,transparent)] bg-[var(--brand-deep-purple)] px-5 text-[13px] font-semibold leading-5 text-white shadow-[0_1px_2px_rgba(68,39,173,0.22)] transition-[background,box-shadow,transform] hover:bg-[color-mix(in_srgb,var(--brand-deep-purple)_88%,black)] hover:shadow-[0_4px_16px_rgba(68,39,173,0.28)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-deep-purple)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F4F5] font-body"
            >
              <PlayCircle className="size-[17px] shrink-0 text-white" strokeWidth={2} aria-hidden />
              <span className="min-w-0 truncate text-white">View full recording</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {MOCK.responses.map((r) => (
            <article key={r.index} className="flex flex-col gap-4 rounded-xl bg-white p-5 sm:flex-row sm:gap-6 sm:p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/25 text-[16px] font-bold text-primary font-heading">
                {r.index}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="text-[16px] font-bold leading-6 text-[#191C1D] font-heading">{r.question}</h3>
                {r.body ? (
                  <p className="text-[14px] font-normal italic leading-[23px] text-[#464554] font-body">{r.body}</p>
                ) : null}
                {r.code ? (
                  <pre className="overflow-x-auto rounded-lg bg-[#F3F4F5] p-4 font-mono text-[12px] leading-4 text-[#464554]">
                    {r.code}
                  </pre>
                ) : null}
                {r.note ? <p className="text-[14px] font-normal italic leading-5 text-[#464554] font-body">{r.note}</p> : null}
              </div>
              <ExpertRating value={r.rating} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function DimensionBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-start justify-between gap-4">
        <span className="text-[14px] font-semibold leading-5 text-[#191C1D] font-body">{label}</span>
        <span className="shrink-0 text-[14px] font-bold leading-5 text-primary font-body">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E1E3E4]">
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-[#6D28D9]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function IntegrityBadge({
  label,
  badge,
  tone,
}: {
  label: string
  badge: string
  tone: 'danger' | 'neutral' | 'accent'
}) {
  const styles = {
    danger: 'bg-[#FFDAD6] text-[#BA1A1A]',
    neutral: 'bg-[#E7E8E9] text-[#464554]',
    accent: 'bg-primary/20 text-primary',
  }[tone]

  return (
    <div className="flex flex-row items-center justify-between gap-3 rounded-lg bg-white px-3 py-3">
      <span className="text-[14px] font-medium leading-5 text-[#191C1D] font-body">{label}</span>
      <span className={`shrink-0 rounded px-2 py-1 text-[12px] font-bold leading-4 font-body ${styles}`}>{badge}</span>
    </div>
  )
}

function ExpertRating({ value }: { value: number }) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
      <span className="text-[12px] font-semibold leading-4 text-[#C7C4D7] font-body">Expert rating</span>
      <div className="flex flex-row items-baseline gap-0.5">
        <span className="text-fs-size-24 font-bold leading-8 tracking-tight text-[#191C1D] font-heading">
          {value.toFixed(1)}
        </span>
        <span className="text-[14px] font-bold leading-5 text-[#767586] font-heading">/5</span>
      </div>
    </div>
  )
}

function Metric({ label, value, valueClassName }: { label: string; value: string; valueClassName: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold leading-[15px] text-[#464554] font-body">{label}</span>
      <span className={`text-fs-size-30 font-bold leading-9 font-heading ${valueClassName}`}>{value}</span>
    </div>
  )
}

function Divider({ className }: { className?: string }) {
  return (
    <div className={`items-center ${className ?? ''}`} aria-hidden>
      <div className="h-10 w-px bg-[rgba(199,196,215,0.4)]" />
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold leading-[15px] text-[#767586] font-body">{label}</span>
      <span className="text-[14px] font-medium leading-5 text-[#191C1D] font-body">{value}</span>
    </div>
  )
}
