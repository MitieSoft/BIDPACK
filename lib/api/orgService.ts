// Organization API Service (with mock data)
import type { User, Organization } from '@/types'
import { mockOrg, mockUsers } from '@/lib/mockData'

export async function getCurrentOrg(): Promise<Organization> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockOrg
}

export async function updateOrgName(name: string): Promise<Organization> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    ...mockOrg,
    name,
    updatedAt: new Date().toISOString(),
  }
}

export async function getOrgMembers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsers
}

export interface InviteMemberRequest {
  email: string
  role: 'admin' | 'member'
}

export async function inviteMember(data: InviteMemberRequest): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: `Invitation sent to ${data.email}`,
  }
}

export async function updateMemberRole(userId: string, role: 'owner' | 'admin' | 'member'): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = mockUsers.find((u) => u.id === userId) || mockUsers[0]
  return {
    ...user,
    role,
  }
}

export async function removeMember(userId: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    message: 'Member removed successfully',
  }
}

