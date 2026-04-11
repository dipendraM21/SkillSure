import { EmployerAppLayout } from '@/components/layouts/EmployerAppLayout'
import { appRoutes } from '@/lib/utils/routes'
import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, CheckCircle2, Users } from 'lucide-react'

const EmployerDashboard = () => {
  return (
    <EmployerAppLayout>
      <div className="flex w-full min-w-0 flex-col items-start gap-8 overflow-x-hidden p-6 sm:p-8">
          <section className="flex w-full min-w-0 flex-col items-start gap-1 self-stretch">
            <h2 className="w-full fs-30 font-bold font-heading leading-9 tracking-[-0.75px] text-[#191C1E]">Employer Dashboard</h2>
            <p className="w-full fs-16 font-normal font-body leading-6 text-[#434655]">
              Review your recent hiring performance and candidate insights.
            </p>
          </section>

          {/* Stat cards — 104px row, 24px inner padding, 16px radius, Figma shadow */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-8 self-stretch md:grid-cols-3">
            <StatCard icon={<Users size={22} />} label="Total Candidates" value="1,284" iconBg="#DBE1FF" iconColor="#003EA8" />
            <StatCard icon={<Zap size={16} />} label="Average Score" value="76%" iconBg="#EADDFF" iconColor="#5A00C6" />
            <StatCard icon={<CheckCircle2 size={20} />} label="Tests Completed" value="842" iconBg="#C9E6FF" iconColor="#004C6E" />
          </div>

          <div className="flex w-full min-w-0 flex-col items-start overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
            <div className="flex w-full flex-row flex-wrap items-center justify-between gap-3 self-stretch bg-white p-6">
              <h3 className="shrink-0 fs-20 font-bold font-heading leading-7 text-[#191C1E]">Recent Candidates</h3>
              <Link
                to={appRoutes.employer.candidates}
                className="shrink-0 text-[14px] font-semibold leading-5 text-[#004AC6] underline-offset-2 transition-colors hover:text-[#003a9e] hover:underline"
                viewTransition
              >
                View all candidates
              </Link>
            </div>

            <div className="flex w-full min-w-0 flex-col self-stretch overflow-x-auto">
              <div className="flex h-12 min-w-[960px] flex-row items-stretch bg-[#F2F4F6]/50">
                <TableHeaderCell width="241.81px" label="Name" />
                <TableHeaderCell width="242.69px" label="Assessment" />
                <TableHeaderCell width="175.3px" label="Score" />
                <TableHeaderCell width="163.28px" label="Status" />
                <TableHeaderCell width="136.92px" label="Action" alignRight />
              </div>
              <div className="flex min-w-[960px] flex-col self-stretch">
                <CandidateRow name="Sarah Jenkins" email="sarah.j@example.com" assessment="Financial Analysis" score={88} status="Completed" />
                <CandidateRow name="Marcus Chen" email="m.chen@tech.io" assessment="Senior Project Management" score={null} status="In Progress" borderTop actionLabel="Remind" actionClassName="text-[#94A3B8]" />
                <CandidateRow
                  name="Elena Rodriguez"
                  email="elena.rod@global.com"
                  assessment="Data Science Fundamentals"
                  score={92}
                  status="Review Required"
                  borderTop
                  actionLabel="Review Now"
                  actionClassName="text-[#712AE2]"
                />
                <CandidateRow name="Jordan Smith" email="jordan.s@startup.co" assessment="Customer Success Ops" score={74} status="Completed" borderTop />
              </div>
            </div>

          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex min-h-[267px] flex-col items-start gap-[15px] rounded-2xl border border-[rgba(138,76,252,0.2)] bg-[rgba(234,221,255,0.35)] p-8 shadow-[0_20px_40px_rgba(0,74,198,0.04)]">
              <div className="flex flex-row items-center gap-2 self-stretch">
                <Sparkles size={22} className="shrink-0 text-[#712AE2]" aria-hidden />
                <h4 className="fs-18 font-bold font-heading leading-7 text-[#25005A]">SkillCanvas AI Insight</h4>
              </div>
              <p className="self-stretch text-[14px] font-normal font-body leading-[23px] text-[#5A00C6]">
                Based on recent assessments, your candidate pool for <span className="font-bold">Financial Analysis</span> shows a 12% higher-than-average aptitude in Risk Mitigation compared to industry benchmarks. Consider accelerating interviews for the top 5 percentile.
              </p>
              <button type="button" className="flex flex-row items-center gap-1 pt-2">
                <span className="text-center text-[14px] font-bold leading-5 text-[#712AE2]">See full talent report</span>
                <span className="text-[#712AE2]" aria-hidden>
                  →
                </span>
              </button>
            </div>

            <div className="relative isolate flex min-h-[268px] flex-col items-start overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
              <div className="absolute bottom-0 right-0 z-0 opacity-10" aria-hidden>
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 120C40 80 100 100 140 40C160 10 180 0 200 0V120H0Z" fill="#004AC6" />
                </svg>
              </div>

              <div className="relative z-10 flex w-full min-w-0 flex-col items-start self-stretch">
                <h4 className="w-full fs-18 font-bold font-heading leading-7 text-[#191C1E]">Hiring Velocity</h4>
                <p className="mt-1 w-full text-[14px] font-normal font-body leading-5 text-[#434655]">Average time to hire this month</p>
                <div className="mt-8 flex flex-wrap items-end gap-2">
                  <span className="text-[36px] font-bold font-heading leading-none tracking-tight text-[#004AC6]">14.2</span>
                  <span className="pb-1.5 text-[16px] font-semibold font-body leading-6 text-[#434655]">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </EmployerAppLayout>
  )
}

/* Components */

const StatCard = ({ icon, label, value, iconBg, iconColor }: { icon: React.ReactNode; label: string; value: string; iconBg: string; iconColor: string }) => (
  <div className="flex h-[104px] min-w-0 flex-row items-center rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
    <div className="flex size-14 shrink-0 flex-row items-center justify-center rounded-xl" style={{ backgroundColor: iconBg }}>
      <span style={{ color: iconColor }}>{icon}</span>
    </div>
    <div className="flex h-[51px] flex-col items-start pl-4">
      <div className="flex min-h-[15px] flex-col items-start self-stretch text-[12px] font-semibold leading-[15px] text-[#64748B]">
        {label}
      </div>
      <div className="flex min-h-9 flex-col items-start self-stretch">
        <h3 className="fs-30 font-bold font-heading leading-9 text-[#191C1E]">{value}</h3>
      </div>
    </div>
  </div>
)

const TableHeaderCell = ({ width, label, alignRight = false }: { width: string, label: string, alignRight?: boolean }) => (
  <div className="flex flex-col items-start p-4 px-6 h-12" style={{ width }}>
    <span className={`flex w-full items-center text-[13px] font-semibold font-body leading-4 text-[#64748B] ${alignRight ? 'justify-end text-right' : ''}`}>
      {label}
    </span>
  </div>
);

const CandidateRow = ({
  name,
  email,
  assessment,
  score,
  status,
  borderTop = false,
  actionLabel = 'View Result',
  actionClassName = 'text-[#004AC6]',
  scoreClassName,
}: {
  name: string
  email: string
  assessment: string
  score: number | null
  status: string
  borderTop?: boolean
  actionLabel?: string
  actionClassName?: string
  scoreClassName?: string
}) => {
  const statusColors = {
    Completed: { bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]' },
    'In Progress': { bg: 'bg-[#DBEAFE]', text: 'text-[#1D4ED8]' },
    'Review Required': { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
  }
  const color = statusColors[status as keyof typeof statusColors] || { bg: 'bg-gray-100', text: 'text-gray-600' }
  const scoreText =
    scoreClassName ?? (score != null ? 'text-[#004AC6]' : 'text-[#94A3B8]')

  return (
    <div
      className={`flex min-h-[72px] w-full flex-row items-center pl-6 transition-colors hover:bg-[#F2F4F6]/30 ${borderTop ? 'border-t border-[#F2F4F6]' : ''}`}
    >
      <div className="flex h-10 w-[193.81px] shrink-0 flex-row items-center">
        <div className="size-10 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_0_0_2px_#F7F9FB]">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} alt="" className="size-full object-cover" />
        </div>
        <div className="flex h-9 min-w-0 flex-col items-start pl-4">
          <span className="text-[14px] font-semibold leading-5 text-[#191C1E]">{name}</span>
          <span className="text-[12px] font-normal leading-4 text-[#434655]">{email}</span>
        </div>
      </div>

      <div className="flex w-[266.69px] shrink-0 flex-col items-start justify-center px-6 py-[26px] pl-12">
        <span className="text-[14px] font-normal leading-5 text-[#191C1E]">{assessment}</span>
      </div>

      <div className="flex h-5 w-[151.3px] shrink-0 flex-row items-center pl-6">
        <span className={`text-[14px] font-bold leading-5 ${scoreText}`}>{score != null ? `${score}/100` : '--/100'}</span>
        {score != null ? (
          <div className="relative ml-2 h-1.5 w-16 shrink-0 rounded-full bg-[#E6E8EA]">
            <div className="absolute left-0 top-0 h-full rounded-full bg-[#004AC6]" style={{ width: `${score}%` }} />
          </div>
        ) : null}
      </div>

      <div className="flex w-[187.28px] shrink-0 flex-col items-start justify-center px-6 py-[26px] pl-12">
        <div className={`inline-flex rounded-full px-3 py-1 ${color.bg}`}>
          <span className={`text-[11px] font-semibold capitalize leading-4 ${color.text}`}>{status}</span>
        </div>
      </div>

      <div className="flex min-h-[72px] w-[136.92px] shrink-0 flex-col items-end justify-center px-6 py-[26px]">
        <button type="button" className={`text-[14px] font-semibold leading-5 ${actionClassName}`}>
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export default EmployerDashboard;
