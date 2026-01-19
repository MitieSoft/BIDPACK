// Edit Policy Page
import { useParams } from 'next/navigation'
import PolicyEditor from '@/components/policies/PolicyEditor'
import PageHeader from '@/components/PageHeader'

export default function EditPolicyPage() {
  const params = useParams()
  const policyId = params?.id as string

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Policy"
        description="Update your policy content"
      />
      <PolicyEditor policyId={policyId} />
    </div>
  )
}

