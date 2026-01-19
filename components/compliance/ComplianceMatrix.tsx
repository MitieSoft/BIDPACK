'use client'

// Compliance Matrix Component
import { useEffect, useState } from 'react'
import {
  listBidRequirements,
  createBidRequirement,
  updateBidRequirement,
  deleteBidRequirement,
  autoMapRequirements,
} from '@/lib/api/bidService'
import ComplianceTable from './ComplianceTable'
import ComplianceSummary from './ComplianceSummary'
import RequirementInput from './RequirementInput'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { toast } from 'react-hot-toast'
import type { BidRequirement } from '@/types'

interface ComplianceMatrixProps {
  bidId: string
}

export default function ComplianceMatrix({ bidId }: ComplianceMatrixProps) {
  const [requirements, setRequirements] = useState<BidRequirement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoMapping, setIsAutoMapping] = useState(false)

  useEffect(() => {
    loadRequirements()
  }, [bidId])

  const loadRequirements = async () => {
    try {
      const data = await listBidRequirements(bidId)
      setRequirements(data)
    } catch (error) {
      toast.error('Failed to load requirements')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoMap = async () => {
    setIsAutoMapping(true)
    try {
      const result = await autoMapRequirements(bidId)
      toast.success(`Mapped ${result.mapped} out of ${result.total} requirements`)
      loadRequirements()
    } catch (error: any) {
      toast.error(error.message || 'Failed to auto-map requirements')
    } finally {
      setIsAutoMapping(false)
    }
  }

  const handleRequirementCreate = async (text: string, category?: string) => {
    try {
      await createBidRequirement(bidId, {
        requirementText: text,
        requirementCategory: category,
      })
      toast.success('Requirement added successfully')
      loadRequirements()
    } catch (error: any) {
      toast.error(error.message || 'Failed to add requirement')
    }
  }

  const handleRequirementUpdate = async (requirementId: string, data: Partial<BidRequirement>) => {
    try {
      await updateBidRequirement(requirementId, data)
      toast.success('Requirement updated successfully')
      loadRequirements()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update requirement')
    }
  }

  const handleRequirementDelete = async (requirementId: string) => {
    if (!confirm('Are you sure you want to delete this requirement?')) {
      return
    }

    try {
      await deleteBidRequirement(requirementId)
      toast.success('Requirement deleted successfully')
      loadRequirements()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete requirement')
    }
  }

  if (isLoading) {
    return <Card>Loading compliance matrix...</Card>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance Matrix</h3>
        <Button onClick={handleAutoMap} disabled={isAutoMapping} variant="secondary">
          {isAutoMapping ? 'Mapping...' : 'Auto-Map Requirements'}
        </Button>
      </div>

      <RequirementInput onCreate={handleRequirementCreate} />

      <ComplianceSummary requirements={requirements} />

      <ComplianceTable
        requirements={requirements}
        onUpdate={handleRequirementUpdate}
        onDelete={handleRequirementDelete}
      />
    </div>
  )
}

