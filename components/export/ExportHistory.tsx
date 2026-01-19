'use client'

// Export History Component
import { useEffect, useState } from 'react'
import { listExportJobs } from '@/lib/api/exportService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { ExportJob } from '@/types'

interface ExportHistoryProps {
  bidId: string
}

export default function ExportHistory({ bidId }: ExportHistoryProps) {
  const [exports, setExports] = useState<ExportJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadExports()
  }, [bidId])

  const loadExports = async () => {
    try {
      const data = await listExportJobs(bidId)
      setExports(data)
    } catch (error) {
      toast.error('Failed to load export history')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank')
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
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

  if (isLoading) {
    return <Card>Loading export history...</Card>
  }

  if (exports.length === 0) {
    return (
      <Card>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No exports yet</p>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export History</h3>
      <div className="space-y-3">
        {exports.map((exportJob) => (
          <div
            key={exportJob.id}
            className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Badge variant={getStatusBadgeVariant(exportJob.status)} size="sm">
                  {exportJob.status}
                </Badge>
                <span className="text-sm text-gray-900 dark:text-white">
                  {format(new Date(exportJob.createdAt), 'MMM d, yyyy HH:mm')}
                </span>
                {exportJob.fileSize && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(exportJob.fileSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </div>
            </div>
            {exportJob.status === 'completed' && exportJob.fileUrl && (
              <Button variant="ghost" size="sm" onClick={() => handleDownload(exportJob.fileUrl!)}>
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

