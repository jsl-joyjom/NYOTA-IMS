'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu, Bell, MessageSquare, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useUser } from '@/contexts/UserContext'

interface TopNavProps {
  onMenuClick: () => void
  sidebarOpen: boolean
  isMobile: boolean
}

export default function TopNav({ onMenuClick, sidebarOpen, isMobile }: TopNavProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { user } = useUser()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const handleProfileClick = () => {
    router.push('/dashboard/profile')
    setShowProfileDropdown(false)
  }

  const handleSettingsClick = () => {
    router.push('/dashboard/settings')
    setShowProfileDropdown(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {/* Logo - Hidden on mobile when sidebar is open */}
            <div className={`flex items-center space-x-2 ${isMobile ? 'hidden' : ''}`}>
              <Image
                src="/images/NYOTA LOGO. 10.0. PNG.png"
                alt="Nyota Platform Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-gray-900 hidden sm:block">Nyota Fund</span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                />
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Communications Hub */}
            <button 
              onClick={() => router.push('/dashboard/communications')}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Messages */}
            <button 
              onClick={() => router.push('/dashboard/messages')}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover animate-pulse-soft"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-up">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user ? `${user.firstName} ${user.lastName}` : 'John Doe'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || 'john.doe@example.com'}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {user?.idNumber || '12345678'}
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-4 h-4 mr-3" />
                    My Profile
                  </button>
                  
                  <button 
                    onClick={handleSettingsClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </header>
  )
}