'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  idNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
  profileImage?: string
  kraPin: string
  residence: string
  address: string
  isPwd: boolean
  settings: any
  paymentDetails: any
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateProfile: (updates: Partial<User>) => void
  updateProfileImage: (imageUrl: string) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount (client-side only)
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Error parsing saved user:', error)
        }
      }
    }
    setLoading(false)
  }, [])

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    }
  }

  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl }
      setUser(updatedUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      updateProfile,
      updateProfileImage,
      loading
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
