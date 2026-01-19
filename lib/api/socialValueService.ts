// Social Value API Service (with mock data)
import type { SocialValue } from '@/types'
import { mockSocialValue } from '@/lib/mockData'

export async function getSocialValue(bidId: string): Promise<SocialValue | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const sv = mockSocialValue.bidId === bidId ? mockSocialValue : null
  return sv
}

export async function createOrUpdateSocialValue(
  bidId: string,
  data: {
    localEmploymentCount: number
    apprenticeshipsCount: number
    smeSpendPercentage: number
    carbonReductionKg: number
    communityEngagementHours: number
  }
): Promise<SocialValue> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock: In real app, this would update/create in database
  return {
    id: mockSocialValue.id,
    bidId,
    localEmploymentCount: data.localEmploymentCount,
    apprenticeshipsCount: data.apprenticeshipsCount,
    smeSpendPercentage: data.smeSpendPercentage,
    carbonReductionKg: data.carbonReductionKg,
    communityEngagementHours: data.communityEngagementHours,
    kpiSummary: {
      totalLocalJobs: data.localEmploymentCount,
      apprenticeshipRate: data.apprenticeshipsCount > 0 ? (data.apprenticeshipsCount / data.localEmploymentCount) * 100 : 0,
      smeSpend: data.smeSpendPercentage,
      carbonSaved: data.carbonReductionKg,
      communityHours: data.communityEngagementHours,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

