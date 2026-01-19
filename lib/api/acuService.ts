// ACU API Service (with mock data)
import type { ACULedgerEntry, ACUBalance } from '@/types'
import { mockAcuLedger, getCurrentACUBalance, getACUUsageThisMonth, mockSubscription } from '@/lib/mockData'

export async function getACUBalance(): Promise<ACUBalance> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const balance = getCurrentACUBalance()
  const usageThisMonth = getACUUsageThisMonth()
  const monthlyAllocation = mockSubscription.acuMonthly

  return {
    balance,
    monthlyAllocation,
    usageThisMonth,
    remaining: balance,
  }
}

export async function getACULedger(params?: {
  startDate?: string
  endDate?: string
  type?: string
}): Promise<ACULedgerEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let ledger = [...mockAcuLedger]

  // Filter by date range
  if (params?.startDate) {
    const start = new Date(params.startDate)
    ledger = ledger.filter((entry) => new Date(entry.createdAt) >= start)
  }

  if (params?.endDate) {
    const end = new Date(params.endDate)
    ledger = ledger.filter((entry) => new Date(entry.createdAt) <= end)
  }

  // Filter by type
  if (params?.type) {
    ledger = ledger.filter((entry) => entry.transactionType === params.type)
  }

  // Sort by date (newest first)
  return ledger.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createTopUp(acuPackage: 20 | 50 | 100): Promise<{ clientSecret: string; amount: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const amounts = { 20: 20, 50: 45, 100: 80 }
  
  return {
    clientSecret: `mock_stripe_secret_${acuPackage}_${Date.now()}`,
    amount: amounts[acuPackage],
  }
}

export async function confirmTopUp(paymentIntentId: string): Promise<{ success: boolean; acusAdded: number }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: extract ACU amount from payment intent ID
  const acusAdded = paymentIntentId.includes('20') ? 20 : paymentIntentId.includes('50') ? 50 : 100

  return {
    success: true,
    acusAdded,
  }
}

