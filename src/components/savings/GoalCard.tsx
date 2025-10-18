'use client'

import { Edit, Trash2, TrendingUp, Calendar, Target } from 'lucide-react'
import { useState } from 'react'

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  isCompleted: boolean
}

interface GoalCardProps {
  goal: SavingsGoal
  onEdit: (goal: SavingsGoal) => void
  onDelete: (goalId: string) => void
  onAddContribution: (goalId: string) => void
}

export default function GoalCard({ goal, onEdit, onDelete, onAddContribution }: GoalCardProps) {
  const [showActions, setShowActions] = useState(false)
  
  const progressPercentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isOverdue = daysRemaining < 0
  const isCompleted = goal.isCompleted || progressPercentage >= 100

  const getProgressColor = () => {
    if (isCompleted) return 'bg-green-500'
    if (isOverdue) return 'bg-red-500'
    if (progressPercentage >= 75) return 'bg-blue-500'
    if (progressPercentage >= 50) return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  const getStatusText = () => {
    if (isCompleted) return 'Completed'
    if (isOverdue) return 'Overdue'
    if (daysRemaining <= 7) return 'Due Soon'
    return 'On Track'
  }

  const getStatusColor = () => {
    if (isCompleted) return 'text-green-600 bg-green-100'
    if (isOverdue) return 'text-red-600 bg-red-100'
    if (daysRemaining <= 7) return 'text-yellow-600 bg-yellow-100'
    return 'text-blue-600 bg-blue-100'
  }

  return (
    <div 
      className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className={isOverdue ? 'text-red-600' : ''}>
              {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : 
               daysRemaining === 0 ? 'Due today' : 
               `${daysRemaining} days remaining`}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          
          {showActions && (
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(goal)
                }}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                title="Edit goal"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm('Are you sure you want to delete this goal?')) {
                    onDelete(goal.id)
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Amount Details */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Saved</p>
          <p className="text-lg font-semibold text-gray-900">
            KES {goal.currentAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Target</p>
          <p className="text-lg font-semibold text-gray-900">
            KES {goal.targetAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Remaining Amount */}
      {!isCompleted && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Remaining</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              KES {(goal.targetAmount - goal.currentAmount).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {!isCompleted && (
        <button
          onClick={() => onAddContribution(goal.id)}
          className="w-full btn-primary flex items-center justify-center"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Add Contribution
        </button>
      )}

      {/* Completion Celebration */}
      {isCompleted && (
        <div className="text-center py-3 bg-green-50 rounded-lg">
          <div className="text-green-600 font-medium mb-1">🎉 Goal Achieved!</div>
          <div className="text-sm text-green-700">
            Congratulations on reaching your savings target!
          </div>
        </div>
      )}
    </div>
  )
}
