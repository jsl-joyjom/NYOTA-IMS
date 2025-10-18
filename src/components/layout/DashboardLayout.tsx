'use client'

import { useState, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(false) // Close mobile sidebar on desktop
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPath={pathname}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Navigation */}
        <TopNav 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
        />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}