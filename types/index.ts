// TypeScript types for BIDPACK UK

export type UserRole = 'owner' | 'admin' | 'member'

export type PlanType = 'starter' | 'professional'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export type BidStatus = 'draft' | 'in_progress' | 'ready' | 'submitted'

export type RequirementStatus = 'covered' | 'missing' | 'non_compliant'

export type ACUTransactionType = 'debit' | 'credit' | 'grant' | 'topup' | 'expiry'

export type AIActionType = 'generate_paragraph' | 'refine_section' | 'compliance_gap_explain' | 'social_value_refine'

export type AIRequestStatus = 'pending' | 'completed' | 'failed' | 'rejected'

export type PolicyType =
  | 'h&s_cdm'
  | 'quality'
  | 'environmental'
  | 'equality_diversity'
  | 'modern_slavery'
  | 'gdpr'
  | 'anti_bribery'
  | 'safeguarding'
  | 'carbon_reduction'
  | 'social_value'
  | 'supply_chain'
  | 'ethical_procurement'
  | 'business_continuity'

export type TradeType =
  | 'groundworks_civils'
  | 'electrical'
  | 'mechanical'
  | 'fit_out'
  | 'highways'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  orgId: string
  createdAt: string
  lastLoginAt?: string
}

export interface Organization {
  id: string
  name: string
  stripeCustomerId?: string
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  orgId: string
  planType: PlanType
  status: SubscriptionStatus
  stripeSubscriptionId?: string
  stripePriceId?: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

export interface Bid {
  id: string
  orgId: string
  clientName: string
  deadline: string
  status: BidStatus
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface BidSection {
  id: string
  bidId: string
  sectionType: 'policy' | 'method_statement' | 'cv' | 'case_study' | 'insurance' | 'social_value' | 'other'
  sectionName: string
  content: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface BidRequirement {
  id: string
  bidId: string
  requirementText: string
  requirementCategory?: string
  status: RequirementStatus
  mappedToSectionId?: string
  mappedToType?: string
  createdAt: string
  updatedAt: string
}

export interface Policy {
  id: string
  orgId: string
  policyType: PolicyType
  title: string
  content: string
  version: number
  isTemplate: boolean
  lastUpdatedAt: string
  createdAt: string
  updatedAt: string
}

export interface MethodStatement {
  id: string
  orgId: string
  tradeType: TradeType
  title: string
  scopeOfWorks: string
  resources: string
  plantMaterials: string
  hsControls: string
  rams: string
  environmentalControls: string
  qa: string
  emergencyProcedures: string
  version: number
  createdAt: string
  updatedAt: string
}

export interface SocialValue {
  id: string
  bidId: string
  localEmploymentCount: number
  apprenticeshipsCount: number
  smeSpendPercentage: number
  carbonReductionKg: number
  communityEngagementHours: number
  kpiSummary?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ACULedgerEntry {
  id: string
  orgId: string
  transactionType: ACUTransactionType
  amount: number
  balanceAfter: number
  description: string
  referenceId?: string
  createdAt: string
}

export interface AIRequest {
  id: string
  orgId: string
  userId: string
  bidId?: string
  actionType: AIActionType
  acusUsed: number
  tokensRequested?: number
  tokensUsed: number
  tokensLimit: number
  status: AIRequestStatus
  requestPrompt?: string
  responseContent?: string
  errorMessage?: string
  createdAt: string
}

export interface ACUBalance {
  balance: number
  monthlyAllocation: number
  usageThisMonth: number
  remaining: number
}

export interface ComplianceStatus {
  totalRequirements: number
  coveredCount: number
  missingCount: number
  nonCompliantCount: number
  coveragePercentage: number
  criticalGaps: string[]
}

export interface ExportJob {
  id: string
  bidId: string
  orgId: string
  userId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  filePath?: string
  fileUrl?: string
  fileSize?: number
  errorMessage?: string
  createdAt: string
  completedAt?: string
}

