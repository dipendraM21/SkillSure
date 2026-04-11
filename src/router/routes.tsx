/* eslint-disable react-refresh/only-export-components */
import { RequireRole } from '@/components/auth/RequireRole'
import { appRoutes } from '@/lib/utils/routes'
import { Login } from '@/pages/onBoarding/signin/Login'
import { lazy, type ReactElement } from 'react'

const LandingPage = lazy(() => import('../pages/landing/LandingPage'))

const Error404 = lazy(() =>
  import('../pages/error/Error404').then((module) => ({
    default: module.Error404,
  })),
)

const AdminLogin = lazy(() => import('../pages/onBoarding/auth/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'))
const AdminEmployers = lazy(() => import('../pages/admin/Employers'))
const AdminSecurityFlags = lazy(() => import('../pages/admin/SecurityFlags'))
const AdminCandidates = lazy(() => import('../pages/admin/Candidates'))
const AdminCandidateProfile = lazy(() => import('../pages/admin/CandidateProfile'))
const AdminQuestions = lazy(() => import('../pages/admin/Questions'))
const EmployerLogin = lazy(() => import('../pages/onBoarding/auth/EmployerLogin'))
const CandidateLogin = lazy(() => import('../pages/onBoarding/auth/CandidateLogin'))
const EmployerDashboard = lazy(() => import('../pages/employer/Dashboard'))
const EmployerCandidates = lazy(() => import('../pages/employer/Candidates'))
const EmployerCandidateProfile = lazy(() => import('../pages/employer/CandidateProfile'))
const CandidateWelcome = lazy(() => import('../pages/candidate/CandidateWelcome'))
const CandidateAssessment = lazy(() => import('../pages/candidate/CandidateAssessment'))
const AdminResources = lazy(() => import('../pages/admin/Resources'))

function guardAdmin(page: ReactElement) {
  return <RequireRole role="admin">{page}</RequireRole>
}

function guardEmployer(page: ReactElement) {
  return <RequireRole role="employer">{page}</RequireRole>
}

function guardCandidate(page: ReactElement) {
  return <RequireRole role="candidate">{page}</RequireRole>
}

const routes = [
  {
    path: appRoutes.home,
    element: <LandingPage />,
    layout: 'blank',
  },
  {
    path: appRoutes.admin.login,
    element: <AdminLogin />,
    layout: 'blank',
  },
  {
    path: appRoutes.admin.dashboard,
    element: guardAdmin(<AdminDashboard />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.employers,
    element: guardAdmin(<AdminEmployers />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.candidates,
    element: guardAdmin(<AdminCandidates />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.candidateProfile,
    element: guardAdmin(<AdminCandidateProfile />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.flags,
    element: guardAdmin(<AdminSecurityFlags />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.questions,
    element: guardAdmin(<AdminQuestions />),
    layout: 'blank',
  },
  {
    path: appRoutes.admin.auditLog,
    element: guardAdmin(<AdminResources />),
    layout: 'blank',
  },
  {
    path: appRoutes.employer.login,
    element: <EmployerLogin />,
    layout: 'blank',
  },
  {
    path: appRoutes.employer.dashboard,
    element: guardEmployer(<EmployerDashboard />),
    layout: 'blank',
  },
  {
    path: appRoutes.employer.candidates,
    element: guardEmployer(<EmployerCandidates />),
    layout: 'blank',
  },
  {
    path: appRoutes.employer.candidateProfile,
    element: guardEmployer(<EmployerCandidateProfile />),
    layout: 'blank',
  },
  {
    path: appRoutes.candidate.login,
    element: <CandidateLogin />,
    layout: 'blank',
  },
  {
    path: appRoutes.candidate.welcome,
    element: guardCandidate(<CandidateWelcome />),
    layout: 'blank',
  },
  {
    path: appRoutes.candidate.assessment,
    element: guardCandidate(<CandidateAssessment />),
    layout: 'blank',
  },
  {
    path: appRoutes.login,
    element: <Login />,
    layout: 'blank',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
]

export { routes }
