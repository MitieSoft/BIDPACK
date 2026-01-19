'use client'

// Admin Route Guard Component
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Card from '@/components/ui/Card'
import { ShieldExclamationIcon } from '@heroicons/react/24/outline'

interface AdminRouteGuardProps {
  children: React.ReactNode
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && user) {
      const isAdmin = user.role === 'owner' || user.role === 'admin'
      if (!isAdmin) {
        router.push('/dashboard')
      }
    } else if (!isAuthenticated) {
      router.push('/login')
    }
  }, [user, isAuthenticated, router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  if (!user || (user.role !== 'owner' && user.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <div className="text-center py-12">
            <ShieldExclamationIcon className="h-16 w-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You don't have permission to access this page. Admin access required.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

