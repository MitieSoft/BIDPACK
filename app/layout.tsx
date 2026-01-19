'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuthStore } from '@/store/authStore'
import { usePathname } from 'next/navigation'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore()
  const pathname = usePathname()

  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/pricing']
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Show layout only for authenticated routes
  if (isPublicRoute) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        {children}
        <Toaster position="top-right" />
      </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        <Sidebar />
        <div className="flex min-h-screen flex-col lg:pl-64">
          <Header />
          <main className="flex-1 bg-gray-50 px-4 py-4 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}


