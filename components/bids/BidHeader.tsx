'use client'

// Bid Header Component
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateBid, deleteBid } from '@/lib/api/bidService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import { TrashIcon } from '@heroicons/react/24/outline'
import ExportButton from '@/components/export/ExportButton'
import type { Bid } from '@/types'

interface BidHeaderProps {
  bid: Bid
  onUpdate?: (bid: Bid) => void
}

export default function BidHeader({ bid, onUpdate }: BidHeaderProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [clientName, setClientName] = useState(bid.clientName)
  const [deadline, setDeadline] = useState(bid.deadline)
  const [status, setStatus] = useState(bid.status)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedBid = await updateBid(bid.id, {
        clientName,
        deadline,
        status,
      })
      toast.success('Bid updated successfully')
      setIsEditing(false)
      onUpdate?.(updatedBid)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update bid')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this bid? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteBid(bid.id)
      toast.success('Bid deleted successfully')
      router.push('/bids')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete bid')
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'success'
      case 'ready':
        return 'info'
      case 'in_progress':
        return 'warning'
      case 'draft':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <Input
                label="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <Input
                label="Deadline"
                type="datetime-local"
                value={deadline ? new Date(deadline).toISOString().slice(0, 16) : ''}
                onChange={(e) => setDeadline(new Date(e.target.value).toISOString())}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Bid['status'])}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="draft">Draft</option>
                  <option value="in_progress">In Progress</option>
                  <option value="ready">Ready</option>
                  <option value="submitted">Submitted</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{bid.clientName}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Deadline: {format(new Date(bid.deadline), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusBadgeVariant(bid.status)} size="sm">
                  {bid.status.replace('_', ' ')}
                </Badge>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <ExportButton bidId={bid.id} />
              <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
                <TrashIcon className="h-5 w-5 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

