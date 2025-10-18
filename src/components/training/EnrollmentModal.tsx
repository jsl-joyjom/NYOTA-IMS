'use client'

import { useState } from 'react'
import { X, Check, Clock, Users, Award, AlertCircle, Star, TrendingUp, Shield, BookOpen } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Course {
  id: string
  title: string
  description: string
  duration: string
  requirements: string[]
  sector: string
  maxParticipants: number
  currentEnrolled: number
  stipendAmount: number
  rating: number
}

interface EnrollmentModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  onEnroll: (courseId: string) => Promise<void>
}

export default function EnrollmentModal({ course, isOpen, onClose, onEnroll }: EnrollmentModalProps) {
  const [step, setStep] = useState<'details' | 'confirm' | 'otp'>('details')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  if (!course || !isOpen) return null

  const handleEnroll = async () => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    setLoading(true)
    try {
      // Send OTP to user's email and phone
      await onEnroll(course.id)
      setStep('otp')
      toast.success('OTP sent to your email and phone')
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      // Verify OTP and complete enrollment
      toast.success('🎉 Enrollment successful! Welcome to the course.')
      onClose()
      setStep('details')
      setAcceptedTerms(false)
      setOtp('')
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isEligible = () => {
    // Check eligibility based on user data
    return true // Mock - in real app, check age, PWD status, etc.
  }

  const enrollmentProgress = Math.round((course.currentEnrolled / course.maxParticipants) * 100)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {step === 'details' && 'Course Enrollment'}
                  {step === 'confirm' && 'Confirm Enrollment'}
                  {step === 'otp' && 'Verify OTP'}
                </h3>
                <p className="text-sm text-gray-500">
                  {step === 'details' && 'Review course details and requirements'}
                  {step === 'otp' && 'Secure enrollment confirmation'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Course Details */}
          {step === 'details' && (
            <div className="space-y-6">
              {/* Course Overview */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-primary-900 mb-2">{course.title}</h4>
                    <p className="text-primary-700 mb-4">{course.description}</p>
                  </div>
                  <div className="flex items-center bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm">
                    <Star className="w-4 h-4 mr-1" />
                    {course.rating}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-primary-700">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-primary-700">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.currentEnrolled}/{course.maxParticipants} enrolled</span>
                  </div>
                  <div className="flex items-center text-primary-700">
                    <Award className="w-4 h-4 mr-2" />
                    <span>KES {course.stipendAmount.toLocaleString()} stipend</span>
                  </div>
                  <div className="flex items-center text-primary-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>{course.sector}</span>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-primary-600 mb-1">
                    <span>Enrollment Progress</span>
                    <span>{enrollmentProgress}% full</span>
                  </div>
                  <div className="w-full bg-primary-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${enrollmentProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-primary-600" />
                  Requirements
                </h5>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility Check */}
              {!isEligible() && (
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h6 className="font-medium text-warning-800">Eligibility Notice</h6>
                      <p className="text-warning-700 text-sm mt-1">
                        You may not meet all requirements for this course. Please review the eligibility criteria.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="border-t pt-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 underline">
                      Terms and Conditions
                    </a>{' '}
                    and understand that I must complete the course requirements to receive stipend payments.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnroll}
                  disabled={!acceptedTerms || loading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending OTP...' : 'Enroll Now'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-10 h-10 text-primary-600" />
              </div>
              
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">Verify Your Enrollment</h4>
                <p className="text-gray-600">
                  We've sent a 6-digit OTP to your registered email and phone number. 
                  Enter the code below to confirm your enrollment in <strong>{course.title}</strong>.
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full text-center text-3xl font-mono tracking-widest border-2 border-gray-300 rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || loading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify & Enroll'}
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Didn't receive the OTP?{' '}
                <button className="text-primary-600 hover:text-primary-500 underline font-medium">
                  Resend Code
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
