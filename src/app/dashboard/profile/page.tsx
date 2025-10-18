'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  Camera,
  Save,
  Edit,
  Check,
  X
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useUser } from '@/contexts/UserContext'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumber: string
  dateOfBirth: string
  gender: string
  residence: string
  address: string
  kraPin: string
  isPwd: boolean
  guardianName?: string
  guardianPhone?: string
  guardianRelationship?: string
  profileImage?: string
}

export default function ProfilePage() {
  const { user, updateProfile, updateProfileImage } = useUser()
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+254712345678',
    idNumber: user?.idNumber || '12345678',
    dateOfBirth: '1995-06-15',
    gender: 'Male',
    residence: user?.residence || 'Nairobi',
    address: user?.address || 'Nairobi, Nairobi County',
    kraPin: user?.kraPin || 'A123456789K',
    isPwd: user?.isPwd || false,
    guardianName: 'Jane Doe',
    guardianPhone: '+254723456789',
    guardianRelationship: 'Parent'
  })

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Update user context
      updateProfile(profile)
      if (profileImage) {
        updateProfileImage(profileImage)
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    // Reset any unsaved changes
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

  const updateProfileField = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and account details</p>
        </div>
        <div className="flex space-x-3">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Saving...' : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="btn-primary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {editing && (
                  <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-600">{profile.email}</p>
              
              {profile.isPwd && (
                <span className="inline-block mt-2 px-3 py-1 bg-accent-100 text-accent-800 text-sm rounded-full">
                  PWD Priority
                </span>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                <span>ID: {profile.idNumber}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.dateOfBirth}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.residence}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => updateProfileField('firstName', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => updateProfileField('lastName', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfileField('email', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => updateProfileField('phone', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => updateProfileField('gender', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => updateProfileField('dateOfBirth', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residence</label>
                  <input
                    type="text"
                    value={profile.residence}
                    onChange={(e) => updateProfileField('residence', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => updateProfileField('address', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    KRA PIN
                    <span className="text-xs text-green-600 ml-1">(Verified)</span>
                  </label>
                  <input
                    type="text"
                    value={profile.kraPin}
                    disabled={true}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Verified government data cannot be edited</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PWD Status
                    <span className="text-xs text-green-600 ml-1">(Verified)</span>
                  </label>
                  <select
                    value={profile.isPwd ? 'Yes' : 'No'}
                    disabled={true}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Verified government data cannot be edited</p>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                  <input
                    type="text"
                    value={profile.guardianName || ''}
                    onChange={(e) => updateProfileField('guardianName', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                  <input
                    type="tel"
                    value={profile.guardianPhone || ''}
                    onChange={(e) => updateProfileField('guardianPhone', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select
                    value={profile.guardianRelationship || ''}
                    onChange={(e) => updateProfileField('guardianRelationship', e.target.value)}
                    disabled={!editing}
                    className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
