import { CandidateProfilePageBody } from '@/components/employer/CandidateProfilePageBody'
import { EmployerAppLayout } from '@/components/layouts/EmployerAppLayout'
import { appRoutes } from '@/lib/utils/routes'
import { useParams } from 'react-router-dom'

const EmployerCandidateProfile = () => {
  const { candidateId } = useParams<{ candidateId: string }>()

  return (
    <EmployerAppLayout searchPlaceholder="Search assessments or candidates...">
      <CandidateProfilePageBody candidateId={candidateId} backHref={appRoutes.employer.candidates} />
    </EmployerAppLayout>
  )
}

export default EmployerCandidateProfile
