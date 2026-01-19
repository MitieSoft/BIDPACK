// Bids List Page
import BidList from '@/components/bids/BidList'
import PageHeader from '@/components/PageHeader'

export default function BidsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bids"
        description="Manage your tender submissions and track compliance"
      />
      <BidList />
    </div>
  )
}

