'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Home, 
  BookOpen, 
  PiggyBank, 
  Lightbulb, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  User,
  Store,
  X
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  collapsed: boolean
  isMobile: boolean
  onClose: () => void
  onToggleCollapse: () => void
  currentPath: string
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Training', href: '/dashboard/training', icon: BookOpen },
  { name: 'Savings', href: '/dashboard/savings', icon: PiggyBank },
  { name: 'Entrepreneurship', href: '/dashboard/entrepreneurship', icon: Lightbulb },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Marketplace', href: '/dashboard/marketplace', icon: Store },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar({ 
  isOpen, 
  collapsed, 
  isMobile, 
  onClose, 
  onToggleCollapse, 
  currentPath 
}: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'w-64' : collapsed ? 'w-16' : 'w-64'}
        lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-primary-900 to-primary-700">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <Image
                src="/images/NYOTA LOGO. 10.0. PNG.png"
                alt="Nyota Platform Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <span className="text-white text-xl font-bold">Nyota Fund</span>
            </div>
          )}
          
          {collapsed && (
            <div className="flex items-center justify-center mx-auto">
              <Image
                src="/images/NYOTA LOGO. 10.0. PNG.png"
                alt="Nyota Platform Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
          )}

          {/* Collapse Button - Desktop Only */}
          {!isMobile && (
            <button
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-8 h-8 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Close Button - Mobile Only */}
          {isMobile && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 custom-scrollbar overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  sidebar-item group relative
                  ${isActive ? 'active bg-primary-100 text-primary-900' : ''}
                  ${collapsed ? 'justify-center px-2' : ''}
                `}
                onClick={() => {
                  // Close mobile sidebar when navigating
                  if (isMobile) {
                    onClose()
                  }
                }}
              >
                <Icon className={`
                  w-5 h-5 transition-colors
                  ${collapsed ? 'mx-auto' : 'mr-3'} 
                  ${isActive ? 'text-primary-900' : 'text-gray-500 group-hover:text-primary-700'}
                `} />
                
                {!collapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">ID: 12345678</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}