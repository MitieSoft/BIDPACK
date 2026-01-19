// Policy API Service (with mock data)
import type { Policy } from '@/types'
import { mockPolicies } from '@/lib/mockData'

export async function listPolicies(): Promise<Policy[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPolicies
}

export async function getPolicy(id: string): Promise<Policy | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockPolicies.find((p) => p.id === id)
}

export async function createPolicy(data: {
  policyType: Policy['policyType']
  title: string
  content: string
}): Promise<Policy> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newPolicy: Policy = {
    id: `policy_${Date.now()}`,
    orgId: 'org_1',
    policyType: data.policyType,
    title: data.title,
    content: data.content,
    version: 1,
    isTemplate: false,
    lastUpdatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockPolicies.push(newPolicy)
  return newPolicy
}

export async function updatePolicy(id: string, data: Partial<Policy>): Promise<Policy> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const policyIndex = mockPolicies.findIndex((p) => p.id === id)
  if (policyIndex === -1) {
    throw new Error('Policy not found')
  }

  mockPolicies[policyIndex] = {
    ...mockPolicies[policyIndex],
    ...data,
    version: mockPolicies[policyIndex].version + 1,
    lastUpdatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return mockPolicies[policyIndex]
}

export async function deletePolicy(id: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const policyIndex = mockPolicies.findIndex((p) => p.id === id)
  if (policyIndex === -1) {
    throw new Error('Policy not found')
  }

  mockPolicies.splice(policyIndex, 1)
  return { success: true }
}

export async function duplicatePolicy(id: string): Promise<Policy> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const policy = mockPolicies.find((p) => p.id === id)
  if (!policy) {
    throw new Error('Policy not found')
  }

  const newPolicy: Policy = {
    ...policy,
    id: `policy_${Date.now()}`,
    title: `${policy.title} (Copy)`,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockPolicies.push(newPolicy)
  return newPolicy
}

export async function getPolicyTemplates(): Promise<Policy[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock templates - in real app, these would be predefined templates
  const templates: Policy[] = [
    {
      id: 'template_hs',
      orgId: 'template',
      policyType: 'h&s_cdm',
      title: 'Health & Safety Policy Template',
      content: 'Template content for H&S policy...',
      version: 1,
      isTemplate: true,
      lastUpdatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'template_gdpr',
      orgId: 'template',
      policyType: 'gdpr',
      title: 'GDPR Policy Template',
      content: 'Template content for GDPR policy...',
      version: 1,
      isTemplate: true,
      lastUpdatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  return templates
}

export async function createPolicyFromTemplate(templateId: string): Promise<Policy> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const template = await getPolicyTemplates().then((templates) =>
    templates.find((t) => t.id === templateId)
  )

  if (!template) {
    throw new Error('Template not found')
  }

  return createPolicy({
    policyType: template.policyType,
    title: template.title.replace(' Template', ''),
    content: template.content,
  })
}

