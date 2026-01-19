// Trade Presets Page
import TradePresets from '@/components/method-statements/TradePresets'
import PageHeader from '@/components/PageHeader'

export default function TradePresetsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trade Presets"
        description="Start from a preset to create method statements quickly"
      />
      <TradePresets />
    </div>
  )
}

