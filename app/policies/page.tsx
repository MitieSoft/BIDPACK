// Policy Library Page
import PolicyList from '@/components/policies/PolicyList'
import PageHeader from '@/components/PageHeader'

export default function PoliciesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Policy Library"
        description="Manage your company policies and procedures"
      />
      <PolicyList />
    </div>
  )
}

