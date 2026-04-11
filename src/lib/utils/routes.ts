export const appRoutes = {
  home: '/',
  login: '/login',
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    candidates: '/admin/candidates',
    /** Dynamic segment — use `adminCandidateProfile(id)` for links */
    candidateProfile: '/admin/candidates/:candidateId',
    questions: '/admin/questions',
    employers: '/admin/employers',
    flags: '/admin/flags',
    auditLog: '/admin/audit-log',
  },
  employer: {
    login: '/employer/login',
    dashboard: '/employer/dashboard',
    candidates: '/employer/candidates',
    /** Dynamic segment — use `employerCandidateProfile(id)` for links */
    candidateProfile: '/employer/candidates/:candidateId',
  },
  candidate: {
    login: '/candidate/login',
    welcome: '/candidate/welcome',
    assessment: '/candidate/assessment',
  },
} as const

export function employerCandidateProfile(id: string) {
  return `${appRoutes.employer.candidates}/${encodeURIComponent(id)}`
}

export function adminCandidateProfile(id: string) {
  return `${appRoutes.admin.candidates}/${encodeURIComponent(id)}`
}
