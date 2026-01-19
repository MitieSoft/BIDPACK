// Admin API Service (with mock data)
import { mockUsers, mockOrg, mockSubscription, mockAcuLedger, mockAiHistory } from '@/lib/mockData'
import type { Organization, Subscription, User, ACULedgerEntry, AIRequest } from '@/types'

export interface AdminStats {
  totalOrgs: number
  activeSubscriptions: number
  totalACUUsage: number
  totalAIRequests: number
}

export interface GlobalAISettings {
  aiEnabled: boolean
  maxACUsPerRequest: number
  maxACUsPerDay: number
  maxACUsPerMonth: number
}

export interface OrgWithStats extends Organization {
  subscriptionStatus: string
  userCount: number
  acuUsage: number
  abuseFlagged: boolean
}

export interface SubscriptionWithOrg {
  id: string
  orgId: string
  orgName: string
  planType: string
  status: string
  stripeSubscriptionId: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  acus: number
  features: string[]
  description?: string
  stripePriceId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export async function getAdminStats(): Promise<AdminStats> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    totalOrgs: 5,
    activeSubscriptions: 4,
    totalACUUsage: 1250,
    totalAIRequests: 342,
  }
}

export async function getGlobalAISettings(): Promise<GlobalAISettings> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    aiEnabled: true,
    maxACUsPerRequest: 10,
    maxACUsPerDay: 100,
    maxACUsPerMonth: 2000,
  }
}

export async function updateGlobalAISettings(settings: Partial<GlobalAISettings>): Promise<GlobalAISettings> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const current = await getGlobalAISettings()
  return {
    ...current,
    ...settings,
  }
}

export async function listOrgs(params?: {
  search?: string
  status?: string
  abuseFlagged?: boolean
}): Promise<OrgWithStats[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const orgs: OrgWithStats[] = [
    {
      ...mockOrg,
      subscriptionStatus: mockSubscription.status,
      userCount: mockUsers.length,
      acuUsage: 190,
      abuseFlagged: false,
    },
    {
      id: 'org_2',
      name: 'Another Construction Ltd',
      createdAt: '2025-01-05T00:00:00Z',
      updatedAt: '2025-01-05T00:00:00Z',
      subscriptionStatus: 'active',
      userCount: 2,
      acuUsage: 45,
      abuseFlagged: false,
    },
    {
      id: 'org_3',
      name: 'Suspicious Builders Inc',
      createdAt: '2025-01-10T00:00:00Z',
      updatedAt: '2025-01-10T00:00:00Z',
      subscriptionStatus: 'active',
      userCount: 1,
      acuUsage: 500,
      abuseFlagged: true,
    },
  ]

  let filtered = orgs

  if (params?.search) {
    filtered = filtered.filter((org) =>
      org.name.toLowerCase().includes(params.search!.toLowerCase())
    )
  }

  if (params?.status) {
    filtered = filtered.filter((org) => org.subscriptionStatus === params.status)
  }

  if (params?.abuseFlagged !== undefined) {
    filtered = filtered.filter((org) => org.abuseFlagged === params.abuseFlagged)
  }

  return filtered
}

export async function getOrgDetail(orgId: string): Promise<{
  org: Organization
  subscription: Subscription | null
  users: User[]
  acuUsage: number
  aiRequests: AIRequest[]
  abuseFlags: string[]
}> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    org: mockOrg,
    subscription: mockSubscription,
    users: mockUsers,
    acuUsage: 190,
    aiRequests: mockAiHistory,
    abuseFlags: orgId === 'org_3' ? ['High ACU usage pattern', 'Suspicious activity'] : [],
  }
}

export async function suspendOrg(orgId: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Organization suspended successfully',
  }
}

export async function flagOrg(orgId: string, reason: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Organization flagged successfully',
  }
}

export async function unflagOrg(orgId: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Organization unflagged successfully',
  }
}

export async function getGlobalACULedger(params?: {
  orgId?: string
  startDate?: string
  endDate?: string
  type?: string
}): Promise<ACULedgerEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let ledger = [...mockAcuLedger]

  if (params?.orgId) {
    ledger = ledger.filter((entry) => entry.orgId === params.orgId)
  }

  if (params?.startDate) {
    const start = new Date(params.startDate)
    ledger = ledger.filter((entry) => new Date(entry.createdAt) >= start)
  }

  if (params?.endDate) {
    const end = new Date(params.endDate)
    ledger = ledger.filter((entry) => new Date(entry.createdAt) <= end)
  }

  if (params?.type) {
    ledger = ledger.filter((entry) => entry.transactionType === params.type)
  }

  return ledger.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAbuseFlags(): Promise<Array<{
  orgId: string
  orgName: string
  flags: string[]
  detectedAt: string
}>> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      orgId: 'org_3',
      orgName: 'Suspicious Builders Inc',
      flags: ['High ACU usage pattern', 'Suspicious activity', 'Potential abuse'],
      detectedAt: '2025-01-15T10:00:00Z',
    },
  ]
}

export async function getAnalytics(params?: {
  startDate?: string
  endDate?: string
}): Promise<{
  acuUsageOverTime: Array<{ date: string; usage: number }>
  aiRequestsOverTime: Array<{ date: string; requests: number }>
  orgGrowth: Array<{ date: string; count: number }>
  subscriptionDistribution: Array<{ plan: string; count: number }>
}> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    acuUsageOverTime: [
      { date: '2025-01-01', usage: 150 },
      { date: '2025-01-02', usage: 200 },
      { date: '2025-01-03', usage: 180 },
      { date: '2025-01-04', usage: 250 },
      { date: '2025-01-05', usage: 220 },
    ],
    aiRequestsOverTime: [
      { date: '2025-01-01', requests: 45 },
      { date: '2025-01-02', requests: 52 },
      { date: '2025-01-03', requests: 48 },
      { date: '2025-01-04', requests: 61 },
      { date: '2025-01-05', requests: 55 },
    ],
    orgGrowth: [
      { date: '2025-01-01', count: 1 },
      { date: '2025-01-02', count: 2 },
      { date: '2025-01-03', count: 3 },
      { date: '2025-01-04', count: 4 },
      { date: '2025-01-05', count: 5 },
    ],
    subscriptionDistribution: [
      { plan: 'starter', count: 2 },
      { plan: 'professional', count: 3 },
    ],
  }
}

export async function listSubscriptions(params?: {
  search?: string
  status?: string
}): Promise<SubscriptionWithOrg[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const subscriptions: SubscriptionWithOrg[] = [
    {
      id: 'sub_1',
      orgId: 'org_1',
      orgName: 'BidPack Demo Construction Ltd',
      planType: 'professional',
      status: 'active',
      stripeSubscriptionId: 'sub_demo123',
      currentPeriodStart: '2025-01-01T00:00:00Z',
      currentPeriodEnd: '2025-02-01T00:00:00Z',
      cancelAtPeriodEnd: false,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'sub_2',
      orgId: 'org_2',
      orgName: 'Another Construction Ltd',
      planType: 'starter',
      status: 'active',
      stripeSubscriptionId: 'sub_demo456',
      currentPeriodStart: '2025-01-05T00:00:00Z',
      currentPeriodEnd: '2025-02-05T00:00:00Z',
      cancelAtPeriodEnd: false,
      createdAt: '2025-01-05T00:00:00Z',
      updatedAt: '2025-01-05T00:00:00Z',
    },
    {
      id: 'sub_3',
      orgId: 'org_3',
      orgName: 'Suspicious Builders Inc',
      planType: 'professional',
      status: 'past_due',
      stripeSubscriptionId: 'sub_demo789',
      currentPeriodStart: '2024-12-01T00:00:00Z',
      currentPeriodEnd: '2025-01-01T00:00:00Z',
      cancelAtPeriodEnd: false,
      createdAt: '2024-12-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ]

  let filtered = subscriptions

  if (params?.search) {
    filtered = filtered.filter((sub) =>
      sub.orgName.toLowerCase().includes(params.search!.toLowerCase())
    )
  }

  if (params?.status) {
    filtered = filtered.filter((sub) => sub.status === params.status)
  }

  return filtered
}

export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Subscription status updated successfully',
  }
}

export async function listPlans(): Promise<SubscriptionPlan[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: 'plan_starter',
      name: 'Starter',
      price: 49,
      acus: 50,
      features: [
        '50 ACUs per month',
        'Unlimited bids',
        'Policy library',
        'Method statement builder',
        'Compliance matrix',
        'Email support',
      ],
      description: 'Perfect for small construction companies',
      stripePriceId: 'price_starter',
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'plan_professional',
      name: 'Professional',
      price: 149,
      acus: 150,
      features: [
        '150 ACUs per month',
        'Unlimited bids',
        'Policy library',
        'Method statement builder',
        'Compliance matrix',
        'Social value engine',
        'AI-powered refinements',
        'Priority support',
        'Export to PDF/Word',
      ],
      description: 'For growing construction businesses',
      stripePriceId: 'price_professional',
      isActive: true,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ]
}

export async function createPlan(planData: {
  name: string
  price: number
  acus: number
  features: string[]
  description?: string
  stripePriceId?: string
  isActive: boolean
}): Promise<SubscriptionPlan> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newPlan: SubscriptionPlan = {
    id: `plan_${Date.now()}`,
    ...planData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return newPlan
}

export async function updatePlan(
  planId: string,
  planData: {
    name: string
    price: number
    acus: number
    features: string[]
    description?: string
    stripePriceId?: string
    isActive: boolean
  }
): Promise<SubscriptionPlan> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: planId,
    ...planData,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  }
}

export async function deletePlan(planId: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Plan deleted successfully',
  }
}

