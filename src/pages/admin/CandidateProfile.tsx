import { CandidateProfilePageBody } from '@/components/employer/CandidateProfilePageBody'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { appRoutes } from '@/lib/utils/routes'
import { useParams } from 'react-router-dom'

const AdminCandidateProfile = () => {
  const { candidateId } = useParams<{ candidateId: string }>()

  return (
    <AdminLayout>
      <CandidateProfilePageBody candidateId={candidateId} backHref={appRoutes.admin.candidates} />
    </AdminLayout>
  )
}

export default AdminCandidateProfile
