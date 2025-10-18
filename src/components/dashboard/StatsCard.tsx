'use client'

import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: {
    value: string
    type: 'increase' | 'decrease' | 'neutral'
  }
  color?: 'primary' | 'success' | 'warning' | 'accent'
}

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  change,
  color = 'primary'
}: StatsCardProps) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-200',
    success: 'bg-success-50 text-success-600 border-success-200',
    warning: 'bg-warning-50 text-warning-600 border-warning-200',
    accent: 'bg-accent-50 text-accent-600 border-accent-200'
  }

  const changeClasses = {
    increase: 'text-success-600 bg-success-50',
    decrease: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeClasses[change.type]}`}>
              {change.type === 'increase' && '↗️'}
              {change.type === 'decrease' && '↘️'}
              {change.type === 'neutral' && '→'}
              <span className="ml-1">{change.value}</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
