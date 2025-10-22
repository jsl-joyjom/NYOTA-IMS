import axios from 'axios'
import { ApiResponse, PaginatedResponse } from '@/types'
import { config, getApiUrl } from './config'

// Create axios instance with configuration
const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  validateId: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/validate-id', data)
    return response.data
  },

  verifyContact: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/verify-contact', data)
    return response.data
  },

  verifyOtp: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/verify-otp', data)
    return response.data
  },

  register: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/register', data)
    return response.data
  },

  login: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/login', data)
    return response.data
  },

  resendOtp: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/resend-otp', data)
    return response.data
  },

  logout: async (): Promise<ApiResponse<any>> => {
    const response = await api.post('/api/auth/logout')
    return response.data
  },
}

// User API
export const userApi = {
  getProfile: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/user/profile')
    return response.data
  },

  updateProfile: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.put('/api/user/profile', data)
    return response.data
  },

  getDashboard: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/api/user/dashboard')
    return response.data
  },
}

// Training API
export const trainingApi = {
  getCourses: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/api/training/courses')
    return response.data
  },

  enrollInCourse: async (courseId: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/api/training/courses/${courseId}/enroll`)
    return response.data
  },

  getEnrollments: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/api/training/enrollments')
    return response.data
  },

  updateMilestone: async (milestoneId: string): Promise<ApiResponse<any>> => {
    const response = await api.post(`/api/training/milestones/${milestoneId}/complete`)
    return response.data
  },
}

// Savings API
export const savingsApi = {
  getAccount: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/savings/account')
    return response.data
  },

  getTransactions: async (page = 1, limit = 10): Promise<PaginatedResponse<any>> => {
    const response = await api.get(`/savings/transactions?page=${page}&limit=${limit}`)
    return response.data
  },

  updateSavingsTarget: async (target: number): Promise<ApiResponse<any>> => {
    const response = await api.put('/savings/target', { target })
    return response.data
  },
}

// Entrepreneurship API
export const entrepreneurshipApi = {
  submitBusinessIdea: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/entrepreneurship/business-idea', data)
    return response.data
  },

  getBusinessIdeas: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/entrepreneurship/business-ideas')
    return response.data
  },

  takeAptitudeTest: async (answers: any[]): Promise<ApiResponse<any>> => {
    const response = await api.post('/entrepreneurship/aptitude-test', { answers })
    return response.data
  },

  applyForGrant: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/entrepreneurship/grant-application', data)
    return response.data
  },
}

// Communication API
export const communicationApi = {
  getMessages: async (page = 1, limit = 10): Promise<PaginatedResponse<any>> => {
    const response = await api.get(`/communication/messages?page=${page}&limit=${limit}`)
    return response.data
  },

  sendMessage: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/communication/messages', data)
    return response.data
  },

  getNotifications: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/communication/notifications')
    return response.data
  },

  markAsRead: async (messageId: string): Promise<ApiResponse<any>> => {
    const response = await api.put(`/communication/messages/${messageId}/read`)
    return response.data
  },
}

// Market API
export const marketApi = {
  getProducts: async (page = 1, limit = 10): Promise<PaginatedResponse<any>> => {
    const response = await api.get(`/market/products?page=${page}&limit=${limit}`)
    return response.data
  },

  createProduct: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/market/products', data)
    return response.data
  },

  updateProduct: async (productId: string, data: any): Promise<ApiResponse<any>> => {
    const response = await api.put(`/market/products/${productId}`, data)
    return response.data
  },
}

export default api
