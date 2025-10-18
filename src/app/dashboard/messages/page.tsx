'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Search,
  Filter,
  MoreVertical,
  User,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  DollarSign,
  GraduationCap,
  Lightbulb,
  FileText,
  Bell
} from 'lucide-react'

interface Message {
  id: string
  from: 'user' | 'admin'
  subject: string
  content: string
  isRead: boolean
  createdAt: string
  attachments?: string[]
  priority?: 'low' | 'medium' | 'high'
}

interface Notification {
  id: string
  type: 'training' | 'savings' | 'funding' | 'deadline' | 'general'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [messages, setMessages] = useState<Message[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setMessages([
      {
        id: '1',
        from: 'admin',
        subject: 'Grant Application Update',
        content: 'Your Phase 1 grant application has been approved. The funds will be disbursed to your account within 3-5 business days. Please ensure your bank details are up to date in your profile.',
        isRead: false,
        createdAt: '2024-03-15T10:00:00Z',
        priority: 'high',
      },
      {
        id: '2',
        from: 'user',
        subject: 'Training Schedule Update',
        content: 'I would like to reschedule my Digital Marketing training session from March 20th to March 25th due to a family emergency. Is this possible?',
        isRead: true,
        createdAt: '2024-03-14T15:30:00Z',
      },
      {
        id: '3',
        from: 'admin',
        subject: 'Monthly Savings Reminder',
        content: 'This is a friendly reminder that your monthly savings contribution is due. You can make your contribution through the savings dashboard. Remember, consistent savings help you achieve your financial goals faster.',
        isRead: true,
        createdAt: '2024-03-10T09:00:00Z',
      },
      {
        id: '4',
        from: 'admin',
        subject: 'New Course Available',
        content: 'We are excited to announce a new course: "Digital Entrepreneurship for Rural Communities". This course is specifically designed for youth in rural areas and includes modules on e-commerce, digital marketing, and online business management.',
        isRead: false,
        createdAt: '2024-03-08T14:20:00Z',
      },
    ])

    setNotifications([
      {
        id: '1',
        type: 'funding',
        title: 'Grant Disbursement',
        message: 'Your Phase 1 grant of KES 75,000 has been processed',
        isRead: false,
        createdAt: '2024-03-15T10:30:00Z',
      },
      {
        id: '2',
        type: 'training',
        title: 'Course Assignment Due',
        message: 'Digital Marketing Assignment 2 is due in 3 days',
        isRead: false,
        createdAt: '2024-03-12T16:00:00Z',
      },
      {
        id: '3',
        type: 'deadline',
        title: 'Savings Target',
        message: 'You are 90% towards your monthly savings target',
        isRead: true,
        createdAt: '2024-03-10T09:15:00Z',
      },
    ])
  }, [])

  const tabs = [
    { id: 'inbox', name: 'Messages', count: messages.filter(m => !m.isRead).length },
    { id: 'notifications', name: 'Notifications', count: notifications.filter(n => !n.isRead).length },
  ]

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-yellow-500'
      case 'low':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-300'
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign className="w-5 h-5 text-green-600" />
      case 'training':
        return <GraduationCap className="w-5 h-5 text-blue-600" />
      case 'deadline':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        from: 'user',
        subject: 'New Message',
        content: newMessage,
        isRead: false,
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [message, ...prev])
      setNewMessage('')
    }
  }

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Hub</h1>
          <p className="text-gray-600">Stay connected with MSME State Department</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
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
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Messages</h2>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50'
                    } ${getPriorityColor(message.priority)} border-l-4`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className={`text-sm font-medium ${
                            message.from === 'admin' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {message.from === 'admin' ? 'MSME Department' : 'You'}
                          </span>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-primary-600 rounded-full ml-2"></div>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {message.subject}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {message.content}
                        </p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                        {message.from === 'admin' && (
                          <div className="mt-1">
                            {message.isRead ? (
                              <CheckCheck className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Check className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedMessage.subject}</h2>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <span className={`font-medium ${
                        selectedMessage.from === 'admin' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {selectedMessage.from === 'admin' ? 'MSME State Department' : 'You'}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedMessage.priority && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedMessage.priority === 'high' ? 'bg-red-100 text-red-800' :
                        selectedMessage.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedMessage.priority} priority
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-900">{attachment}</span>
                          <button 
                            onClick={() => {
                              // Mock download functionality
                              alert(`Downloading ${attachment}... This would normally download the file.`)
                            }}
                            className="ml-auto text-primary-600 hover:text-primary-700 text-sm"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Reply</h3>
                  <div className="space-y-3">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={4}
                    />
                    <div className="flex items-center justify-between">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="btn-primary flex items-center"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex items-center justify-center h-64">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Message</h3>
                  <p className="text-gray-600">Choose a message from the list to view its details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card ${
                !notification.isRead ? 'border-l-4 border-l-primary-500' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
            <div className="flex items-center mb-2">
              <MessageSquare className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-medium">Send Feedback</h3>
            </div>
            <p className="text-sm text-gray-600">Share your experience with the platform</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-medium">Report Issue</h3>
            </div>
            <p className="text-sm text-gray-600">Report technical issues or concerns</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors text-left">
            <div className="flex items-center mb-2">
              <User className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium">Request Support</h3>
            </div>
            <p className="text-sm text-gray-600">Get help with your account or services</p>
          </button>
        </div>
      </div>
    </div>
  )
}
