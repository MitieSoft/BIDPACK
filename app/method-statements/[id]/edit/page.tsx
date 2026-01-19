// Edit Method Statement Page
'use client'

import { useParams } from 'next/navigation'
import MethodStatementBuilder from '@/components/method-statements/MethodStatementBuilder'
import PageHeader from '@/components/PageHeader'

export default function EditMethodStatementPage() {
  const params = useParams()
  const methodStatementId = params?.id as string

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Method Statement"
        description="Update your method statement content"
      />
      <MethodStatementBuilder methodStatementId={methodStatementId} />
    </div>
  )
}

