'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { ArrowLeft, CheckCircle, Loader2, User, Mail, Phone, Lock, CreditCard } from 'lucide-react'
import AuthLayout from '@/components/AuthLayout'
import { authApi } from '@/lib/api'

// Step 1: ID validation schema
const idValidationSchema = z.object({
  idNumber: z.string().min(8, 'ID number must be at least 8 characters'),
})

// Step 2: Contact verification schema
const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
})

// Step 3: Account creation schema
const accountSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type IdValidationForm = z.infer<typeof idValidationSchema>
type ContactForm = z.infer<typeof contactSchema>
type AccountForm = z.infer<typeof accountSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [contactData, setContactData] = useState<any>(null)

  // Step 1: ID Validation
  const {
    register: registerId,
    handleSubmit: handleSubmitId,
    formState: { errors: errorsId },
  } = useForm<IdValidationForm>({
    resolver: zodResolver(idValidationSchema),
  })

  // Step 2: Contact Verification
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: errorsContact },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  // Step 3: Account Creation
  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount },
  } = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
  })

  const onSubmitIdValidation = async (data: IdValidationForm) => {
    setIsLoading(true)
    try {
      const result = await authApi.validateId(data)
      
      if (result.success) {
        setUserData(result.data)
        setCurrentStep(2)
        toast.success('ID validated successfully!')
      } else {
        toast.error(result.error || 'ID validation failed')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'An error occurred during ID validation')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitContact = async (data: ContactForm) => {
    setIsLoading(true)
    try {
      const result = await authApi.verifyContact({ ...userData, ...data })
      
      if (result.success) {
        setContactData(data)
        setCurrentStep(3)
        toast.success('Contact verification initiated!')
      } else {
        toast.error(result.error || 'Contact verification failed')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'An error occurred during contact verification')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitAccount = async (data: AccountForm) => {
    setIsLoading(true)
    try {
      const result = await authApi.register({ ...userData, ...contactData, ...data })
      
      if (result.success) {
        toast.success('Account created successfully!')
        router.push('/login')
      } else {
        toast.error(result.error || 'Account creation failed')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'An error occurred during account creation')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Step 1: Validate Your ID
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Enter your National ID number to verify eligibility
              </p>
            </div>

            <form onSubmit={handleSubmitId(onSubmitIdValidation)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...registerId('idNumber')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your ID number"
                  />
                </div>
                {errorsId.idNumber && (
                  <p className="mt-1 text-sm text-red-600">{errorsId.idNumber.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Validating...
                  </>
                ) : (
                  'Validate ID'
                )}
              </button>
            </form>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Step 2: Contact Information
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Provide your contact details for verification
              </p>
            </div>

            <form onSubmit={handleSubmitContact(onSubmitContact)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...registerContact('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                {errorsContact.email && (
                  <p className="mt-1 text-sm text-red-600">{errorsContact.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...registerContact('phone')}
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errorsContact.phone && (
                  <p className="mt-1 text-sm text-red-600">{errorsContact.phone.message}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Contact'
                  )}
                </button>
              </div>
            </form>
          </div>
        )

      case 3:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Step 3: Create Account
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Set up your secure account credentials
              </p>
            </div>

            <form onSubmit={handleSubmitAccount(onSubmitAccount)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...registerAccount('password')}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                  />
                </div>
                {errorsAccount.password && (
                  <p className="mt-1 text-sm text-red-600">{errorsAccount.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...registerAccount('confirmPassword')}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
                {errorsAccount.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errorsAccount.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      {...registerAccount('acceptTerms')}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-primary-600 hover:text-primary-500">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-primary-600 hover:text-primary-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                {errorsAccount.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{errorsAccount.acceptTerms.message}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AuthLayout>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div
                  className={`w-8 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Step {currentStep} of 3
          </p>
        </div>
      </div>

      {renderStepContent()}

      {/* Footer Links */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}