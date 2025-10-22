'use client'

import { useEffect } from 'react'
import { testConfiguration } from '@/lib/test-config'

/**
 * Configuration Test Component
 * Only renders in development mode
 */
export default function ConfigTest() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      testConfiguration()
    }
  }, [])

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-100 text-blue-800 p-2 rounded text-xs opacity-75">
      Config test running in console
    </div>
  )
}
