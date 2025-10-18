'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { UserProvider } from '@/contexts/UserContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.push('/login')
      }
    }
  }, [router])

  return (
    <UserProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </UserProvider>
  )
}