// AI Usage History Page
import AIUsageHistory from '@/components/ai/AIUsageHistory'
import PageHeader from '@/components/PageHeader'

export default function AIHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Usage History"
        description="View your AI request history and ACU usage"
      />
      <AIUsageHistory />
    </div>
  )
}

