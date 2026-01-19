// Method Statement API Service (with mock data)
import type { MethodStatement } from '@/types'
import { mockMethodStatements } from '@/lib/mockData'

export async function listMethodStatements(): Promise<MethodStatement[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMethodStatements
}

export async function getMethodStatement(id: string): Promise<MethodStatement | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockMethodStatements.find((ms) => ms.id === id)
}

export async function createMethodStatement(data: {
  tradeType: MethodStatement['tradeType']
  title: string
  scopeOfWorks: string
  resources: string
  plantMaterials: string
  hsControls: string
  rams: string
  environmentalControls: string
  qa: string
  emergencyProcedures: string
}): Promise<MethodStatement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newMS: MethodStatement = {
    id: `ms_${Date.now()}`,
    orgId: 'org_1',
    tradeType: data.tradeType,
    title: data.title,
    scopeOfWorks: data.scopeOfWorks,
    resources: data.resources,
    plantMaterials: data.plantMaterials,
    hsControls: data.hsControls,
    rams: data.rams,
    environmentalControls: data.environmentalControls,
    qa: data.qa,
    emergencyProcedures: data.emergencyProcedures,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockMethodStatements.push(newMS)
  return newMS
}

export async function updateMethodStatement(
  id: string,
  data: Partial<MethodStatement>
): Promise<MethodStatement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const msIndex = mockMethodStatements.findIndex((ms) => ms.id === id)
  if (msIndex === -1) {
    throw new Error('Method statement not found')
  }

  mockMethodStatements[msIndex] = {
    ...mockMethodStatements[msIndex],
    ...data,
    version: mockMethodStatements[msIndex].version + 1,
    updatedAt: new Date().toISOString(),
  }

  return mockMethodStatements[msIndex]
}

export async function deleteMethodStatement(id: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const msIndex = mockMethodStatements.findIndex((ms) => ms.id === id)
  if (msIndex === -1) {
    throw new Error('Method statement not found')
  }

  mockMethodStatements.splice(msIndex, 1)
  return { success: true }
}

export async function duplicateMethodStatement(id: string): Promise<MethodStatement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const ms = mockMethodStatements.find((m) => m.id === id)
  if (!ms) {
    throw new Error('Method statement not found')
  }

  const newMS: MethodStatement = {
    ...ms,
    id: `ms_${Date.now()}`,
    title: `${ms.title} (Copy)`,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockMethodStatements.push(newMS)
  return newMS
}

export async function getTradePresets(): Promise<MethodStatement[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock presets
  const presets: MethodStatement[] = [
    {
      id: 'preset_highways',
      orgId: 'preset',
      tradeType: 'highways',
      title: 'Highways Maintenance Preset',
      scopeOfWorks: 'Preset scope of works...',
      resources: 'Preset resources...',
      plantMaterials: 'Preset plant & materials...',
      hsControls: 'Preset H&S controls...',
      rams: 'Preset RAMS...',
      environmentalControls: 'Preset environmental controls...',
      qa: 'Preset QA...',
      emergencyProcedures: 'Preset emergency procedures...',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'preset_electrical',
      orgId: 'preset',
      tradeType: 'electrical',
      title: 'Electrical Installation Preset',
      scopeOfWorks: 'Preset scope of works...',
      resources: 'Preset resources...',
      plantMaterials: 'Preset plant & materials...',
      hsControls: 'Preset H&S controls...',
      rams: 'Preset RAMS...',
      environmentalControls: 'Preset environmental controls...',
      qa: 'Preset QA...',
      emergencyProcedures: 'Preset emergency procedures...',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  return presets
}

export async function createMethodStatementFromPreset(presetId: string): Promise<MethodStatement> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const preset = await getTradePresets().then((presets) => presets.find((p) => p.id === presetId))

  if (!preset) {
    throw new Error('Preset not found')
  }

  return createMethodStatement({
    tradeType: preset.tradeType,
    title: preset.title.replace(' Preset', ''),
    scopeOfWorks: preset.scopeOfWorks,
    resources: preset.resources,
    plantMaterials: preset.plantMaterials,
    hsControls: preset.hsControls,
    rams: preset.rams,
    environmentalControls: preset.environmentalControls,
    qa: preset.qa,
    emergencyProcedures: preset.emergencyProcedures,
  })
}

