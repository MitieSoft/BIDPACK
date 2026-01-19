'use client'

// Policy Detail Page
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPolicy, deletePolicy, duplicatePolicy } from '@/lib/api/policyService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import PolicyTypeBadge from '@/components/policies/PolicyTypeBadge'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { Policy } from '@/types'

export default function PolicyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const policyId = params?.id as string
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (policyId) {
      loadPolicy()
    }
  }, [policyId])

  const loadPolicy = async () => {
    try {
      const data = await getPolicy(policyId)
      if (!data) {
        toast.error('Policy not found')
        router.push('/policies')
        return
      }
      setPolicy(data)
    } catch (error) {
      toast.error('Failed to load policy')
      router.push('/policies')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this policy?')) {
      return
    }

    try {
      await deletePolicy(policyId)
      toast.success('Policy deleted successfully')
      router.push('/policies')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete policy')
    }
  }

  const handleDuplicate = async () => {
    try {
      const newPolicy = await duplicatePolicy(policyId)
      toast.success('Policy duplicated successfully')
      router.push(`/policies/${newPolicy.id}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate policy')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!policy) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <PolicyTypeBadge type={policy.policyType} />
              <Badge variant="info" size="sm">
                Version {policy.version}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{policy.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last updated: {format(new Date(policy.lastUpdatedAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.push(`/policies/${policy.id}/edit`)}>
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" onClick={handleDuplicate}>
              <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
              Duplicate
            </Button>
            <Button variant="ghost" onClick={handleDelete}>
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-900 dark:text-white">{policy.content}</div>
        </div>
      </Card>
    </div>
  )
}

