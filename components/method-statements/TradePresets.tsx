'use client'

// Trade Presets Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTradePresets, createMethodStatementFromPreset } from '@/lib/api/methodStatementService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TradeTypeBadge from './TradeTypeBadge'
import { toast } from 'react-hot-toast'
import type { MethodStatement } from '@/types'

export default function TradePresets() {
  const router = useRouter()
  const [presets, setPresets] = useState<MethodStatement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatingId, setCreatingId] = useState<string | null>(null)

  useEffect(() => {
    loadPresets()
  }, [])

  const loadPresets = async () => {
    try {
      const data = await getTradePresets()
      setPresets(data)
    } catch (error) {
      toast.error('Failed to load presets')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUsePreset = async (presetId: string) => {
    setCreatingId(presetId)
    try {
      const newMS = await createMethodStatementFromPreset(presetId)
      toast.success('Method statement created from preset')
      router.push(`/method-statements/${newMS.id}/edit`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to create method statement from preset')
    } finally {
      setCreatingId(null)
    }
  }

  if (isLoading) {
    return <Card>Loading presets...</Card>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {presets.map((preset) => (
        <Card key={preset.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <TradeTypeBadge type={preset.tradeType} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{preset.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {preset.scopeOfWorks.substring(0, 150)}...
          </p>
          <Button
            className="w-full"
            onClick={() => handleUsePreset(preset.id)}
            disabled={creatingId === preset.id}
          >
            {creatingId === preset.id ? 'Creating...' : 'Use Preset'}
          </Button>
        </Card>
      ))}
    </div>
  )
}

