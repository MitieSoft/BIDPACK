// Method Statements Page
import MethodStatementList from '@/components/method-statements/MethodStatementList'
import PageHeader from '@/components/PageHeader'

export default function MethodStatementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Method Statements"
        description="Manage your construction method statements"
      />
      <MethodStatementList />
    </div>
  )
}

