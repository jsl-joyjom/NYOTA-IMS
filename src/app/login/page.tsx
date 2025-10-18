'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { authApi } from '@/lib/api'
import AuthLayout from '@/components/AuthLayout'

const loginSchema = z.object({
  idNumber: z.string().min(1, 'ID number is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(data)
      
      if (response.success) {
        localStorage.setItem('authToken', response.data.token)
        toast.success('Login successful!')
        router.push('/dashboard')
      } else {
        toast.error(response.error || 'Login failed')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Welcome Back
        </h3>
        <p className="text-gray-600 text-center">
          Sign in to your account
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
            National ID Number
          </label>
          <input
            {...register('idNumber')}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your ID number"
          />
          {errors.idNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.idNumber.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>

      {/* Footer Links */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New to Nyota Platform?</span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/register"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}