'use client'

// Export Button Component
import { useState } from 'react'
import { validateBidForExport, createExportJob } from '@/lib/api/exportService'
import ExportConfirmationModal from './ExportConfirmationModal'
import ExportStatus from './ExportStatus'
import Button from '@/components/ui/Button'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { ExportJob } from '@/types'

interface ExportButtonProps {
  bidId: string
}

export default function ExportButton({ bidId }: ExportButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [validation, setValidation] = useState<{
    canExport: boolean
    complianceStatus: any
    errors: string[]
  } | null>(null)
  const [exportJob, setExportJob] = useState<ExportJob | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const handleClick = async () => {
    setIsValidating(true)
    try {
      const validationResult = await validateBidForExport(bidId)
      setValidation(validationResult)
      setIsModalOpen(true)
    } catch (error: any) {
      toast.error(error.message || 'Failed to validate bid for export')
    } finally {
      setIsValidating(false)
    }
  }

  const handleExport = async (format: 'zip' | 'pdf' | 'both') => {
    try {
      const job = await createExportJob(bidId, format)
      setExportJob(job)
      setIsModalOpen(false)
      toast.success('Export job created. Processing...')
      
      // Poll for completion
      pollExportStatus(job.id)
    } catch (error: any) {
      toast.error(error.message || 'Failed to create export job')
    }
  }

  const pollExportStatus = async (jobId: string) => {
    const { getExportJob } = await import('@/lib/api/exportService')
    const interval = setInterval(async () => {
      try {
        const job = await getExportJob(jobId)
        if (job) {
          setExportJob(job)
          if (job.status === 'completed' || job.status === 'failed') {
            clearInterval(interval)
            if (job.status === 'completed') {
              toast.success('Export completed successfully!')
            }
          }
        }
      } catch (error) {
        clearInterval(interval)
      }
    }, 2000)

    // Stop polling after 30 seconds
    setTimeout(() => clearInterval(interval), 30000)
  }

  return (
    <>
      <Button onClick={handleClick} disabled={isValidating}>
        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
        {isValidating ? 'Validating...' : 'Export Submission Pack'}
      </Button>

      {isModalOpen && validation && (
        <ExportConfirmationModal
          isOpen={isModalOpen}
          validation={validation}
          onClose={() => setIsModalOpen(false)}
          onExport={handleExport}
        />
      )}

      {exportJob && <ExportStatus job={exportJob} />}
    </>
  )
}

