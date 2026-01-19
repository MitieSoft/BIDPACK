// Create Bid Page
import BidForm from '@/components/bids/BidForm'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/PageHeader'

export default function CreateBidPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Bid"
        description="Start a new tender submission"
      />
      <Card>
        <BidForm />
      </Card>
    </div>
  )
}

