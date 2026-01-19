// Mock data for frontend development
import type {
  User,
  Organization,
  Subscription,
  Bid,
  BidRequirement,
  Policy,
  MethodStatement,
  SocialValue,
  ACULedgerEntry,
  AIRequest,
} from '@/types'

export const mockOrg: Organization = {
  id: 'org_1',
  name: 'BidPack Demo Construction Ltd',
  stripeCustomerId: 'cus_demo123',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
}

export const mockUsers: User[] = [
  // Admin user
  {
    id: 'user_admin',
    email: 'admin@bidpack.co.uk',
    firstName: 'Admin',
    lastName: 'User',
    role: 'owner', // owner role has admin access
    orgId: 'org_1',
    createdAt: '2025-01-01T00:00:00Z',
    lastLoginAt: '2025-01-19T10:30:00Z',
  },
  // Subscription user (regular user)
  {
    id: 'user_subscriber',
    email: 'user@demo-construction.co.uk',
    firstName: 'John',
    lastName: 'Smith',
    role: 'member', // regular subscription user
    orgId: 'org_1',
    createdAt: '2025-01-01T00:00:00Z',
    lastLoginAt: '2025-01-19T10:30:00Z',
  },
  // Keep existing users for backward compatibility
  {
    id: 'user_1',
    email: 'ali.ahmed@demo-construction.co.uk',
    firstName: 'Ali',
    lastName: 'Ahmed',
    role: 'owner',
    orgId: 'org_1',
    createdAt: '2025-01-01T00:00:00Z',
    lastLoginAt: '2025-01-19T10:30:00Z',
  },
  {
    id: 'user_2',
    email: 'sarah.jones@demo-construction.co.uk',
    firstName: 'Sarah',
    lastName: 'Jones',
    role: 'admin',
    orgId: 'org_1',
    createdAt: '2025-01-05T00:00:00Z',
    lastLoginAt: '2025-01-19T09:15:00Z',
  },
  {
    id: 'user_3',
    email: 'mike.brown@demo-construction.co.uk',
    firstName: 'Mike',
    lastName: 'Brown',
    role: 'member',
    orgId: 'org_1',
    createdAt: '2025-01-10T00:00:00Z',
    lastLoginAt: '2025-01-18T14:20:00Z',
  },
]

export const mockSubscription: Subscription = {
  id: 'sub_1',
  orgId: 'org_1',
  planType: 'professional',
  status: 'active',
  stripeSubscriptionId: 'sub_demo123',
  stripePriceId: 'price_professional',
  currentPeriodStart: '2025-01-01T00:00:00Z',
  currentPeriodEnd: '2025-02-01T00:00:00Z',
  cancelAtPeriodEnd: false,
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
}

export const mockBids: Bid[] = [
  {
    id: 'bid_1',
    orgId: 'org_1',
    clientName: 'Manchester City Council – Highways Framework',
    deadline: '2025-03-15T12:00:00Z',
    status: 'in_progress',
    createdBy: 'user_1',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-19T10:30:00Z',
  },
  {
    id: 'bid_2',
    orgId: 'org_1',
    clientName: 'NHS Trust – Ward Refurbishment Project',
    deadline: '2025-02-28T16:00:00Z',
    status: 'draft',
    createdBy: 'user_2',
    createdAt: '2025-01-12T11:00:00Z',
    updatedAt: '2025-01-18T15:20:00Z',
  },
  {
    id: 'bid_3',
    orgId: 'org_1',
    clientName: 'London Borough Council – School Extension',
    deadline: '2025-04-10T10:00:00Z',
    status: 'ready',
    createdBy: 'user_1',
    createdAt: '2025-01-05T08:00:00Z',
    updatedAt: '2025-01-17T16:45:00Z',
  },
]

export const mockRequirements: BidRequirement[] = [
  {
    id: 'req_1',
    bidId: 'bid_1',
    requirementText: 'Provide current Health & Safety (CDM) policy',
    requirementCategory: 'Policies',
    status: 'covered',
    mappedToSectionId: 'policy_hs',
    mappedToType: 'policy',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-15T11:00:00Z',
  },
  {
    id: 'req_2',
    bidId: 'bid_1',
    requirementText: 'Submit Construction Phase Plan including RAMS',
    requirementCategory: 'Method Statements',
    status: 'missing',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'req_3',
    bidId: 'bid_1',
    requirementText: 'Evidence GDPR compliance and data handling procedures',
    requirementCategory: 'Policies',
    status: 'non_compliant',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'req_4',
    bidId: 'bid_1',
    requirementText: 'Demonstrate social value commitments (PPN 06/20)',
    requirementCategory: 'Social Value',
    status: 'covered',
    mappedToSectionId: 'sv_1',
    mappedToType: 'social_value',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-16T14:00:00Z',
  },
]

export const mockPolicies: Policy[] = [
  {
    id: 'policy_hs',
    orgId: 'org_1',
    policyType: 'h&s_cdm',
    title: 'Health & Safety Policy (CDM 2015)',
    content: 'Our company is committed to ensuring the health, safety and welfare of all employees, contractors, and members of the public who may be affected by our work. This policy complies with the Construction (Design and Management) Regulations 2015...',
    version: 3,
    isTemplate: false,
    lastUpdatedAt: '2025-01-05T08:00:00Z',
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2025-01-05T08:00:00Z',
  },
  {
    id: 'policy_gdpr',
    orgId: 'org_1',
    policyType: 'gdpr',
    title: 'GDPR & Data Protection Policy',
    content: 'This policy sets out how we collect, use, store and protect personal data in accordance with the UK GDPR and Data Protection Act 2018...',
    version: 2,
    isTemplate: false,
    lastUpdatedAt: '2024-12-20T10:15:00Z',
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2024-12-20T10:15:00Z',
  },
  {
    id: 'policy_quality',
    orgId: 'org_1',
    policyType: 'quality',
    title: 'Quality Management Policy',
    content: 'We are committed to delivering high-quality construction services that meet or exceed client expectations and industry standards...',
    version: 1,
    isTemplate: false,
    lastUpdatedAt: '2025-01-08T09:00:00Z',
    createdAt: '2025-01-08T09:00:00Z',
    updatedAt: '2025-01-08T09:00:00Z',
  },
]

export const mockMethodStatements: MethodStatement[] = [
  {
    id: 'ms_1',
    orgId: 'org_1',
    tradeType: 'highways',
    title: 'Highways Maintenance – Night Works',
    scopeOfWorks: 'Planned maintenance on carriageways during off-peak hours. Includes resurfacing, line marking, and drainage works.',
    resources: 'Supervisor x1, Operatives x4, Traffic Marshals x2, Site Engineer x1',
    plantMaterials: 'Road planer, roller, tipper trucks, line marking equipment, traffic management equipment',
    hsControls: 'Traffic management plan, signage, PPE (high-vis, hard hats, safety boots), exclusion zones, daily briefings',
    rams: 'Risk assessment completed. Method statement reviewed. All operatives briefed. Emergency procedures in place.',
    environmentalControls: 'Dust suppression measures, noise control, spill kits on site, waste segregation',
    qa: 'Inspection and test plans, hold points at critical stages, quality checks before completion',
    emergencyProcedures: 'Spill response procedure, first aid provision, emergency contact tree, evacuation plan',
    version: 1,
    createdAt: '2025-01-08T09:30:00Z',
    updatedAt: '2025-01-08T09:30:00Z',
  },
  {
    id: 'ms_2',
    orgId: 'org_1',
    tradeType: 'electrical',
    title: 'Electrical Installation – Commercial Fit-Out',
    scopeOfWorks: 'Complete electrical installation for commercial office fit-out including lighting, power distribution, and data cabling.',
    resources: 'Electrician x2, Apprentice x1, Site Supervisor x1',
    plantMaterials: 'Electrical tools, testing equipment, cable, conduit, distribution boards',
    hsControls: 'Isolation procedures, lock-out tag-out, electrical safety testing, PPE',
    rams: 'Electrical safety risk assessment, method statement, permit to work system',
    environmentalControls: 'Waste cable recycling, minimal packaging, energy-efficient materials',
    qa: 'Electrical testing and certification, inspection by qualified supervisor, compliance with BS 7671',
    emergencyProcedures: 'Electrical isolation procedures, first aid for electric shock, fire evacuation',
    version: 1,
    createdAt: '2025-01-12T11:00:00Z',
    updatedAt: '2025-01-12T11:00:00Z',
  },
]

export const mockSocialValue: SocialValue = {
  id: 'sv_1',
  bidId: 'bid_1',
  localEmploymentCount: 6,
  apprenticeshipsCount: 2,
  smeSpendPercentage: 35,
  carbonReductionKg: 1200,
  communityEngagementHours: 80,
  kpiSummary: {
    totalLocalJobs: 6,
    apprenticeshipRate: 33,
    smeSpend: 35,
    carbonSaved: 1200,
    communityHours: 80,
  },
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-16T14:00:00Z',
}

export const mockAcuLedger: ACULedgerEntry[] = [
  {
    id: 'acu_1',
    orgId: 'org_1',
    transactionType: 'grant',
    amount: 150,
    balanceAfter: 150,
    description: 'Monthly Professional plan ACU grant',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'acu_2',
    orgId: 'org_1',
    transactionType: 'debit',
    amount: 3,
    balanceAfter: 147,
    description: 'AI: Compliance gap explain (3 ACUs)',
    referenceId: 'ai_1',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'acu_3',
    orgId: 'org_1',
    transactionType: 'debit',
    amount: 2,
    balanceAfter: 145,
    description: 'AI: Refine section (2 ACUs)',
    referenceId: 'ai_2',
    createdAt: '2025-01-12T14:00:00Z',
  },
  {
    id: 'acu_4',
    orgId: 'org_1',
    transactionType: 'debit',
    amount: 4,
    balanceAfter: 141,
    description: 'AI: Social value refine (4 ACUs)',
    referenceId: 'ai_3',
    createdAt: '2025-01-15T14:30:00Z',
  },
  {
    id: 'acu_5',
    orgId: 'org_1',
    transactionType: 'topup',
    amount: 50,
    balanceAfter: 191,
    description: 'Top-up: 50 ACUs (£45)',
    createdAt: '2025-01-16T09:00:00Z',
  },
  {
    id: 'acu_6',
    orgId: 'org_1',
    transactionType: 'debit',
    amount: 1,
    balanceAfter: 190,
    description: 'AI: Generate paragraph (1 ACU)',
    referenceId: 'ai_4',
    createdAt: '2025-01-18T11:00:00Z',
  },
]

export const mockAiHistory: AIRequest[] = [
  {
    id: 'ai_1',
    orgId: 'org_1',
    userId: 'user_1',
    bidId: 'bid_1',
    actionType: 'compliance_gap_explain',
    acusUsed: 3,
    tokensUsed: 1800,
    tokensLimit: 3000,
    status: 'completed',
    requestPrompt: 'Explain why GDPR policy requirement is non-compliant',
    responseContent: 'The GDPR policy requirement is non-compliant because...',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'ai_2',
    orgId: 'org_1',
    userId: 'user_2',
    bidId: 'bid_1',
    actionType: 'refine_section',
    acusUsed: 2,
    tokensUsed: 1200,
    tokensLimit: 2000,
    status: 'completed',
    requestPrompt: 'Refine the H&S policy section',
    responseContent: 'Refined H&S policy content...',
    createdAt: '2025-01-12T14:00:00Z',
  },
  {
    id: 'ai_3',
    orgId: 'org_1',
    userId: 'user_1',
    bidId: 'bid_1',
    actionType: 'social_value_refine',
    acusUsed: 4,
    tokensUsed: 2200,
    tokensLimit: 4000,
    status: 'completed',
    requestPrompt: 'Refine social value commitments',
    responseContent: 'Enhanced social value commitments...',
    createdAt: '2025-01-15T14:30:00Z',
  },
  {
    id: 'ai_4',
    orgId: 'org_1',
    userId: 'user_2',
    actionType: 'generate_paragraph',
    acusUsed: 1,
    tokensUsed: 800,
    tokensLimit: 1000,
    status: 'completed',
    requestPrompt: 'Generate paragraph about quality assurance',
    responseContent: 'Our quality assurance process ensures...',
    createdAt: '2025-01-18T11:00:00Z',
  },
]

// Calculate current ACU balance from ledger
export const getCurrentACUBalance = (): number => {
  if (mockAcuLedger.length === 0) return 0
  return mockAcuLedger[mockAcuLedger.length - 1].balanceAfter
}

// Get ACU usage this month
export const getACUUsageThisMonth = (): number => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  return mockAcuLedger
    .filter((entry) => {
      const entryDate = new Date(entry.createdAt)
      return entryDate >= startOfMonth && entry.transactionType === 'debit'
    })
    .reduce((sum, entry) => sum + entry.amount, 0)
}

// Get ACU usage today
export const getACUUsageToday = (): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return mockAcuLedger
    .filter((entry) => {
      const entryDate = new Date(entry.createdAt)
      return entryDate >= today && entry.transactionType === 'debit'
    })
    .reduce((sum, entry) => sum + entry.amount, 0)
}

