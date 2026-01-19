// Bid API Service (with mock data)
import type { Bid, BidSection, BidRequirement } from '@/types'
import { mockBids, mockRequirements } from '@/lib/mockData'

export async function listBids(): Promise<Bid[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBids
}

export async function getBid(id: string): Promise<Bid | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBids.find((b) => b.id === id)
}

export async function createBid(data: {
  clientName: string
  deadline: string
  status?: Bid['status']
}): Promise<Bid> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newBid: Bid = {
    id: `bid_${Date.now()}`,
    orgId: 'org_1',
    clientName: data.clientName,
    deadline: data.deadline,
    status: data.status || 'draft',
    createdBy: 'user_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockBids.push(newBid)
  return newBid
}

export async function updateBid(id: string, data: Partial<Bid>): Promise<Bid> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const bidIndex = mockBids.findIndex((b) => b.id === id)
  if (bidIndex === -1) {
    throw new Error('Bid not found')
  }

  mockBids[bidIndex] = {
    ...mockBids[bidIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  return mockBids[bidIndex]
}

export async function deleteBid(id: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const bidIndex = mockBids.findIndex((b) => b.id === id)
  if (bidIndex === -1) {
    throw new Error('Bid not found')
  }

  mockBids.splice(bidIndex, 1)
  return { success: true }
}

export async function listBidSections(bidId: string): Promise<BidSection[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock sections
  const mockSections: BidSection[] = [
    {
      id: 'section_1',
      bidId,
      sectionType: 'policy',
      sectionName: 'Health & Safety Policy',
      content: 'Our company is committed to ensuring the health, safety and welfare...',
      version: 1,
      createdAt: '2025-01-10T10:00:00Z',
      updatedAt: '2025-01-15T11:00:00Z',
    },
    {
      id: 'section_2',
      bidId,
      sectionType: 'method_statement',
      sectionName: 'Construction Phase Plan',
      content: 'This Construction Phase Plan outlines the health and safety arrangements...',
      version: 1,
      createdAt: '2025-01-12T09:00:00Z',
      updatedAt: '2025-01-12T09:00:00Z',
    },
  ]

  return mockSections.filter((s) => s.bidId === bidId)
}

export async function createBidSection(bidId: string, data: {
  sectionType: BidSection['sectionType']
  sectionName: string
  content: string
}): Promise<BidSection> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newSection: BidSection = {
    id: `section_${Date.now()}`,
    bidId,
    sectionType: data.sectionType,
    sectionName: data.sectionName,
    content: data.content,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return newSection
}

export async function updateBidSection(sectionId: string, data: Partial<BidSection>): Promise<BidSection> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: In real app, this would update the database
  return {
    id: sectionId,
    bidId: 'bid_1',
    sectionType: data.sectionType || 'policy',
    sectionName: data.sectionName || 'Updated Section',
    content: data.content || '',
    version: (data.version || 1) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function deleteBidSection(sectionId: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}

export async function listBidRequirements(bidId: string): Promise<BidRequirement[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockRequirements.filter((r) => r.bidId === bidId)
}

export async function createBidRequirement(bidId: string, data: {
  requirementText: string
  requirementCategory?: string
}): Promise<BidRequirement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newRequirement: BidRequirement = {
    id: `req_${Date.now()}`,
    bidId,
    requirementText: data.requirementText,
    requirementCategory: data.requirementCategory,
    status: 'missing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockRequirements.push(newRequirement)
  return newRequirement
}

export async function updateBidRequirement(
  requirementId: string,
  data: Partial<BidRequirement>
): Promise<BidRequirement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const reqIndex = mockRequirements.findIndex((r) => r.id === requirementId)
  if (reqIndex === -1) {
    throw new Error('Requirement not found')
  }

  mockRequirements[reqIndex] = {
    ...mockRequirements[reqIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  return mockRequirements[reqIndex]
}

export async function deleteBidRequirement(requirementId: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const reqIndex = mockRequirements.findIndex((r) => r.id === requirementId)
  if (reqIndex === -1) {
    throw new Error('Requirement not found')
  }

  mockRequirements.splice(reqIndex, 1)
  return { success: true }
}

export async function autoMapRequirements(bidId: string): Promise<{ mapped: number; total: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock: Auto-map some requirements
  const requirements = mockRequirements.filter((r) => r.bidId === bidId)
  let mapped = 0

  requirements.forEach((req) => {
    if (req.requirementText.toLowerCase().includes('policy')) {
      req.status = 'covered'
      req.mappedToSectionId = 'section_1'
      req.mappedToType = 'policy'
      mapped++
    }
  })

  return { mapped, total: requirements.length }
}

