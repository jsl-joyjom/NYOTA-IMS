'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Calendar,
  Download,
  Filter,
  Plus
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import GoalModal from '@/components/savings/GoalModal'
import GoalCard from '@/components/savings/GoalCard'
import ContributionModal from '@/components/savings/ContributionModal'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Transaction {
  id: string
  type: 'stipend' | 'savings' | 'grant' | 'withdrawal'
  amount: number
  description: string
  reference: string
  createdAt: string
}

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  isCompleted: boolean
}

export default function SavingsPage() {
  const [savingsData, setSavingsData] = useState({
    balance: 1800,
    monthlyTarget: 2000,
    totalSaved: 5400,
    totalStipendReceived: 15000,
    totalGrantsReceived: 5000,
  })

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showContributionModal, setShowContributionModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | undefined>(undefined)
  const [contributionGoalId, setContributionGoalId] = useState('')

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setTransactions([
      {
        id: '1',
        type: 'stipend',
        amount: 3000,
        description: 'Digital Marketing Milestone Completion',
        reference: 'STP-001',
        createdAt: '2024-03-15T10:00:00Z',
      },
      {
        id: '2',
        type: 'savings',
        amount: 180,
        description: 'Monthly Savings Contribution',
        reference: 'SAV-001',
        createdAt: '2024-03-10T10:00:00Z',
      },
      {
        id: '3',
        type: 'grant',
        amount: 2500,
        description: 'Phase 1 Grant Disbursement',
        reference: 'GRT-001',
        createdAt: '2024-03-05T10:00:00Z',
      },
      {
        id: '4',
        type: 'stipend',
        amount: 2000,
        description: 'Business Planning Milestone',
        reference: 'STP-002',
        createdAt: '2024-02-28T10:00:00Z',
      },
    ])

    setSavingsGoals([
      {
        id: '1',
        title: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 1800,
        deadline: '2024-12-31',
        isCompleted: false,
      },
      {
        id: '2',
        title: 'Business Startup Capital',
        targetAmount: 50000,
        currentAmount: 5400,
        deadline: '2025-06-30',
        isCompleted: false,
      },
    ])
  }, [])

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Savings Balance',
        data: [800, 1200, 1500, 1600, 1700, 1800],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Monthly Target',
        data: [2000, 2000, 2000, 2000, 2000, 2000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return 'KES ' + value.toLocaleString()
          }
        }
      },
    },
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'stipend':
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case 'savings':
        return <Target className="w-5 h-5 text-blue-600" />
      case 'grant':
        return <DollarSign className="w-5 h-5 text-purple-600" />
      case 'withdrawal':
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'stipend':
      case 'savings':
      case 'grant':
        return 'text-green-600'
      case 'withdrawal':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const progressPercentage = (savingsData.balance / savingsData.monthlyTarget) * 100

  const handleSaveGoal = (goalData: Omit<SavingsGoal, 'id' | 'currentAmount' | 'isCompleted'>) => {
    if (editingGoal) {
      // Update existing goal
      setSavingsGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...goalData }
          : goal
      ))
    } else {
      // Create new goal
      const newGoal: SavingsGoal = {
        id: Date.now().toString(),
        ...goalData,
        currentAmount: 0,
        isCompleted: false,
      }
      setSavingsGoals(prev => [...prev, newGoal])
    }
    setEditingGoal(undefined)
  }

  const handleEditGoal = (goal: SavingsGoal) => {
    setEditingGoal(goal)
    setShowGoalModal(true)
  }

  const handleDeleteGoal = (goalId: string) => {
    setSavingsGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  const handleAddContribution = (goalId: string) => {
    setContributionGoalId(goalId)
    setShowContributionModal(true)
  }

  const handleContribute = (goalId: string, amount: number, method: string) => {
    // Update goal
    setSavingsGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount
        return {
          ...goal,
          currentAmount: newAmount,
          isCompleted: newAmount >= goal.targetAmount
        }
      }
      return goal
    }))

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'savings',
      amount: amount,
      description: `Contribution to savings goal via ${method.replace('_', ' ')}`,
      reference: `SAV-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setTransactions(prev => [newTransaction, ...prev])

    // Update savings balance
    setSavingsData(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalSaved: prev.totalSaved + amount
    }))

    alert(`Contribution of KES ${amount.toLocaleString()} added successfully!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Savings & Stipend</h1>
          <p className="text-gray-600">Track your savings progress and stipend earnings</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              // Mock export functionality
              const data = {
                balance: savingsData.balance,
                transactions: transactions,
                goals: savingsGoals,
                exportDate: new Date().toISOString()
              }
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `savings-report-${new Date().toISOString().split('T')[0]}.json`
              link.click()
              URL.revokeObjectURL(url)
            }}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => {
              setEditingGoal(undefined)
              setShowGoalModal(true)
            }}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Set Goal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                KES {savingsData.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Target</p>
              <p className="text-2xl font-bold text-gray-900">
                KES {savingsData.monthlyTarget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Stipend</p>
              <p className="text-2xl font-bold text-gray-900">
                KES {savingsData.totalStipendReceived.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Grants</p>
              <p className="text-2xl font-bold text-gray-900">
                KES {savingsData.totalGrantsReceived.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Savings Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Savings Progress</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="3months">Last 3 months</option>
                <option value="6months">Last 6 months</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Monthly Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>March 2024</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>KES {savingsData.balance.toLocaleString()}</span>
                <span>KES {savingsData.monthlyTarget.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Savings Goals</h3>
                <span className="text-sm text-gray-500">{savingsGoals.length} goals</span>
              </div>
              <div className="space-y-3">
                {savingsGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                    onAddContribution={handleAddContribution}
                  />
                ))}
                {savingsGoals.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Target className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No savings goals yet</p>
                    <p className="text-xs">Create your first goal to start saving</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg mr-4">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.createdAt).toLocaleDateString()} • {transaction.reference}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                  {transaction.type === 'withdrawal' ? '-' : '+'}KES {transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {transaction.type.replace('_', ' ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Tips */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Savings Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Set Clear Goals</h3>
            <p className="text-sm text-blue-800">
              Define specific savings targets with deadlines to stay motivated and track progress.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Automatic Savings</h3>
            <p className="text-sm text-green-800">
              Set up automatic transfers to your savings account to build the habit consistently.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">Track Expenses</h3>
            <p className="text-sm text-yellow-800">
              Monitor your spending patterns to identify areas where you can save more money.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-2">Emergency Fund</h3>
            <p className="text-sm text-purple-800">
              Build an emergency fund equivalent to 3-6 months of expenses for financial security.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GoalModal
        isOpen={showGoalModal}
        onClose={() => {
          setShowGoalModal(false)
          setEditingGoal(undefined)
        }}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
      />

      <ContributionModal
        isOpen={showContributionModal}
        onClose={() => setShowContributionModal(false)}
        onContribute={handleContribute}
        goalId={contributionGoalId}
        goalTitle={savingsGoals.find(g => g.id === contributionGoalId)?.title || ''}
        remainingAmount={savingsGoals.find(g => g.id === contributionGoalId)?.targetAmount || 0}
      />
    </div>
  )
}
