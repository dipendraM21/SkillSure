import { EmployerPageHeader } from '@/components/employer/EmployerPageHeader'
import { EmployerTableCard } from '@/components/employer/EmployerTableCard'
import { EmployerTableFooterBar } from '@/components/employer/EmployerTableFooterBar'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import {
  AlertTriangle,
  AppWindow,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Globe,
  MicOff,
  Monitor,
  UserX,
} from 'lucide-react'
import { type ReactNode, useMemo, useState } from 'react'

type Severity = 'critical' | 'warning' | 'notice'

type FlagRow = {
  id: string
  candidateName: string
  candidateId: string
  avatarUrl: string
  employer: string
  flagLabel: string
  flagIcon: 'globe' | 'tab' | 'mic' | 'face'
  severity: Severity
  timestamp: string
}

const MOCK_FLAGS: FlagRow[] = [
  {
    id: '1',
    candidateName: 'Marcus Thorne',
    candidateId: 'SK-8842',
    avatarUrl: 'https://ui-avatars.com/api/?name=Marcus+Thorne&background=4427ad&color=fff&size=64',
    employer: 'Aether Cloud Systems',
    flagLabel: 'IP change',
    flagIcon: 'globe',
    severity: 'critical',
    timestamp: 'Oct 24, 14:22:05',
  },
  {
    id: '2',
    candidateName: 'Elena Rodriguez',
    candidateId: 'SK-9120',
    avatarUrl: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=4427ad&color=fff&size=64',
    employer: 'FinTech Dynamics',
    flagLabel: 'Tab switch',
    flagIcon: 'tab',
    severity: 'warning',
    timestamp: 'Oct 24, 14:18:32',
  },
  {
    id: '3',
    candidateName: 'David Chen',
    candidateId: 'SK-2204',
    avatarUrl: 'https://ui-avatars.com/api/?name=David+Chen&background=18ad99&color=fff&size=64',
    employer: 'Veridian Global',
    flagLabel: 'Mic disabled',
    flagIcon: 'mic',
    severity: 'notice',
    timestamp: 'Oct 24, 14:15:10',
  },
  {
    id: '4',
    candidateName: 'Samuel Oak',
    candidateId: 'SK-5531',
    avatarUrl: 'https://ui-avatars.com/api/?name=Samuel+Oak&background=6D28D9&color=fff&size=64',
    employer: 'Summit Innovations',
    flagLabel: 'Face lost',
    flagIcon: 'face',
    severity: 'critical',
    timestamp: 'Oct 24, 14:12:44',
  },
]

const TOTAL_FLAGS = 158
const PAGE_SIZE = 4

const AdminSecurityFlags = () => {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(TOTAL_FLAGS / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

  const { showingFrom, showingTo } = useMemo(() => {
    const from = (safePage - 1) * PAGE_SIZE + 1
    const to = Math.min(safePage * PAGE_SIZE, TOTAL_FLAGS)
    return { showingFrom: from, showingTo: to }
  }, [safePage])

  return (
    <AdminLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-8 bg-[#F7F9FB] px-6 py-8 sm:px-8">
        <EmployerPageHeader
          title="Security flags monitoring"
          description="Real-time surveillance of proctoring anomalies and suspicious activity across all active assessment sessions."
          trailing={
            <>
              <button
                type="button"
                className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-[#F2F4F6] px-6 text-[14px] font-bold leading-5 text-[#191C1E] transition-colors hover:bg-[#E8EBEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 sm:w-auto font-body"
              >
                <Filter className="size-4 shrink-0 text-slate-600" strokeWidth={2} aria-hidden />
                Filter logs
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-br from-primary to-[#6D28D9] px-6 text-[14px] font-bold leading-5 text-white shadow-[0_10px_24px_rgba(68,39,173,0.28)] transition-[transform,box-shadow] hover:shadow-[0_14px_28px_rgba(68,39,173,0.32)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F9FB] sm:w-auto sm:px-8 font-body"
              >
                <Download className="size-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
                Export report
              </button>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <FlagStatCard
            iconWrapClass="bg-red-50"
            icon={<AlertTriangle className="size-5 text-red-700" strokeWidth={2} aria-hidden />}
            trend="+12% vs last hour"
            trendChipClass="bg-red-50 text-red-800"
            value="42"
            label="High severity"
          />
          <FlagStatCard
            iconWrapClass="bg-amber-100/80"
            icon={<Clock className="size-5 text-amber-900" strokeWidth={2} aria-hidden />}
            trend="Normal levels"
            trendChipClass="bg-amber-100/90 text-amber-900"
            value="158"
            label="Total flags (24h)"
          />
          <FlagStatCard
            iconWrapClass="bg-primary/12"
            icon={<Monitor className="size-5 text-primary" strokeWidth={2} aria-hidden />}
            trend="Primary incident"
            trendChipClass="bg-primary/12 text-primary"
            value="Tab switch"
            label="Frequent flag type"
            valueIsText
          />
          <FlagStatCard
            iconWrapClass="bg-teal-50"
            icon={<CheckCircle2 className="size-5 text-teal-700" strokeWidth={2} aria-hidden />}
            value="94.2%"
            label="Integrity score"
          />
        </div>

        <EmployerTableCard className="shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
          <div className="flex flex-col gap-2 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <h2 className="text-fs-size-18 font-bold font-heading leading-7 text-[#191C1E]">Suspicious activity stream</h2>
            <div className="flex items-center gap-2">
              <span className="size-2 shrink-0 rounded-full bg-danger" aria-hidden />
              <span className="text-fs-size-14 font-normal leading-5 text-[#64748B] font-body">Live monitoring active</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="flex flex-row border-b border-slate-100 bg-[#F9FAFB] px-6">
                <HeaderCell className="w-[200px] shrink-0">Candidate</HeaderCell>
                <HeaderCell className="min-w-[160px] flex-1">Employer</HeaderCell>
                <HeaderCell className="w-[140px] shrink-0">Flag type</HeaderCell>
                <HeaderCell className="w-[120px] shrink-0 justify-center text-center">Severity</HeaderCell>
                <HeaderCell className="w-[140px] shrink-0">Timestamp</HeaderCell>
                <HeaderCell className="w-[100px] shrink-0 justify-end text-right">Actions</HeaderCell>
              </div>
              {MOCK_FLAGS.map((row, i) => (
                <FlagTableRow key={row.id} row={row} borderTop={i > 0} />
              ))}
            </div>
          </div>

          <EmployerTableFooterBar
            showingFrom={showingFrom}
            showingTo={showingTo}
            total={TOTAL_FLAGS}
            entityLabel="flags"
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            maxPageButtons={5}
          />
        </EmployerTableCard>
      </div>
    </AdminLayout>
  )
}

function HeaderCell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center py-4 ${className}`}>
      <span className="text-fs-size-13 font-semibold leading-4 text-[#64748B] font-body">{children}</span>
    </div>
  )
}

function FlagStatCard({
  icon,
  iconWrapClass,
  value,
  label,
  trend,
  trendChipClass,
  valueIsText,
}: {
  icon: ReactNode
  iconWrapClass: string
  value: string
  label: string
  trend?: string
  trendChipClass?: string
  valueIsText?: boolean
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
      <div className="flex flex-row items-start justify-between gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/5 ${iconWrapClass}`}
        >
          {icon}
        </div>
        {trend != null ? (
          <span
            className={`max-w-[min(100%,11rem)] rounded-full px-2.5 py-1 text-right text-fs-size-11 font-bold leading-4 ${trendChipClass ?? 'bg-slate-100 text-slate-700'} font-body`}
          >
            {trend}
          </span>
        ) : null}
      </div>
      <p
        className={`mt-3 font-heading font-bold tracking-tight text-[#191C1E] ${valueIsText ? 'text-fs-size-22 leading-8 sm:text-fs-size-26 sm:leading-8' : 'text-fs-size-28 leading-8 sm:text-fs-size-30 sm:leading-9'}`}
      >
        {value}
      </p>
      <p className="mt-1 text-fs-size-12 font-semibold leading-4 text-[#64748B] font-body">{label}</p>
    </div>
  )
}

function FlagTableRow({ row, borderTop }: { row: FlagRow; borderTop: boolean }) {
  const sev =
    row.severity === 'critical'
      ? { pill: 'bg-red-50 text-red-800 ring-1 ring-red-100', label: 'Critical' }
      : row.severity === 'warning'
        ? { pill: 'bg-amber-100/90 text-amber-900 ring-1 ring-amber-200/80', label: 'Warning' }
        : { pill: 'bg-primary/12 text-primary ring-1 ring-primary/15', label: 'Notice' }

  const FlagIcon = () => {
    if (row.flagIcon === 'tab')
      return <AppWindow className="size-3.5 shrink-0 text-amber-700" strokeWidth={2.5} aria-hidden />
    if (row.flagIcon === 'mic')
      return <MicOff className="size-3.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
    if (row.flagIcon === 'face')
      return <UserX className="size-3.5 shrink-0 text-red-600" strokeWidth={2.5} aria-hidden />
    return <Globe className="size-3.5 shrink-0 text-red-600" strokeWidth={2.5} aria-hidden />
  }

  return (
    <div
      className={`flex flex-row items-center gap-6 px-6 py-4 transition-colors hover:bg-[#F8FAFC] ${borderTop ? 'border-t border-slate-100' : ''}`}
    >
      <div className="flex w-[200px] shrink-0 flex-row items-center gap-3">
        <div className="size-8 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-200/80">
          <img src={row.avatarUrl} alt="" className="size-full object-cover" width={32} height={32} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-fs-size-15 font-bold leading-5 text-[#191C1E]">{row.candidateName}</p>
          <p className="mt-0.5 text-[12px] font-semibold leading-4 text-[#64748B] font-body">ID: {row.candidateId}</p>
        </div>
      </div>
      <div className="min-w-[160px] flex-1">
        <p className="text-fs-size-14 font-medium leading-5 text-[#191C1E] font-body">{row.employer}</p>
      </div>
      <div className="flex w-[140px] shrink-0 flex-row items-center gap-2">
        <FlagIcon />
        <span className="text-fs-size-14 font-normal leading-5 text-[#191C1E] font-body">{row.flagLabel}</span>
      </div>
      <div className="flex w-[120px] shrink-0 justify-center">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${sev.pill} font-body`}
        >
          {sev.label}
        </span>
      </div>
      <div className="w-[140px] shrink-0">
        <p className="text-fs-size-14 font-normal leading-5 text-[#64748B] font-body">{row.timestamp}</p>
      </div>
      <div className="flex w-[100px] shrink-0 justify-end">
        <button
          type="button"
          className="text-fs-size-14 font-semibold leading-5 text-primary transition-colors hover:text-[#6D28D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 font-body"
        >
          Investigate
        </button>
      </div>
    </div>
  )
}

export default AdminSecurityFlags
