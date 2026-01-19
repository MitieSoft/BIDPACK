// AI Controls Page
'use client'

import { useEffect, useState } from 'react'
import GlobalAIToggle from '@/components/admin/GlobalAIToggle'
import ACULimitsManager from '@/components/admin/ACULimitsManager'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import { getGlobalAISettings, updateGlobalAISettings } from '@/lib/api/adminService'
import PageHeader from '@/components/PageHeader'
import { toast } from 'react-hot-toast'
import type { GlobalAISettings } from '@/lib/api/adminService'

export default function AIControlsPage() {
  const [aiSettings, setAiSettings] = useState<GlobalAISettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getGlobalAISettings()
      setAiSettings(data)
    } catch (error) {
      toast.error('Failed to load AI settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAIToggle = async (enabled: boolean) => {
    try {
      const updated = await updateGlobalAISettings({ aiEnabled: enabled })
      setAiSettings(updated)
      toast.success(`AI ${enabled ? 'enabled' : 'disabled'} globally`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update AI settings')
    }
  }

  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Global AI Controls"
          description="Manage AI system settings and limits"
        />
        {aiSettings && (
          <>
            <GlobalAIToggle enabled={aiSettings.aiEnabled} onToggle={handleAIToggle} />
            <ACULimitsManager />
          </>
        )}
      </div>
    </AdminRouteGuard>
  )
}

