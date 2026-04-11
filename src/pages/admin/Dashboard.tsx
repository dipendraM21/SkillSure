import { AdminLayout } from '@/components/layouts/AdminLayout'
import { appRoutes } from '@/lib/utils/routes'
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Sparkles, Terminal, Users } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="flex w-full min-w-0 flex-col items-start gap-8 overflow-x-hidden p-6 sm:p-8">
          <section className="flex w-full min-w-0 flex-col items-start gap-1 self-stretch">
            <h1 className="w-full fs-30 font-bold font-heading leading-9 tracking-[-0.75px] text-[#191C1E]">Admin dashboard</h1>
            <p className="w-full fs-16 font-normal font-body leading-6 text-[#434655]">
              System-wide performance, employers, and platform health at a glance.
            </p>
          </section>

          <div className="grid w-full min-w-0 grid-cols-1 gap-8 self-stretch md:grid-cols-3">
            <StatCard icon={<Users size={22} />} label="Total candidates" value="12,842" iconBg="#DBE1FF" iconColor="#003EA8" />
            <StatCard icon={<Building2 size={22} />} label="Total employers" value="456" iconBg="#EADDFF" iconColor="#5A00C6" />
            <StatCard icon={<Terminal size={20} />} label="Total tests" value="8,103" iconBg="#C9E6FF" iconColor="#004C6E" />
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="flex min-w-0 flex-col lg:col-span-2">
              <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
                <div className="flex w-full flex-row flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-6">
                  <h2 className="shrink-0 fs-20 font-bold font-heading leading-7 text-[#191C1E]">Recent activity</h2>
                  <button
                    type="button"
                    className="shrink-0 text-[14px] font-semibold leading-5 text-[#004AC6] underline-offset-2 transition-colors hover:text-[#003a9e] hover:underline"
                  >
                    View all logs
                  </button>
                </div>
                <div className="flex flex-col divide-y divide-slate-100 px-2 py-2">
                  <LogRow status="primary" title="New assessment published" detail="Advanced React Hooks" time="2 mins ago" />
                  <LogRow status="violet" title="Employer upgrade" detail="Nexus Tech Corp" time="14 mins ago" />
                  <LogRow status="amber" title="System maintenance" detail="Database optimization" time="1 hr ago" />
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-3">
              <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)] sm:p-8">
                <div className="mb-8 flex flex-row flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="fs-20 font-bold font-heading leading-7 text-[#191C1E]">Platform traffic</h2>
                    <p className="mt-1 text-[14px] font-normal leading-5 text-[#434655]">Engagement across the last 7 days</p>
                  </div>
                  <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Live
                  </span>
                </div>
                <div className="flex flex-1 items-end justify-between gap-2 px-1 pb-2">
                  <TrafficBar height="50%" label="Mon" />
                  <TrafficBar height="65%" label="Tue" />
                  <TrafficBar height="100%" label="Wed" active />
                  <TrafficBar height="40%" label="Thu" />
                  <TrafficBar height="75%" label="Fri" />
                  <TrafficBar height="85%" label="Sat" active />
                  <TrafficBar height="60%" label="Sun" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex min-h-[267px] flex-col items-start gap-[15px] rounded-2xl border border-[rgba(138,76,252,0.2)] bg-[rgba(234,221,255,0.35)] p-8 shadow-[0_20px_40px_rgba(0,74,198,0.04)]">
              <div className="flex flex-row items-center gap-2 self-stretch">
                <Sparkles size={22} className="shrink-0 text-[#712AE2]" aria-hidden />
                <h3 className="fs-18 font-bold font-heading leading-7 text-[#25005A]">Admin insight</h3>
              </div>
              <p className="self-stretch text-[14px] font-normal font-body leading-[23px] text-[#5A00C6]">
                Candidate volume is up <span className="font-bold">14%</span> week over week. Employer onboarding is strongest in the{' '}
                <span className="font-bold">cloud infrastructure</span> sector—consider prioritizing capacity for related assessments.
              </p>
              <Link
                to={appRoutes.admin.employers}
                className="flex flex-row items-center gap-1 pt-2 text-[14px] font-bold leading-5 text-[#712AE2] transition-colors hover:text-[#5b1fc7]"
                viewTransition
              >
                Manage employers
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="relative isolate flex min-h-[268px] flex-col items-start overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-8 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
              <div className="absolute bottom-0 right-0 z-0 opacity-10" aria-hidden>
                <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 120C40 80 100 100 140 40C160 10 180 0 200 0V120H0Z" fill="#004AC6" />
                </svg>
              </div>
              <div className="relative z-10 flex w-full min-w-0 flex-col self-stretch">
                <h3 className="w-full fs-18 font-bold font-heading leading-7 text-[#191C1E]">Assessment completion rate</h3>
                <p className="mt-1 w-full text-[14px] font-normal font-body leading-5 text-[#434655]">Rolling 30-day platform average</p>
                <div className="mt-8 flex flex-wrap items-end gap-2">
                  <span className="text-[36px] font-bold font-heading leading-none tracking-tight text-[#004AC6]">94.2</span>
                  <span className="pb-1.5 text-[16px] font-semibold font-body leading-6 text-[#434655]">%</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </AdminLayout>
  )
}

const StatCard = ({
  icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  iconBg: string
  iconColor: string
}) => (
  <div className="flex h-[104px] min-w-0 flex-row items-center rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
    <div className="flex size-14 shrink-0 flex-row items-center justify-center rounded-xl" style={{ backgroundColor: iconBg }}>
      <span style={{ color: iconColor }}>{icon}</span>
    </div>
    <div className="flex h-[51px] flex-col items-start pl-4">
      <div className="flex min-h-[15px] flex-col items-start self-stretch text-[12px] font-semibold leading-[15px] text-[#64748B]">
        {label}
      </div>
      <div className="flex min-h-9 flex-col items-start self-stretch">
        <p className="fs-30 font-bold font-heading leading-9 text-[#191C1E]">{value}</p>
      </div>
    </div>
  </div>
)

const LogRow = ({
  status,
  title,
  detail,
  time,
}: {
  status: 'primary' | 'violet' | 'amber'
  title: string
  detail: string
  time: string
}) => {
  const dot =
    status === 'primary' ? 'bg-primary' : status === 'violet' ? 'bg-[#712AE2]' : 'bg-amber-500'
  return (
    <div className="flex flex-row items-center gap-4 px-4 py-4 transition-colors hover:bg-[#F8FAFC]">
      <div className={`size-2 shrink-0 rounded-full ${dot}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-5 text-[#191C1E]">{title}</p>
        <p className="mt-0.5 text-[12px] font-normal leading-4 text-[#434655]">
          {detail} · {time}
        </p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-slate-400" strokeWidth={2} aria-hidden />
    </div>
  )
}

const TrafficBar = ({ height, label, active = false }: { height: string; label: string; active?: boolean }) => (
  <div className="flex flex-1 flex-col items-center gap-3">
    <div
      className={`w-full max-w-[40px] rounded-lg transition-all duration-700 ${
        active ? 'bg-primary shadow-md shadow-primary/25' : 'bg-[#E5E7EB]'
      }`}
      style={{ height }}
    />
    <span className="text-fs-size-11 font-semibold text-[#64748B]">{label}</span>
  </div>
)

export default AdminDashboard
