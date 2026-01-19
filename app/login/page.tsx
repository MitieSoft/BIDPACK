// Login Page
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import LoginForm from '@/components/auth/LoginForm'
import Card from '@/components/ui/Card'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth()
      setIsChecking(false)
    }
    verifyAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isChecking, isAuthenticated, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to BIDPACK UK
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Tender Compliance Operating System
          </p>
        </div>
        
        <Card>
          <LoginForm />
        </Card>

        {/* Demo Credentials Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Demo Accounts
          </h3>
          <div className="space-y-2 text-sm">
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-medium text-gray-900 dark:text-white mb-1">Admin Account:</p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-mono">admin@bidpack.co.uk</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Password: <span className="font-mono">admin123</span>
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-3">
              <p className="font-medium text-gray-900 dark:text-white mb-1">Subscription User:</p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-mono">user@demo-construction.co.uk</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Password: <span className="font-mono">user123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

