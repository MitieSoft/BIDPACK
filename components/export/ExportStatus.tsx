'use client'

// Export Status Component
import { useEffect, useState } from 'react'
import { getExportJob } from '@/lib/api/exportService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import { ArrowDownTrayIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import type { ExportJob } from '@/types'

interface ExportStatusProps {
  job: ExportJob
}

export default function ExportStatus({ job: initialJob }: ExportStatusProps) {
  const [job, setJob] = useState<ExportJob>(initialJob)

  useEffect(() => {
    if (job.status === 'pending' || job.status === 'processing') {
      const interval = setInterval(async () => {
        try {
          const updatedJob = await getExportJob(job.id)
          if (updatedJob) {
            setJob(updatedJob)
            if (updatedJob.status === 'completed' || updatedJob.status === 'failed') {
              clearInterval(interval)
            }
          }
        } catch (error) {
          clearInterval(interval)
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [job.id, job.status])

  const getStatusIcon = () => {
    switch (job.status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    }
  }

  const getStatusBadgeVariant = () => {
    switch (job.status) {
      case 'completed':
        return 'success'
      case 'failed':
        return 'error'
      case 'processing':
        return 'info'
      default:
        return 'default'
    }
  }

  const handleDownload = () => {
    if (job.fileUrl) {
      window.open(job.fileUrl, '_blank')
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Export Status</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created: {format(new Date(job.createdAt), 'MMM d, yyyy HH:mm')}
            </p>
          </div>
          <Badge variant={getStatusBadgeVariant()} size="sm">
            {job.status}
          </Badge>
        </div>
        {job.status === 'completed' && job.fileUrl && (
          <Button onClick={handleDownload}>
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download
          </Button>
        )}
      </div>
      {job.status === 'processing' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Processing export...</p>
        </div>
      )}
      {job.status === 'failed' && job.errorMessage && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">{job.errorMessage}</p>
        </div>
      )}
      {job.status === 'completed' && job.fileSize && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          File size: {(job.fileSize / 1024 / 1024).toFixed(2)} MB
        </p>
      )}
    </Card>
  )
}

