'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  DollarSign, 
  Lightbulb, 
  MessageSquare, 
  TrendingUp,
  Users,
  Award,
  Clock,
  PiggyBank,
  Store,
  Bell,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import DashboardCard from '@/components/dashboard/DashboardCard'
import StatsCard from '@/components/dashboard/StatsCard'
import { useUser } from '@/contexts/UserContext'

export default function Dashboard() {
  const { user: contextUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [urgentNotices, setUrgentNotices] = useState<any[]>([])
  const [showNoticePopup, setShowNoticePopup] = useState(true)

  useEffect(() => {
    // Load urgent notices
    setUrgentNotices([
      {
        id: '1',
        title: 'Training Assignment Due Soon',
        message: 'Digital Marketing assignment due March 15th',
        type: 'urgent',
        deadline: '2024-03-15'
      },
      {
        id: '2',
        title: 'Grant Application Review',
        message: 'Your grant application is under review',
        type: 'info',
        deadline: null
      }
    ])

    // Simulate loading user data
    setTimeout(() => {
      
      setDashboardData({
        totalStipend: 15000,
        savingsBalance: 1800,
        enrolledCourses: 2,
        completedMilestones: 5,
        businessIdeas: 1,
        unreadMessages: 3,
        recentActivities: [
          {
            id: 1,
            type: 'milestone',
            title: 'Completed Digital Marketing Module',
            description: 'Earned KES 3,000 stipend',
            time: '2 hours ago',
          },
          {
            id: 2,
            type: 'savings',
            title: 'Monthly Savings Added',
            description: 'KES 180 added to savings account',
            time: '1 day ago',
          }
        ]
      })
      
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {contextUser?.firstName || 'there'}!
            </h1>
            <p className="text-primary-100 text-lg">
              Ready to continue your journey with Nyota Platform?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-bounce-gentle">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Notices Popup */}
      {showNoticePopup && urgentNotices.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-slide-up">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Urgent Notices</h3>
                <div className="space-y-2">
                  {urgentNotices.slice(0, 2).map((notice) => (
                    <div key={notice.id} className="text-sm text-yellow-700">
                      <span className="font-medium">{notice.title}:</span> {notice.message}
                      {notice.deadline && (
                        <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          Due: {notice.deadline}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowNoticePopup(false)}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Stipend"
          value={`KES ${dashboardData?.totalStipend?.toLocaleString() || '0'}`}
          icon={<TrendingUp className="w-6 h-6" />}
          change={{ value: '+12%', type: 'increase' }}
          color="success"
        />
        <StatsCard
          title="Savings Balance"
          value={`KES ${dashboardData?.savingsBalance?.toLocaleString() || '0'}`}
          icon={<PiggyBank className="w-6 h-6" />}
          change={{ value: '+5%', type: 'increase' }}
          color="accent"
        />
        <StatsCard
          title="Courses Enrolled"
          value={dashboardData?.enrolledCourses || 0}
          icon={<BookOpen className="w-6 h-6" />}
          change={{ value: '2 new', type: 'increase' }}
          color="primary"
        />
        <StatsCard
          title="Unread Messages"
          value={dashboardData?.unreadMessages || 0}
          icon={<MessageSquare className="w-6 h-6" />}
          color="warning"
        />
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Training & Certification"
            description="Access courses, earn certifications, and track your learning progress with stipend rewards."
            icon={<BookOpen className="w-6 h-6 text-white" />}
            href="/dashboard/training"
            gradient="from-blue-500 to-blue-600"
            stats={{ value: dashboardData?.enrolledCourses || 0, label: 'Enrolled Courses', trend: 'up' }}
          />
          
          <DashboardCard
            title="Savings & Stipend"
            description="Manage your savings account and track stipend earnings from completed milestones."
            icon={<PiggyBank className="w-6 h-6 text-white" />}
            href="/dashboard/savings"
            gradient="from-green-500 to-green-600"
            stats={{ value: `KES ${dashboardData?.savingsBalance?.toLocaleString() || '0'}`, label: 'Current Balance', trend: 'up' }}
          />
          
          <DashboardCard
            title="Entrepreneurship Support"
            description="Submit business ideas, take aptitude tests, and apply for grants to start your business."
            icon={<Lightbulb className="w-6 h-6 text-white" />}
            href="/dashboard/entrepreneurship"
            gradient="from-yellow-500 to-yellow-600"
            stats={{ value: dashboardData?.businessIdeas || 0, label: 'Ideas Submitted', trend: 'neutral' }}
          />
          
          <DashboardCard
            title="Communication Hub"
            description="Stay connected with MSME department and receive important updates and notifications."
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            href="/dashboard/messages"
            gradient="from-purple-500 to-purple-600"
            stats={{ value: dashboardData?.unreadMessages || 0, label: 'Unread Messages', trend: 'up' }}
          />
          
          <DashboardCard
            title="Marketplace"
            description="Showcase your products and services, connect with customers and suppliers."
            icon={<Store className="w-6 h-6 text-white" />}
            href="/dashboard/marketplace"
            gradient="from-indigo-500 to-indigo-600"
            stats={{ value: '0', label: 'Products Listed', trend: 'neutral' }}
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {dashboardData?.recentActivities?.map((activity: any) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}