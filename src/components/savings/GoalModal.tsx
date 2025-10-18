'use client'

import { useState } from 'react'
import { X, Target, Calendar, DollarSign } from 'lucide-react'

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  isCompleted: boolean
}

interface GoalModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (goal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'isCompleted'>) => void
  editingGoal?: SavingsGoal
}

export default function GoalModal({ isOpen, onClose, onSave, editingGoal }: GoalModalProps) {
  const [formData, setFormData] = useState({
    title: editingGoal?.title || '',
    targetAmount: editingGoal?.targetAmount || '',
    deadline: editingGoal?.deadline || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required'
    }

    if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Target amount must be greater than 0'
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required'
    } else {
      const deadlineDate = new Date(formData.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (deadlineDate <= today) {
        newErrors.deadline = 'Deadline must be in the future'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        title: formData.title,
        targetAmount: Number(formData.targetAmount),
        deadline: formData.deadline,
      })
      onClose()
      setFormData({ title: '', targetAmount: '', deadline: '' })
      setErrors({})
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              {editingGoal ? 'Edit Savings Goal' : 'Create New Goal'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Goal Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Emergency Fund, Business Startup Capital"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount (KES)
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="targetAmount"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                placeholder="50000"
                min="1"
                step="100"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.targetAmount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.targetAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.targetAmount}</p>
            )}
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
              Target Deadline
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.deadline ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Goal Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Set realistic timelines based on your income</li>
              <li>• Consider breaking large goals into smaller milestones</li>
              <li>• Review and adjust your goals regularly</li>
              <li>• Celebrate small wins along the way</li>
            </ul>
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
              {editingGoal ? 'Update Goal' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
