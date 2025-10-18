'use client';
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Users, GraduationCap, DollarSign, Lightbulb, ShieldCheck, X } from 'lucide-react'

export default function HomePage() {
  const [showEligibility, setShowEligibility] = useState(false)
  return (
    <div className="min-h-screen">
      {/* Full-Height Background Image with Content */}
      <section
        className="bg-cover bg-center h-screen relative flex flex-col"
        style={{ backgroundImage: "url('/images/image1.webp')" }}
      >
        {/* Navigation Bar with Logo */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative z-20">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/NYOTA LOGO. 10.0. PNG.png"
              alt="Nyota Logo"
              width={40}
              height={40}
              className="h-10 w-auto rounded-lg"
            />
            <h1 className="text-xl font-bold text-green-600">National Youth Opportunities Towards Advancement</h1>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-md bg-primary-600 text-white font-semibold hover:bg-green-500 transition duration-300 shadow-sm text-sm"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 rounded-md border border-primary-600 text-primary-600 font-semibold hover:bg-primary-600 hover:text-white transition duration-300 shadow-sm text-sm"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Content Overlaid on Background */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8 drop-shadow-lg leading-tight">
              <span className="text-green-500">Empowering Kenyan Youth</span>
              <span className="text-red-700 block mt-2">Through Innovation</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-10 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              Join thousands of young Kenyans in accessing training, savings programs, 
              and entrepreneurship opportunities through the Nyota Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/register" className="btn-primary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 flex items-center justify-center bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold">
                Get Started
                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="https://nyotaproject.go.ke/project-overview" target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-lg font-semibold">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Translucent Background */}
      <section className="bg-[rgba(0,100,0,0.05)] py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Our Platform Features
          </h2>
          
          {/* Responsive 4 Cards Grid */}
          <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
            <div className="w-full sm:w-1/2 md:w-1/4 flex-shrink-0">
              <div className="card text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">Training & Certification</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Access sector-specific training programs with milestone-based stipend disbursement
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 flex-shrink-0">
              <div className="card text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-5 h-5 text-success-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">Savings & Stipend</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Build financial discipline with mandatory 12% savings during entrepreneurship phase
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 flex-shrink-0">
              <div className="card text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-5 h-5 text-warning-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">Entrepreneurship</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Submit business ideas, take aptitude tests, and access grant funding
                </p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 flex-shrink-0">
              <div className="card text-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">Market Access</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Showcase your products and services to local and global markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Check Eligibility Section */}
      <section className="bg-[rgba(255,0,0,0.05)] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Check if you meet the eligibility criteria for the NYOTA Platform program
          </p>
          <button
            onClick={() => setShowEligibility(true)}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-green-500 transition duration-300 shadow-lg hover:shadow-xl"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Check Eligibility
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/images/NYOTA LOGO. 10.0. PNG.png"
                alt="Nyota Platform Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h2 className="ml-3 text-xl sm:text-2xl font-bold">Nyota Fund Project</h2>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Empowering Kenyan youth through training, savings, and entrepreneurship
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2024 Nyota Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Eligibility Overlay */}
      {showEligibility && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowEligibility(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Eligibility Criteria</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Age Requirement</h3>
                  <p className="text-gray-600 text-sm">Between 18-29 years old (up to 35 for special cases)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Education Level</h3>
                  <p className="text-gray-600 text-sm">Maximum Form 4 education qualification</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Citizenship</h3>
                  <p className="text-gray-600 text-sm">Must be a verified Kenyan citizen with valid ID</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">Priority Groups</h4>
              <div className="flex flex-col space-y-1 text-sm text-green-700">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  PWD Priority (5% allocation)
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Refugee Camp Support
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Rural Youth Focus
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEligibility(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
              >
                Close
              </button>
              <Link
                href="/register"
                onClick={() => setShowEligibility(false)}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-500 transition duration-200 text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}