import AuthLayout from '@/components/auth/AuthLayout'
import LoginCard from '@/components/auth/LoginCard'
import { appRoutes } from '@/lib/utils/routes'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const CandidateWelcome = () => {
  return (
    <AuthLayout>
      <LoginCard title="You’re verified" description="Your workspace is ready. Start when you feel focused and distraction-free.">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
            <Sparkles className="size-6 shrink-0 text-primary" aria-hidden />
            <p className="text-fs-size-14 font-medium leading-6 text-[#434655] font-body">
              Complete the assessment in one sitting. Your progress saves automatically between sections.
            </p>
          </div>
          <Link
            to={appRoutes.candidate.assessment}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-fs-size-14 font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:bg-primary/92 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 font-body"
            viewTransition
          >
            Begin assessment
            <ArrowRight className="size-5" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </LoginCard>
    </AuthLayout>
  )
}

export default CandidateWelcome
