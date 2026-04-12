import { EmployerTableCard } from '@/components/employer/EmployerTableCard'
import { ListingPageShell } from '@/components/listing'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { Database, FileJson, Link2 } from 'lucide-react'
import type { ReactNode } from 'react'

const Resources = () => {
  return (
    <AdminLayout>
      <ListingPageShell
        title="Resources"
        description="API documentation, data exports, and integration assets for platform operators."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ResourceCard
            icon={<Database className="size-6 text-primary" strokeWidth={2} />}
            title="Data exports"
            body="Schedule CSV snapshots of candidates, employers, and assessment outcomes."
          />
          <ResourceCard
            icon={<FileJson className="size-6 text-primary" strokeWidth={2} />}
            title="API schemas"
            body="OpenAPI definitions for webhooks and partner integrations."
          />
          <ResourceCard
            icon={<Link2 className="size-6 text-primary" strokeWidth={2} />}
            title="Webhooks"
            body="Configure signing secrets and retry policies for event delivery."
          />
        </div>

        <EmployerTableCard className="shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-fs-size-16 font-bold font-heading text-[#191C1E]">Recent export jobs</h2>
            <p className="mt-1 text-fs-size-13 text-[#64748B] font-body">Connect your API to replace this placeholder table.</p>
          </div>
          <div className="px-6 py-10 text-center text-fs-size-14 text-[#64748B] font-body">No jobs yet.</div>
        </EmployerTableCard>
      </ListingPageShell>
    </AdminLayout>
  )
}

function ResourceCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">{icon}</div>
      <h3 className="mt-4 text-fs-size-16 font-bold font-heading text-[#191C1E]">{title}</h3>
      <p className="mt-2 text-fs-size-13 leading-5 text-[#64748B] font-body">{body}</p>
    </div>
  )
}

export default Resources
