// Authentication API Service (with mock data)
import type { User, Organization, Subscription } from '@/types'
import { mockUsers, mockOrg, mockSubscription } from '@/lib/mockData'

export interface LoginResponse {
  user: User
  org: Organization
  subscription: Subscription
  token: string
  refreshToken: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  orgName: string
}

export interface RegisterResponse {
  user: User
  org: Organization
  token: string
  refreshToken: string
}

// Mock login - accepts specific credentials for demo accounts
export async function login(email: string, password: string): Promise<LoginResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Define demo credentials
  const demoAccounts: Record<string, { userId: string; password: string }> = {
    'admin@bidpack.co.uk': { userId: 'user_admin', password: 'admin123' },
    'user@demo-construction.co.uk': { userId: 'user_subscriber', password: 'user123' },
  }

  // Check if email exists in demo accounts
  const account = demoAccounts[email]
  
  if (!account) {
    // Fallback: find user by email or use first user as default (no password check for backward compatibility)
    const user = mockUsers.find((u) => u.email === email) || mockUsers[0]
    const token = `mock_token_${user.id}_${Date.now()}`
    const refreshToken = `mock_refresh_${user.id}_${Date.now()}`

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('user_id', user.id)
    }

    return {
      user,
      org: mockOrg,
      subscription: mockSubscription,
      token,
      refreshToken,
    }
  }

  // Validate password for demo accounts
  if (password !== account.password) {
    throw new Error('Invalid email or password')
  }

  // Find user by userId
  const user = mockUsers.find((u) => u.id === account.userId)
  
  if (!user) {
    throw new Error('User not found')
  }

  // Store token in localStorage (mock)
  const token = `mock_token_${user.id}_${Date.now()}`
  const refreshToken = `mock_refresh_${user.id}_${Date.now()}`

  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('user_id', user.id)
    
    // Also set in cookie for middleware
    document.cookie = `auth_token=${token}; path=/; max-age=86400` // 24 hours
  }

  return {
    user,
    org: mockOrg,
    subscription: mockSubscription,
    token,
    refreshToken,
  }
}

// Mock register
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newUser: User = {
    id: `user_${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'owner',
    orgId: 'org_1',
    createdAt: new Date().toISOString(),
  }

  const token = `mock_token_${newUser.id}_${Date.now()}`
  const refreshToken = `mock_refresh_${newUser.id}_${Date.now()}`

  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('user_id', newUser.id)
  }

  return {
    user: newUser,
    org: mockOrg,
    token,
    refreshToken,
  }
}

// Get current user
export async function getCurrentUser(): Promise<{ user: User; org: Organization; subscription: Subscription }> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (typeof window === 'undefined') {
    throw new Error('getCurrentUser can only be called on client side')
  }

  const userId = localStorage.getItem('user_id')
  const token = localStorage.getItem('auth_token')

  if (!token || !userId) {
    throw new Error('Not authenticated')
  }

  const user = mockUsers.find((u) => u.id === userId)
  
  if (!user) {
    throw new Error('User not found')
  }

  return {
    user,
    org: mockOrg,
    subscription: mockSubscription,
  }
}

// Logout
export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id')
  }
}

// Forgot password
export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: always return success
  return {
    success: true,
    message: 'Password reset email sent. Please check your inbox.',
  }
}

// Reset password
export async function resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    success: true,
    message: 'Password reset successfully. You can now login with your new password.',
  }
}

// Refresh token
export async function refreshToken(refreshToken: string): Promise<{ token: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    token: `mock_token_refreshed_${Date.now()}`,
  }
}

