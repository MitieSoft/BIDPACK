'use client'

// Method Statement Detail Page
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getMethodStatement, deleteMethodStatement, duplicateMethodStatement } from '@/lib/api/methodStatementService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TradeTypeBadge from '@/components/method-statements/TradeTypeBadge'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'
import { PencilIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { MethodStatement } from '@/types'

const sections = [
  { key: 'scopeOfWorks', label: 'Scope of Works' },
  { key: 'resources', label: 'Resources' },
  { key: 'plantMaterials', label: 'Plant & Materials' },
  { key: 'hsControls', label: 'H&S Controls' },
  { key: 'rams', label: 'RAMS' },
  { key: 'environmentalControls', label: 'Environmental Controls' },
  { key: 'qa', label: 'QA' },
  { key: 'emergencyProcedures', label: 'Emergency Procedures' },
] as const

export default function MethodStatementDetailPage() {
  const params = useParams()
  const router = useRouter()
  const msId = params?.id as string
  const [ms, setMs] = useState<MethodStatement | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (msId) {
      loadMethodStatement()
    }
  }, [msId])

  const loadMethodStatement = async () => {
    try {
      const data = await getMethodStatement(msId)
      if (!data) {
        toast.error('Method statement not found')
        router.push('/method-statements')
        return
      }
      setMs(data)
    } catch (error) {
      toast.error('Failed to load method statement')
      router.push('/method-statements')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this method statement?')) {
      return
    }

    try {
      await deleteMethodStatement(msId)
      toast.success('Method statement deleted successfully')
      router.push('/method-statements')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete method statement')
    }
  }

  const handleDuplicate = async () => {
    try {
      const newMS = await duplicateMethodStatement(msId)
      toast.success('Method statement duplicated successfully')
      router.push(`/method-statements/${newMS.id}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate method statement')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!ms) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TradeTypeBadge type={ms.tradeType} />
              <Badge variant="info" size="sm">
                Version {ms.version}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{ms.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last updated: {format(new Date(ms.updatedAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.push(`/method-statements/${ms.id}/edit`)}>
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

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.key}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {section.label}
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                  {ms[section.key] || 'Not specified'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

