import React from 'react'
import { Link } from 'react-router-dom'

export default function GetStarted() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Ready to Get Started?</h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">Join AI-TrustChain today to preserve human originality and ensure content authenticity in the AI era. Choose your path below!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-indigo-600 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">For Individuals</h2>
          <p className="text-gray-700 mb-6">Verify your personal creations, academic work, and professional documents.</p>
          <Link to="/analyse-file" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
            Start Analyzing
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">For Enterprises</h2>
          <p className="text-gray-700 mb-6">Integrate our robust solutions for large-scale content verification and certification.</p>
          <Link to="/contact" className="bg-gray-100 text-indigo-600 hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
            Contact Sales
          </Link>
        </div>
      </div>

      <div className="mt-20 text-gray-600">
        <p>Have questions? Visit our <Link to="/about" className="text-indigo-600 hover:underline">About Us</Link> page or view our <Link to="/pricing" className="text-indigo-600 hover:underline">Pricing Plans</Link>.</p>
      </div>
    </div>
  )
}
