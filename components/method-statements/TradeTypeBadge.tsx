'use client'

// Trade Type Badge Component
import Badge from '@/components/ui/Badge'
import type { TradeType } from '@/types'

interface TradeTypeBadgeProps {
  type: TradeType
}

const tradeTypeLabels: Record<TradeType, string> = {
  groundworks_civils: 'Groundworks & Civils',
  electrical: 'Electrical',
  mechanical: 'Mechanical',
  fit_out: 'Fit-Out',
  highways: 'Highways',
}

export default function TradeTypeBadge({ type }: TradeTypeBadgeProps) {
  return <Badge variant="default" size="sm">{tradeTypeLabels[type] || type}</Badge>
}

