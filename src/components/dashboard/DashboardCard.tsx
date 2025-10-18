'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface DashboardCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  stats?: {
    value: string | number
    label: string
    trend?: 'up' | 'down' | 'neutral'
  }
  gradient?: string
}

export default function DashboardCard({ 
  title, 
  description, 
  icon, 
  href, 
  stats,
  gradient = 'from-primary-500 to-primary-600'
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="card-gradient p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            
            {stats && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.value}</p>
                  <p className="text-sm text-gray-500">{stats.label}</p>
                </div>
                {stats.trend && (
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    stats.trend === 'up' ? 'bg-success-100 text-success-800' :
                    stats.trend === 'down' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {stats.trend === 'up' && '↗️'}
                    {stats.trend === 'down' && '↘️'}
                    {stats.trend === 'neutral' && '→'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
