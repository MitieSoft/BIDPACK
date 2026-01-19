// Policy Templates Page
import PolicyTemplates from '@/components/policies/PolicyTemplates'
import PageHeader from '@/components/PageHeader'

export default function PolicyTemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Policy Templates"
        description="Start from a template to create your policies quickly"
      />
      <PolicyTemplates />
    </div>
  )
}

