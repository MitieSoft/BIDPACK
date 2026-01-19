// Subscription API Service (with mock data)
import type { Subscription } from '@/types'
import { mockSubscription } from '@/lib/mockData'

export async function getCurrentSubscription(): Promise<Subscription> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSubscription
}

export async function createCheckoutSession(planType: 'starter' | 'professional'): Promise<{ url: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Mock Stripe checkout URL
  return {
    url: `https://checkout.stripe.com/mock/${planType}_${Date.now()}`,
  }
}

export async function upgradeSubscription(): Promise<{ url: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    url: `https://checkout.stripe.com/mock/upgrade_${Date.now()}`,
  }
}

export async function downgradeSubscription(): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Subscription will be downgraded at the end of the current billing period.',
  }
}

export async function cancelSubscription(): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Subscription cancelled successfully.',
  }
}

