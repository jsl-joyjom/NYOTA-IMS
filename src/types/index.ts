// User Types
export interface User {
  id: string
  idNumber: string
  email: string
  phone: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  kraPin: string
  residence: string
  address: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  userId: string
  education: 'form4' | 'below_form4'
  age: number
  isPWD: boolean
  isRefugee: boolean
  preferredSector: string
  profileCompleted: boolean
}

// Training Types
export interface Course {
  id: string
  title: string
  description: string
  sector: string
  duration: number // in weeks
  prerequisites: string[]
  milestones: Milestone[]
  documents: Document[]
}

export interface Milestone {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  isCompleted: boolean
  completedAt?: string
  stipendAmount: number
}

export interface Document {
  id: string
  courseId: string
  title: string
  type: 'pdf' | 'assignment' | 'certificate'
  url: string
  isRequired: boolean
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped'
  progress: number
  enrolledAt: string
  completedAt?: string
  totalStipendEarned: number
}

// Savings Types
export interface SavingsAccount {
  id: string
  userId: string
  balance: number
  monthlyTarget: number
  totalSaved: number
  createdAt: string
}

export interface Transaction {
  id: string
  savingsAccountId: string
  type: 'stipend' | 'savings' | 'grant' | 'withdrawal'
  amount: number
  description: string
  reference: string
  createdAt: string
}

// Entrepreneurship Types
export interface BusinessIdea {
  id: string
  userId: string
  title: string
  description: string
  sector: string
  targetMarket: string
  fundingRequired: number
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedAt?: string
  reviewedAt?: string
}

export interface AptitudeTest {
  id: string
  userId: string
  score: number
  maxScore: number
  completedAt: string
  results: AptitudeResult[]
}

export interface AptitudeResult {
  category: string
  score: number
  maxScore: number
  percentage: number
}

export interface GrantApplication {
  id: string
  userId: string
  businessIdeaId: string
  amount: number
  phase: 1 | 2
  status: 'pending' | 'approved' | 'disbursed' | 'rejected'
  disbursedAt?: string
  followUpRequired: boolean
}

// Communication Types
export interface Message {
  id: string
  userId: string
  from: 'user' | 'admin'
  subject: string
  content: string
  isRead: boolean
  createdAt: string
  attachments?: string[]
}

export interface Notification {
  id: string
  userId: string
  type: 'training' | 'savings' | 'funding' | 'deadline' | 'general'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// Market Access Types
export interface Product {
  id: string
  userId: string
  title: string
  description: string
  category: string
  price: number
  images: string[]
  isActive: boolean
  createdAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form Types
export interface LoginForm {
  idNumber: string
  password: string
}

export interface RegisterForm {
  idNumber: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export interface ProfileUpdateForm {
  residence: string
  address: string
  phone?: string
  email?: string
}
