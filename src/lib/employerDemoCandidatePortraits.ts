/**
 * Demo-only: stable portrait URLs for employer candidate list + profile (real photos, not initials).
 * Uses Unsplash with face-area crop for square avatars.
 */
/** Square headshot-style crop (Unsplash CDN). */
const face = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2.5&w=512&h=512&q=80`

const PORTRAITS: Record<string, string> = {
  '1': face('photo-1573496359142-b8d87734a5a2'),
  '2': face('photo-1507003211169-0a1dd7228f2d'),
  '3': face('photo-1580489944761-15a19d654956'),
  '4': face('photo-1506794778202-cad84cf45f1d'),
}

const DEFAULT_PORTRAIT = face('photo-1544005313-94ddf0286df2')

export function employerDemoPortraitByCandidateId(id: string): string {
  return PORTRAITS[id] ?? DEFAULT_PORTRAIT
}

export type EmployerDemoCandidateHeader = {
  name: string
  role: string
  email: string
  avatarUrl: string
}

const HEADERS: Record<string, EmployerDemoCandidateHeader> = {
  '1': {
    name: 'Sarah Jenkins',
    role: 'Senior analyst',
    email: 'sarah.jenkins@example.com',
    avatarUrl: PORTRAITS['1'],
  },
  '2': {
    name: 'Marcus Chen',
    role: 'Engineering lead',
    email: 'marcus.chen@tech.io',
    avatarUrl: PORTRAITS['2'],
  },
  '3': {
    name: 'Elena Rodriguez',
    role: 'Data scientist',
    email: 'elena.rod@global.com',
    avatarUrl: PORTRAITS['3'],
  },
  '4': {
    name: 'Jordan Smith',
    role: 'Customer success',
    email: 'jordan.s@startup.co',
    avatarUrl: PORTRAITS['4'],
  },
}

const DEFAULT_HEADER: EmployerDemoCandidateHeader = {
  name: 'Alexandria Sterling',
  role: 'Senior architect',
  email: 'a.sterling@example.com',
  avatarUrl: DEFAULT_PORTRAIT,
}

export function employerDemoCandidateHeader(id: string | undefined): EmployerDemoCandidateHeader {
  if (id && HEADERS[id]) return HEADERS[id]
  return DEFAULT_HEADER
}
