'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Download, 
  Play,
  CheckCircle,
  Calendar,
  Target
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  sector: string
  duration: number
  progress: number
  status: 'enrolled' | 'in_progress' | 'completed'
  enrolledAt: string
  milestones: Milestone[]
  documents: Document[]
}

interface Milestone {
  id: string
  title: string
  description: string
  order: number
  isCompleted: boolean
  completedAt?: string
  stipendAmount: number
}

interface Document {
  id: string
  title: string
  type: 'pdf' | 'assignment' | 'certificate'
  url: string
  isRequired: boolean
}

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from API
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Digital Marketing Fundamentals',
        description: 'Learn the basics of digital marketing including SEO, social media, and content marketing.',
        sector: 'Technology',
        duration: 8,
        progress: 75,
        status: 'in_progress',
        enrolledAt: '2024-01-15',
        milestones: [
          {
            id: '1',
            title: 'Introduction to Digital Marketing',
            description: 'Understanding the digital landscape',
            order: 1,
            isCompleted: true,
            completedAt: '2024-01-20',
            stipendAmount: 2000,
          },
          {
            id: '2',
            title: 'SEO Fundamentals',
            description: 'Search engine optimization basics',
            order: 2,
            isCompleted: true,
            completedAt: '2024-01-28',
            stipendAmount: 3000,
          },
          {
            id: '3',
            title: 'Social Media Marketing',
            description: 'Creating effective social media campaigns',
            order: 3,
            isCompleted: false,
            stipendAmount: 2500,
          },
          {
            id: '4',
            title: 'Content Marketing Strategy',
            description: 'Developing content that converts',
            order: 4,
            isCompleted: false,
            stipendAmount: 2500,
          },
        ],
        documents: [
          {
            id: '1',
            title: 'Digital Marketing Course Outline',
            type: 'pdf',
            url: '/documents/digital-marketing-outline.pdf',
            isRequired: true,
          },
          {
            id: '2',
            title: 'Assignment 1: Market Analysis',
            type: 'assignment',
            url: '/documents/assignment1.pdf',
            isRequired: true,
          },
        ],
      },
      {
        id: '2',
        title: 'Business Planning & Management',
        description: 'Essential skills for starting and managing a successful business.',
        sector: 'Business',
        duration: 12,
        progress: 40,
        status: 'in_progress',
        enrolledAt: '2024-02-01',
        milestones: [
          {
            id: '5',
            title: 'Business Model Canvas',
            description: 'Understanding business models',
            order: 1,
            isCompleted: true,
            completedAt: '2024-02-10',
            stipendAmount: 2000,
          },
          {
            id: '6',
            title: 'Market Research',
            description: 'Identifying target markets',
            order: 2,
            isCompleted: true,
            completedAt: '2024-02-18',
            stipendAmount: 2500,
          },
          {
            id: '7',
            title: 'Financial Planning',
            description: 'Creating budgets and projections',
            order: 3,
            isCompleted: false,
            stipendAmount: 3000,
          },
        ],
        documents: [
          {
            id: '3',
            title: 'Business Planning Guide',
            type: 'pdf',
            url: '/documents/business-planning-guide.pdf',
            isRequired: true,
          },
        ],
      },
    ]

    setCourses(mockCourses)
    setLoading(false)
  }, [])

  const handleMilestoneComplete = (courseId: string, milestoneId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedMilestones = course.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              isCompleted: true,
              completedAt: new Date().toISOString(),
            }
          }
          return milestone
        })
        
        const completedMilestones = updatedMilestones.filter(m => m.isCompleted).length
        const newProgress = (completedMilestones / course.milestones.length) * 100
        
        return {
          ...course,
          milestones: updatedMilestones,
          progress: newProgress,
        }
      }
      return course
    }))
  }

  const totalStipendEarned = courses.reduce((total, course) => {
    return total + course.milestones
      .filter(m => m.isCompleted)
      .reduce((sum, milestone) => sum + milestone.stipendAmount, 0)
  }, 0)

  const totalMilestonesCompleted = courses.reduce((total, course) => {
    return total + course.milestones.filter(m => m.isCompleted).length
  }, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training & Certification</h1>
          <p className="text-gray-600">Track your learning progress and earn stipends</p>
        </div>
        <button 
          onClick={() => {
            // Scroll to available courses section
            const availableCourses = document.querySelector('.card:last-child')
            availableCourses?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="btn-primary"
        >
          Browse All Courses
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Milestones Completed</p>
              <p className="text-2xl font-bold text-gray-900">{totalMilestonesCompleted}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stipend Earned</p>
              <p className="text-2xl font-bold text-gray-900">
                KES {totalStipendEarned.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration} weeks
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.sector}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                course.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : course.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {course.status.replace('_', ' ')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round(course.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-3 mb-4">
              <h4 className="font-medium text-gray-900">Milestones</h4>
              {course.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {milestone.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3"></div>
                    )}
                    <div>
                      <p className={`font-medium ${milestone.isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      KES {milestone.stipendAmount.toLocaleString()}
                    </p>
                    {!milestone.isCompleted && (
                      <button
                        onClick={() => handleMilestoneComplete(course.id, milestone.id)}
                        className="mt-1 text-xs text-primary-600 hover:text-primary-700"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Course Materials</h4>
              {course.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-900">{doc.title}</span>
                    {doc.isRequired && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      // Mock download functionality
                      const link = document.createElement('a')
                      link.href = doc.url
                      link.download = doc.title
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => setSelectedCourse(course)}
                className="w-full btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Available Courses */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Agriculture & Agribusiness',
              description: 'Modern farming techniques and business management',
              duration: 10,
              sector: 'Agriculture',
            },
            {
              title: 'Renewable Energy',
              description: 'Solar and wind energy solutions for communities',
              duration: 8,
              sector: 'Energy',
            },
            {
              title: 'Healthcare Services',
              description: 'Basic healthcare and community health services',
              duration: 12,
              sector: 'Healthcare',
            },
          ].map((course, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{course.duration} weeks</span>
                <button 
                  onClick={() => {
                    alert(`Enrolling in ${course.title}... This would normally trigger enrollment API.`)
                  }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
