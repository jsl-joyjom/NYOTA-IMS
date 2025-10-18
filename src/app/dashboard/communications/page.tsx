'use client'

import { useState, useEffect } from 'react'
import { 
  Bell, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Upload,
  Download,
  Reply,
  Send,
  FileText,
  Calendar,
  User,
  Filter,
  X
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Notice {
  id: string
  title: string
  message: string
  type: 'urgent' | 'info' | 'warning' | 'success'
  priority: 'high' | 'medium' | 'low'
  date: string
  read: boolean
  actionRequired?: boolean
  deadline?: string
}

interface Message {
  id: string
  from: string
  subject: string
  content: string
  date: string
  read: boolean
  attachments?: string[]
  type: 'inbox' | 'sent'
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'notices' | 'messages' | 'announcements'>('notices')
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null)

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Training Submission Deadline',
      message: 'Your Digital Marketing course assignment is due on March 15th, 2024. Please ensure all materials are submitted through the platform.',
      type: 'urgent',
      priority: 'high',
      date: '2024-03-10',
      read: false,
      actionRequired: true,
      deadline: '2024-03-15'
    },
    {
      id: '2',
      title: 'Stipend Payment Processed',
      message: 'Your stipend payment for completed milestones has been processed and will reflect in your account within 24-48 hours.',
      type: 'success',
      priority: 'medium',
      date: '2024-03-08',
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      title: 'System Maintenance Notice',
      message: 'The platform will undergo scheduled maintenance on March 12th from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.',
      type: 'info',
      priority: 'medium',
      date: '2024-03-09',
      read: true,
      actionRequired: false
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'MSME Department',
      subject: 'Business Plan Review Feedback',
      content: 'Thank you for submitting your business plan. We have reviewed it and have some suggestions for improvement. Please see the attached feedback document.',
      date: '2024-03-10',
      read: false,
      attachments: ['business-plan-feedback.pdf'],
      type: 'inbox'
    },
    {
      id: '2',
      from: 'Training Coordinator',
      subject: 'Course Schedule Update',
      content: 'The next Entrepreneurship course session has been rescheduled to March 20th at 10:00 AM. Please confirm your attendance.',
      date: '2024-03-09',
      read: true,
      type: 'inbox'
    },
    {
      id: '3',
      from: 'You',
      subject: 'Grant Application Inquiry',
      content: 'I would like to inquire about the status of my grant application submitted on February 15th. Could you please provide an update?',
      date: '2024-03-08',
      read: true,
      type: 'sent'
    }
  ])

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice)
    if (!notice.read) {
      setNotices(prev => prev.map(n => 
        n.id === notice.id ? { ...n, read: true } : n
      ))
    }
  }

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read && message.type === 'inbox') {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ))
    }
  }

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast.error('Please enter a reply message')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newMessage: Message = {
        id: Date.now().toString(),
        from: 'You',
        subject: `Re: ${selectedMessage?.subject}`,
        content: replyContent,
        date: new Date().toISOString().split('T')[0],
        read: true,
        type: 'sent'
      }

      setMessages(prev => [newMessage, ...prev])
      setReplyContent('')
      setShowReplyModal(false)
      toast.success('Reply sent successfully!')
    } catch (error) {
      toast.error('Failed to send reply')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReplyAttachment(file)
      toast.success(`File selected: ${file.name}`)
    }
  }

  const unreadNotices = notices.filter(n => !n.read).length
  const unreadMessages = messages.filter(m => !m.read && m.type === 'inbox').length
  const urgentNotices = notices.filter(n => n.priority === 'high' && !n.read).length

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      default: return 'border-l-blue-500 bg-blue-50'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communications Hub</h1>
          <p className="text-gray-600">Stay updated with notices, messages, and announcements</p>
        </div>
        <div className="flex space-x-2">
          {urgentNotices > 0 && (
            <div className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {urgentNotices} Urgent
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'notices', label: 'Notices', count: unreadNotices, icon: Bell },
          { key: 'messages', label: 'Messages', count: unreadMessages, icon: MessageSquare },
          { key: 'announcements', label: 'Announcements', count: 0, icon: Calendar }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-primary-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1">
          <div className="card">
            {activeTab === 'notices' && (
              <div className="space-y-3 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">System Notices</h3>
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${getPriorityColor(notice.priority)} ${
                      selectedNotice?.id === notice.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getNoticeIcon(notice.type)}
                          <span className={`font-medium text-sm ${!notice.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notice.title}
                          </span>
                          {!notice.read && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{notice.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{notice.date}</span>
                          {notice.actionRequired && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-3 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Messages</h3>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedMessage?.id === message.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-medium text-sm ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {message.from}
                          </span>
                          {!message.read && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{message.subject}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{message.date}</span>
                          {message.attachments && message.attachments.length > 0 && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {message.attachments.length} attachment(s)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          {activeTab === 'notices' && selectedNotice && (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getNoticeIcon(selectedNotice.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedNotice.title}</h3>
                    <p className="text-sm text-gray-600">{selectedNotice.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedNotice.priority === 'high' ? 'bg-red-100 text-red-800' :
                  selectedNotice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedNotice.priority} priority
                </span>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{selectedNotice.message}</p>
                
                {selectedNotice.deadline && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <div>
                        <p className="font-medium text-yellow-800">Deadline</p>
                        <p className="text-yellow-700">{selectedNotice.deadline}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedNotice.actionRequired && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <div>
                        <p className="font-medium text-red-800">Action Required</p>
                        <p className="text-red-700">Please take the necessary action before the deadline.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && selectedMessage && (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">From: {selectedMessage.from}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{selectedMessage.date}</span>
                  </div>
                </div>
                {selectedMessage.type === 'inbox' && (
                  <button
                    onClick={() => setShowReplyModal(true)}
                    className="btn-primary"
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </button>
                )}
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{selectedMessage.content}</p>
              </div>

              {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-900">{attachment}</span>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!selectedNotice && !selectedMessage && (
            <div className="card p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an item</h3>
              <p className="text-gray-600">Choose a notice or message from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reply to Message</h3>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={6}
                    className="input-field"
                    placeholder="Type your reply here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach File (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="input-field"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  {replyAttachment && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {replyAttachment.name} selected
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  className="btn-primary"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
