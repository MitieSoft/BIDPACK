// Create Policy Page
import PolicyEditor from '@/components/policies/PolicyEditor'
import PageHeader from '@/components/PageHeader'

export default function CreatePolicyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Policy"
        description="Create a new company policy"
      />
      <PolicyEditor />
    </div>
  )
}

