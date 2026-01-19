// ACU Dashboard Page
import ACUBalance from '@/components/acu/ACUBalance'
import ACULedger from '@/components/acu/ACULedger'
import TopUpButton from '@/components/acu/TopUpButton'
import PageHeader from '@/components/PageHeader'

export default function ACUDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="ACU Dashboard"
          description="Monitor your AI Consumption Unit balance and usage"
        />
        <TopUpButton />
      </div>
      <ACUBalance />
      <ACULedger />
    </div>
  )
}

