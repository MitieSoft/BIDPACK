// Export API Service (with mock data)
import type { ExportJob } from '@/types'

export async function createExportJob(bidId: string, format: 'zip' | 'pdf' | 'both'): Promise<ExportJob> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const job: ExportJob = {
    id: `export_${Date.now()}`,
    bidId,
    orgId: 'org_1',
    userId: 'user_1',
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  // Simulate processing
  setTimeout(() => {
    job.status = 'processing'
  }, 1000)

  // Simulate completion
  setTimeout(() => {
    job.status = 'completed'
    job.filePath = `/exports/${job.id}.zip`
    job.fileUrl = `https://example.com/exports/${job.id}.zip`
    job.fileSize = 1024 * 1024 * 5 // 5MB
    job.completedAt = new Date().toISOString()
  }, 3000)

  return job
}

export async function getExportJob(jobId: string): Promise<ExportJob | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock: Return a completed export job
  return {
    id: jobId,
    bidId: 'bid_1',
    orgId: 'org_1',
    userId: 'user_1',
    status: 'completed',
    filePath: `/exports/${jobId}.zip`,
    fileUrl: `https://example.com/exports/${jobId}.zip`,
    fileSize: 1024 * 1024 * 5,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date().toISOString(),
  }
}

export async function listExportJobs(bidId: string): Promise<ExportJob[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock: Return list of export jobs
  return [
    {
      id: 'export_1',
      bidId,
      orgId: 'org_1',
      userId: 'user_1',
      status: 'completed',
      filePath: '/exports/export_1.zip',
      fileUrl: 'https://example.com/exports/export_1.zip',
      fileSize: 1024 * 1024 * 5,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      completedAt: new Date(Date.now() - 86400000 + 3000).toISOString(),
    },
    {
      id: 'export_2',
      bidId,
      orgId: 'org_1',
      userId: 'user_1',
      status: 'completed',
      filePath: '/exports/export_2.pdf',
      fileUrl: 'https://example.com/exports/export_2.pdf',
      fileSize: 1024 * 500,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      completedAt: new Date(Date.now() - 172800000 + 2000).toISOString(),
    },
  ]
}

export async function validateBidForExport(bidId: string): Promise<{
  canExport: boolean
  complianceStatus: {
    totalRequirements: number
    coveredCount: number
    missingCount: number
    nonCompliantCount: number
  }
  errors: string[]
}> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock: Check compliance
  const mockCompliance = {
    totalRequirements: 10,
    coveredCount: 8,
    missingCount: 1,
    nonCompliantCount: 1,
  }

  const errors: string[] = []
  if (mockCompliance.missingCount > 0) {
    errors.push(`${mockCompliance.missingCount} requirement(s) are missing`)
  }
  if (mockCompliance.nonCompliantCount > 0) {
    errors.push(`${mockCompliance.nonCompliantCount} requirement(s) are non-compliant`)
  }

  return {
    canExport: errors.length === 0,
    complianceStatus: mockCompliance,
    errors,
  }
}

