// AI API Service (with mock data)
import type { AIRequest } from '@/types'
import { mockAiHistory, getCurrentACUBalance } from '@/lib/mockData'

export interface AIQuoteResponse {
  acusRequired: number
  currentBalance: number
  balanceAfter: number
  canProceed: boolean
  rejectionReason?: string
}

const ACU_COSTS: Record<string, number> = {
  generate_paragraph: 1,
  refine_section: 2,
  compliance_gap_explain: 3,
  social_value_refine: 4,
}

export async function getAIQuote(actionType: string): Promise<AIQuoteResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const acusRequired = ACU_COSTS[actionType] || 1
  const currentBalance = getCurrentACUBalance()
  const balanceAfter = currentBalance - acusRequired

  return {
    acusRequired,
    currentBalance,
    balanceAfter,
    canProceed: balanceAfter >= 0,
    rejectionReason: balanceAfter < 0 ? 'Insufficient ACU balance' : undefined,
  }
}

export interface ExecuteAIRequest {
  actionType: string
  prompt: string
  context?: string
  bidId?: string
}

export async function executeAI(request: ExecuteAIRequest): Promise<{ content: string; tokensUsed: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate AI processing time

  const acusRequired = ACU_COSTS[request.actionType] || 1
  const tokensUsed = acusRequired * 800 // Mock token usage

  // Deduct ACUs from balance (mock)
  const currentBalance = getCurrentACUBalance()
  if (currentBalance < acusRequired) {
    throw new Error('Insufficient ACU balance')
  }

  // Mock AI responses based on action type
  const mockResponses: Record<string, string> = {
    generate_paragraph: 'This is a mock generated paragraph that demonstrates the AI capability. It provides relevant content based on the context provided. The content is tailored to meet compliance requirements and industry best practices.',
    refine_section: 'This is a refined version of the section with improved clarity, structure, and compliance alignment. The refined content better addresses the requirements and demonstrates a comprehensive approach to the subject matter.',
    compliance_gap_explain: 'The compliance gap exists because the current documentation does not fully address the requirement. To resolve this, you should include specific evidence of GDPR compliance procedures, data handling protocols, and privacy impact assessments. Consider adding references to relevant legislation and demonstrating how your processes align with regulatory requirements.',
    social_value_refine: 'Enhanced social value commitments include: local employment opportunities (targeting 6+ jobs), apprenticeship programs (2+ apprenticeships), SME supply chain engagement (35%+ spend), carbon reduction initiatives (1200kg+ savings), and community engagement activities (80+ hours). These commitments align with PPN 06/20 requirements and demonstrate a comprehensive approach to social value delivery.',
  }

  return {
    content: mockResponses[request.actionType] || 'Mock AI response',
    tokensUsed,
  }
}

export async function getAIHistory(params?: {
  startDate?: string
  endDate?: string
  actionType?: string
}): Promise<AIRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let history = [...mockAiHistory]

  // Filter by date range
  if (params?.startDate) {
    const start = new Date(params.startDate)
    history = history.filter((entry) => new Date(entry.createdAt) >= start)
  }

  if (params?.endDate) {
    const end = new Date(params.endDate)
    history = history.filter((entry) => new Date(entry.createdAt) <= end)
  }

  // Filter by action type
  if (params?.actionType) {
    history = history.filter((entry) => entry.actionType === params.actionType)
  }

  // Sort by date (newest first)
  return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

