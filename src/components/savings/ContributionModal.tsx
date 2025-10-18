'use client'

import { useState } from 'react'
import { X, TrendingUp, DollarSign, Smartphone, CreditCard } from 'lucide-react'

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
  onContribute: (goalId: string, amount: number, method: string) => void
  goalId: string
  goalTitle: string
  remainingAmount: number
}

export default function ContributionModal({ 
  isOpen, 
  onClose, 
  onContribute, 
  goalId, 
  goalTitle, 
  remainingAmount 
}: ContributionModalProps) {
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('mobile_money')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const quickAmounts = [1000, 2500, 5000, 10000, remainingAmount]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (Number(amount) > remainingAmount) {
      newErrors.amount = `Amount cannot exceed remaining goal of KES ${remainingAmount.toLocaleString()}`
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onContribute(goalId, Number(amount), paymentMethod)
      onClose()
      setAmount('')
      setErrors({})
    }
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }))
    }
  }

  const paymentMethods = [
    { id: 'mobile_money', name: 'Mobile Money', icon: Smartphone, description: 'M-Pesa, Airtel Money' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: CreditCard, description: 'Direct bank transfer' },
    { id: 'cash_deposit', name: 'Cash Deposit', icon: DollarSign, description: 'Deposit at partner locations' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Add Contribution</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-1">Goal: {goalTitle}</h3>
            <p className="text-sm text-blue-800">
              Remaining: KES {remainingAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Amount (KES)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                if (errors.amount) {
                  setErrors(prev => ({ ...prev, amount: '' }))
                }
              }}
              placeholder="Enter amount"
              min="1"
              max={remainingAmount}
              step="100"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Amounts
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.slice(0, 4).map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  KES {quickAmount.toLocaleString()}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleQuickAmount(remainingAmount)}
                className="px-3 py-2 text-sm border border-primary-300 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
              >
                Full Goal
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                      if (errors.paymentMethod) {
                        setErrors(prev => ({ ...prev, paymentMethod: '' }))
                      }
                    }}
                    className="sr-only"
                  />
                  <method.icon className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-1">Important Note</h3>
            <p className="text-sm text-yellow-800">
              This is a simulation. In a real application, this would process the payment through 
              your selected payment method and update your savings account.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
