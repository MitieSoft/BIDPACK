'use client'

// Policy Type Badge Component
import Badge from '@/components/ui/Badge'
import type { PolicyType } from '@/types'

interface PolicyTypeBadgeProps {
  type: PolicyType
}

const policyTypeLabels: Record<PolicyType, string> = {
  'h&s_cdm': 'H&S CDM',
  quality: 'Quality',
  environmental: 'Environmental',
  equality_diversity: 'Equality & Diversity',
  modern_slavery: 'Modern Slavery',
  gdpr: 'GDPR',
  anti_bribery: 'Anti-Bribery',
  safeguarding: 'Safeguarding',
  carbon_reduction: 'Carbon Reduction',
  social_value: 'Social Value',
  supply_chain: 'Supply Chain',
  ethical_procurement: 'Ethical Procurement',
  business_continuity: 'Business Continuity',
}

export default function PolicyTypeBadge({ type }: PolicyTypeBadgeProps) {
  return <Badge variant="default" size="sm">{policyTypeLabels[type] || type}</Badge>
}

