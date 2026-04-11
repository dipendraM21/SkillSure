import AuthLayout from '@/components/auth/AuthLayout'
import LoginCard from '@/components/auth/LoginCard'
import { appRoutes } from '@/lib/utils/routes'
import { Timer } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Placeholder shell — swap for real proctoring / question flow when backend is ready. */
const CandidateAssessment = () => {
  return (
    <AuthLayout>
      <LoginCard
        title="Assessment session"
        description="This route will host timed items, integrity checks, and submission. Wire it to your assessment API when ready."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-[#F7F9FB] px-4 py-5">
          <div className="flex items-center gap-2 text-primary">
            <Timer className="size-5" strokeWidth={2} aria-hidden />
            <span className="text-fs-size-13 font-bold uppercase tracking-wide font-body">Demo mode</span>
          </div>
          <p className="text-fs-size-14 leading-6 text-[#64748B] font-body">
            Connect <code className="rounded bg-white px-1.5 py-0.5 text-fs-size-12 text-[#191C1E]">VITE_API_BASE_URL</code> and
            mount your question components here. Use the same auth session as candidate login.
          </p>
          <Link
            to={appRoutes.candidate.welcome}
            className="text-fs-size-14 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-sm font-body"
            viewTransition
          >
            Back to welcome
          </Link>
        </div>
      </LoginCard>
    </AuthLayout>
  )
}

export default CandidateAssessment
