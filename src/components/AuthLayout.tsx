import React from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        background: `
          linear-gradient(
            to bottom right,
            #006600 0%,
            #ffffff 30%,
            #ff0000 60%,
            #000000 100%
          ),
          url('/images/image2.jpeg')
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundBlendMode: 'overlay, normal'
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Image
            src="/images/NYOTA LOGO. 10.0. PNG.png"
            alt="Nyota Fund Project Logo"
            width={80}
            height={80}
            className="h-16 w-auto mx-auto mb-4 rounded-xl drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nyota Fund Project
          </h2>
          <p className="text-gray-600 text-sm">
            Empowering Kenyan Youth Through Innovation
          </p>
        </div>

        {/* Form Content */}
        {children}
      </div>
    </div>
  )
}
