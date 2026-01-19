// Settings Page
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Cog6ToothIcon, BuildingOfficeIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and organization settings"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/settings/organization')}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Organization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Manage your organization details, team members, and invitations
              </p>
              <Button variant="ghost" size="sm">
                Manage Organization
              </Button>
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/settings/subscription')}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Subscription
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                View and manage your subscription plan, billing, and payment methods
              </p>
              <Button variant="ghost" size="sm">
                Manage Subscription
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

