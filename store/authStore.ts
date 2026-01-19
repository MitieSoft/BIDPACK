// Authentication Store (Zustand)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Organization, Subscription } from '@/types'

interface AuthState {
  user: User | null
  org: Organization | null
  subscription: Subscription | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setOrg: (org: Organization) => void
  setSubscription: (subscription: Subscription) => void
  setToken: (token: string) => void
  setAuth: (user: User, org: Organization, subscription: Subscription, token: string) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      org: null,
      subscription: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setOrg: (org) => set({ org }),
      setSubscription: (subscription) => set({ subscription }),
      setToken: (token) => set({ token }),

      setAuth: (user, org, subscription, token) =>
        set({
          user,
          org,
          subscription,
          token,
          isAuthenticated: true,
        }),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user_id')
          // Remove cookie
          document.cookie = 'auth_token=; path=/; max-age=0'
        }
        set({
          user: null,
          org: null,
          subscription: null,
          token: null,
          isAuthenticated: false,
        })
      },

      checkAuth: async () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token')
          const userId = localStorage.getItem('user_id')
          
          if (token && userId) {
            try {
              const { getCurrentUser } = await import('@/lib/api/authService')
              const { user, org, subscription } = await getCurrentUser()
              set({
                user,
                org,
                subscription,
                token,
                isAuthenticated: true,
              })
            } catch (error) {
              console.error('Auth check failed:', error)
              set({
                user: null,
                org: null,
                subscription: null,
                token: null,
                isAuthenticated: false,
              })
            }
          } else {
            // No token found, clear auth state
            set({
              user: null,
              org: null,
              subscription: null,
              token: null,
              isAuthenticated: false,
            })
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        org: state.org,
        subscription: state.subscription,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

