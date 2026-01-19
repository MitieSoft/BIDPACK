'use client'

// Bid Detail Page
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBid } from '@/lib/api/bidService'
import BidHeader from '@/components/bids/BidHeader'
import BidTabs from '@/components/bids/BidTabs'
import BidSections from '@/components/bids/BidSections'
import ComplianceMatrix from '@/components/compliance/ComplianceMatrix'
import SocialValueForm from '@/components/social-value/SocialValueForm'
import ExportHistory from '@/components/export/ExportHistory'
import Card from '@/components/ui/Card'
import { toast } from 'react-hot-toast'
import type { Bid } from '@/types'

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'sections', name: 'Sections' },
  { id: 'compliance', name: 'Compliance Matrix' },
  { id: 'social-value', name: 'Social Value' },
  { id: 'team', name: 'Team' },
]

export default function BidDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bidId = params?.id as string
  const [bid, setBid] = useState<Bid | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (bidId) {
      loadBid()
    }
  }, [bidId])

  const loadBid = async () => {
    try {
      const data = await getBid(bidId)
      if (!data) {
        toast.error('Bid not found')
        router.push('/bids')
        return
      }
      setBid(data)
    } catch (error) {
      toast.error('Failed to load bid')
      router.push('/bids')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!bid) {
    return null
  }

  return (
    <div className="space-y-6">
      <BidHeader bid={bid} onUpdate={setBid} />
      <BidTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === 'overview' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bid Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Client</p>
                <p className="text-gray-900 dark:text-white">{bid.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-gray-900 dark:text-white capitalize">{bid.status.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-gray-900 dark:text-white">
                  {new Date(bid.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        )}
        {activeTab === 'sections' && <BidSections bidId={bidId} />}
        {activeTab === 'compliance' && <ComplianceMatrix bidId={bidId} />}
        {activeTab === 'social-value' && <SocialValueForm bidId={bidId} />}
        {activeTab === 'team' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team</h3>
            <p className="text-gray-500 dark:text-gray-400">Team management coming soon</p>
          </Card>
        )}
      </div>
      <div className="mt-6">
        <ExportHistory bidId={bidId} />
      </div>
    </div>
  )
}

