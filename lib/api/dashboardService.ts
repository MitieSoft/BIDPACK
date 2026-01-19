// Dashboard API Service (with mock data)
import { mockBids, mockAcuLedger, mockAiHistory } from '@/lib/mockData'
import type { Bid } from '@/types'

export interface DashboardStats {
  totalBids: number
  activeBids: number
  readyBids: number
  draftBids: number
  totalPolicies: number
  totalMethodStatements: number
  acuUsageThisMonth: number
  acuUsageLastMonth: number
  aiRequestsThisMonth: number
}

export interface ACUUsageData {
  date: string
  usage: number
}

export interface BidStatusData {
  status: string
  count: number
}

export interface RecentActivity {
  id: string
  type: 'bid' | 'policy' | 'method_statement' | 'ai_request' | 'export'
  title: string
  description: string
  timestamp: string
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const bids = mockBids
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const acuUsageThisMonth = mockAcuLedger
    .filter((entry) => {
      const entryDate = new Date(entry.createdAt)
      return entryDate >= startOfMonth && entry.transactionType === 'debit'
    })
    .reduce((sum, entry) => sum + entry.amount, 0)

  const acuUsageLastMonth = mockAcuLedger
    .filter((entry) => {
      const entryDate = new Date(entry.createdAt)
      return entryDate >= startOfLastMonth && entryDate <= endOfLastMonth && entry.transactionType === 'debit'
    })
    .reduce((sum, entry) => sum + entry.amount, 0)

  const aiRequestsThisMonth = mockAiHistory.filter((req) => {
    const reqDate = new Date(req.createdAt)
    return reqDate >= startOfMonth
  }).length

  return {
    totalBids: bids.length,
    activeBids: bids.filter((b) => b.status === 'in_progress').length,
    readyBids: bids.filter((b) => b.status === 'ready').length,
    draftBids: bids.filter((b) => b.status === 'draft').length,
    totalPolicies: 12,
    totalMethodStatements: 8,
    acuUsageThisMonth,
    acuUsageLastMonth,
    aiRequestsThisMonth,
  }
}

export async function getACUUsageChartData(days: number = 30): Promise<ACUUsageData[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const data: ACUUsageData[] = []
  const now = new Date()

  // Generate more realistic usage pattern
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    // Check actual ledger first
    let usage = mockAcuLedger
      .filter((entry) => {
        const entryDate = entry.createdAt.split('T')[0]
        return entryDate === dateStr && entry.transactionType === 'debit'
      })
      .reduce((sum, entry) => sum + entry.amount, 0)

    // If no actual data, generate realistic pattern
    if (usage === 0) {
      // More usage on weekdays, less on weekends
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      // Base usage with some variation
      const baseUsage = isWeekend ? 2 : 5
      const variation = Math.random() * 8
      usage = Math.floor(baseUsage + variation)
      
      // Some days have higher spikes (simulating active work)
      if (Math.random() > 0.7) {
        usage = Math.floor(usage * (1.5 + Math.random()))
      }
    }

    data.push({
      date: dateStr,
      usage,
    })
  }

  return data
}

export async function getBidStatusDistribution(): Promise<BidStatusData[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const statusCounts: Record<string, number> = {}
  mockBids.forEach((bid) => {
    statusCounts[bid.status] = (statusCounts[bid.status] || 0) + 1
  })

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }))
}

export async function getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const activities: RecentActivity[] = []

  // Recent bids
  mockBids
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .forEach((bid) => {
      activities.push({
        id: `bid_${bid.id}`,
        type: 'bid',
        title: bid.clientName,
        description: `Status: ${bid.status}`,
        timestamp: bid.updatedAt,
      })
    })

  // Recent AI requests
  mockAiHistory
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .forEach((req) => {
      activities.push({
        id: `ai_${req.id}`,
        type: 'ai_request',
        title: req.actionType,
        description: `Used ${req.acusUsed} ACUs`,
        timestamp: req.createdAt,
      })
    })

  // Sort by timestamp and limit
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

export async function getRecentBids(limit: number = 5): Promise<Bid[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockBids
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

