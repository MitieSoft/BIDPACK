// Create Method Statement Page
import MethodStatementBuilder from '@/components/method-statements/MethodStatementBuilder'
import PageHeader from '@/components/PageHeader'

export default function CreateMethodStatementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Method Statement"
        description="Create a new construction method statement"
      />
      <MethodStatementBuilder />
    </div>
  )
}

