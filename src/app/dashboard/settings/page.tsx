'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail, 
  Key,
  Save,
  Eye,
  EyeOff,
  Camera,
  Check
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UserSettings {
  language: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  privacy: {
    profileVisibility: string
    dataSharing: boolean
  }
  security: {
    twoFactor: boolean
    sessionTimeout: number
  }
}

interface PaymentDetails {
  preferredMethod: string
  bankName: string
  accountNumber: string
  mpesaNumber: string
  airtelNumber: string
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'security' | 'payment'>('profile')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+254712345678',
    idNumber: '12345678',
    residence: 'Nairobi',
    address: 'Nairobi, Nairobi County',
    guardianName: '',
    guardianPhone: '',
    guardianRelationship: ''
  })

  const [settings, setSettings] = useState<UserSettings>({
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 60
    }
  })

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    preferredMethod: 'mpesa',
    bankName: '',
    accountNumber: '',
    mpesaNumber: '+254712345678',
    airtelNumber: ''
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings updated successfully!')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Payment details updated successfully!')
    } catch (error) {
      toast.error('Failed to update payment details')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
        toast.success('Profile image uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'payment', label: 'Payment', icon: Smartphone }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-600">Upload a photo (JPEG, PNG, max 2MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residence</label>
                    <input
                      type="text"
                      value={profileData.residence}
                      onChange={(e) => setProfileData({...profileData, residence: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                      <input
                        type="text"
                        value={profileData.guardianName}
                        onChange={(e) => setProfileData({...profileData, guardianName: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                      <input
                        type="tel"
                        value={profileData.guardianPhone}
                        onChange={(e) => setProfileData({...profileData, guardianPhone: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                      <select
                        value={profileData.guardianRelationship}
                        onChange={(e) => setProfileData({...profileData, guardianRelationship: e.target.value})}
                        className="input-field"
                      >
                        <option value="">Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleSettingsUpdate} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, email: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.sms}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, sms: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, push: e.target.checked}
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="sw">Kiswahili</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Settings'}
                </button>
              </form>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <form onSubmit={handlePaymentUpdate} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Payment Method</label>
                  <select
                    value={paymentDetails.preferredMethod}
                    onChange={(e) => setPaymentDetails({...paymentDetails, preferredMethod: e.target.value})}
                    className="input-field"
                  >
                    <option value="mpesa">M-Pesa</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="airtel">Airtel Money</option>
                  </select>
                </div>

                {paymentDetails.preferredMethod === 'bank' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={paymentDetails.bankName}
                        onChange={(e) => setPaymentDetails({...paymentDetails, bankName: e.target.value})}
                        className="input-field"
                        placeholder="e.g., KCB, Equity Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={paymentDetails.accountNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value})}
                        className="input-field"
                        placeholder="Account number"
                      />
                    </div>
                  </div>
                )}

                {paymentDetails.preferredMethod === 'mpesa' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Number</label>
                    <input
                      type="tel"
                      value={paymentDetails.mpesaNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, mpesaNumber: e.target.value})}
                      className="input-field"
                      placeholder="+254712345678"
                    />
                  </div>
                )}

                {paymentDetails.preferredMethod === 'airtel' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Airtel Money Number</label>
                    <input
                      type="tel"
                      value={paymentDetails.airtelNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, airtelNumber: e.target.value})}
                      className="input-field"
                      placeholder="+254712345678"
                    />
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900">Payment Security</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your payment information is encrypted and secure. We never store your full account details.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Payment Details'}
                </button>
              </form>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <form onSubmit={handleSettingsUpdate} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings({
                      ...settings,
                      privacy: {...settings.privacy, profileVisibility: e.target.value}
                    })}
                    className="input-field"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Data Sharing</p>
                    <p className="text-sm text-gray-600">Allow sharing of anonymized data for research</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => setSettings({
                        ...settings,
                        privacy: {...settings.privacy, dataSharing: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Privacy Settings'}
                </button>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <form onSubmit={handleSettingsUpdate} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactor}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: {...settings.security, twoFactor: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {...settings.security, sessionTimeout: parseInt(e.target.value)}
                    })}
                    className="input-field"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={240}>4 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Security Settings'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
