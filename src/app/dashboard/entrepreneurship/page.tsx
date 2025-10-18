'use client'

import { useState, useEffect } from 'react'
import { 
  Lightbulb, 
  FileText, 
  Target, 
  TrendingUp, 
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  Eye,
  Edit,
  Send,
  X
} from 'lucide-react'

interface BusinessIdea {
  id: string
  title: string
  description: string
  sector: string
  targetMarket: string
  fundingRequired: number
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedAt?: string
  reviewedAt?: string
}

interface AptitudeTest {
  id: string
  userId: string
  score: number
  maxScore: number
  completedAt: string
  results: {
    category: string
    score: number
    maxScore: number
    percentage: number
  }[]
}

interface GrantApplication {
  id: string
  businessIdeaId: string
  amount: number
  phase: 1 | 2
  status: 'pending' | 'approved' | 'disbursed' | 'rejected'
  disbursedAt?: string
  followUpRequired: boolean
}

export default function EntrepreneurshipPage() {
  const [activeTab, setActiveTab] = useState('ideas')
  const [businessIdeas, setBusinessIdeas] = useState<BusinessIdea[]>([])
  const [aptitudeTest, setAptitudeTest] = useState<AptitudeTest | null>(null)
  const [grantApplications, setGrantApplications] = useState<GrantApplication[]>([])
  const [showIdeaForm, setShowIdeaForm] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setBusinessIdeas([
      {
        id: '1',
        title: 'Mobile App for Local Farmers',
        description: 'A mobile application that connects local farmers with buyers and provides market price information.',
        sector: 'Agriculture',
        targetMarket: 'Small-scale farmers in rural areas',
        fundingRequired: 150000,
        status: 'approved',
        submittedAt: '2024-02-15T10:00:00Z',
        reviewedAt: '2024-02-20T10:00:00Z',
      },
      {
        id: '2',
        title: 'Eco-Friendly Packaging Solutions',
        description: 'Biodegradable packaging materials made from agricultural waste.',
        sector: 'Manufacturing',
        targetMarket: 'Local businesses and restaurants',
        fundingRequired: 200000,
        status: 'under_review',
        submittedAt: '2024-03-01T10:00:00Z',
      },
    ])

    setAptitudeTest({
      id: '1',
      userId: 'user123',
      score: 85,
      maxScore: 100,
      completedAt: '2024-02-10T10:00:00Z',
      results: [
        { category: 'Business Acumen', score: 18, maxScore: 20, percentage: 90 },
        { category: 'Financial Management', score: 16, maxScore: 20, percentage: 80 },
        { category: 'Marketing & Sales', score: 17, maxScore: 20, percentage: 85 },
        { category: 'Operations', score: 15, maxScore: 20, percentage: 75 },
        { category: 'Innovation', score: 19, maxScore: 20, percentage: 95 },
      ],
    })

    setGrantApplications([
      {
        id: '1',
        businessIdeaId: '1',
        amount: 75000,
        phase: 1,
        status: 'disbursed',
        disbursedAt: '2024-02-25T10:00:00Z',
        followUpRequired: true,
      },
    ])
  }, [])

  const tabs = [
    { id: 'ideas', name: 'Business Ideas', icon: Lightbulb },
    { id: 'aptitude', name: 'Aptitude Test', icon: Target },
    { id: 'grants', name: 'Grant Applications', icon: DollarSign },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'disbursed':
        return 'bg-green-100 text-green-800'
      case 'under_review':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'disbursed':
        return <CheckCircle className="w-4 h-4" />
      case 'under_review':
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'rejected':
        return <X className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrepreneurship Support</h1>
          <p className="text-gray-600">Submit ideas, take aptitude tests, and access grant funding</p>
        </div>
        {activeTab === 'ideas' && (
          <button 
            onClick={() => setShowIdeaForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Business Idea
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'ideas' && (
        <div className="space-y-6">
          {/* Business Ideas List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {businessIdeas.map((idea) => (
              <div key={idea.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{idea.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {idea.sector}
                      </span>
                      <span>KES {idea.fundingRequired.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Target Market:</strong> {idea.targetMarket}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(idea.status)}`}>
                    {getStatusIcon(idea.status)}
                    <span className="ml-1">{idea.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    {idea.submittedAt && (
                      <p>Submitted: {new Date(idea.submittedAt).toLocaleDateString()}</p>
                    )}
                    {idea.reviewedAt && (
                      <p>Reviewed: {new Date(idea.reviewedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    {idea.status === 'draft' && (
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-primary-600 mr-2" />
                  <h3 className="font-medium">Business Plan Template</h3>
                </div>
                <p className="text-sm text-gray-600">Download our comprehensive business plan template</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Market Research</h3>
                </div>
                <p className="text-sm text-gray-600">Access market research tools and resources</p>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-medium">Mentorship Program</h3>
                </div>
                <p className="text-sm text-gray-600">Connect with experienced business mentors</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'aptitude' && (
        <div className="space-y-6">
          {aptitudeTest ? (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Aptitude Test Results</h2>
                  <p className="text-gray-600">Completed on {new Date(aptitudeTest.completedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{aptitudeTest.score}/{aptitudeTest.maxScore}</p>
                  <p className="text-sm text-gray-600">Overall Score</p>
                </div>
              </div>

              <div className="space-y-4">
                {aptitudeTest.results.map((result, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">{result.category}</h3>
                      <span className="text-sm font-medium text-primary-600">
                        {result.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>{result.score}/{result.maxScore} points</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Recommendations</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Excellent performance in Innovation and Business Acumen</p>
                  <p>• Consider additional training in Operations Management</p>
                  <p>• Strong foundation for entrepreneurship - ready for grant applications</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Take Your Aptitude Test</h2>
              <p className="text-gray-600 mb-6">
                Complete the entrepreneurship aptitude test to assess your business readiness and unlock grant opportunities.
              </p>
              <button 
                onClick={() => setShowTestModal(true)}
                className="btn-primary"
              >
                Start Test
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'grants' && (
        <div className="space-y-6">
          {grantApplications.length > 0 ? (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Grant Applications</h2>
              <div className="space-y-4">
                {grantApplications.map((grant) => (
                  <div key={grant.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">Phase {grant.phase} Grant</h3>
                        <p className="text-sm text-gray-600">
                          Amount: KES {grant.amount.toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(grant.status)}`}>
                        {getStatusIcon(grant.status)}
                        <span className="ml-1">{grant.status}</span>
                      </span>
                    </div>
                    
                    {grant.disbursedAt && (
                      <p className="text-sm text-gray-600 mb-3">
                        Disbursed: {new Date(grant.disbursedAt).toLocaleDateString()}
                      </p>
                    )}
                    
                    {grant.followUpRequired && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Follow-up Required:</strong> Submit your 2-month progress report to unlock Phase 2 funding.
                        </p>
                        <button className="mt-2 text-sm text-yellow-700 hover:text-yellow-800 font-medium">
                          Submit Progress Report
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">No Grant Applications</h2>
              <p className="text-gray-600 mb-6">
                Submit a business idea and complete your aptitude test to become eligible for grant funding.
              </p>
              <button className="btn-primary">
                Apply for Grants
              </button>
            </div>
          )}

          {/* Grant Information */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Grant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Phase 1 Grant</h3>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Amount:</strong> Up to 50% of training completion stipend
                </p>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Requirements:</strong> Completed training milestones, approved business idea
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Timeline:</strong> Disbursed immediately after training completion
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Phase 2 Grant</h3>
                <p className="text-sm text-green-800 mb-2">
                  <strong>Amount:</strong> Remaining 50% after 2-month follow-up
                </p>
                <p className="text-sm text-green-800 mb-2">
                  <strong>Requirements:</strong> Successful Phase 1 implementation, progress report
                </p>
                <p className="text-sm text-green-800">
                  <strong>Timeline:</strong> Disbursed after successful follow-up assessment
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
