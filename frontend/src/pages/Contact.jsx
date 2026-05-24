import React from 'react'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Contact Us</h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">We'd love to hear from you! Reach out to us through the methods below.</p>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200 space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6h.01M12 21h7a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7z" />
          </svg>
          <p className="text-lg text-gray-800">Email: support@aitrustchain.in</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          </svg>
          <p className="text-lg text-gray-800">Phone: +91 999888XXXX</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.602 2.397a7.5 7.5 0 00-10.604 0L6.5 3.25l-.293.293V18h11.586l.293-.293 1.045-1.045a7.5 7.5 0 000-10.604z" />
          </svg>
          <p className="text-lg text-gray-800">Address: New Delhi,INDIA</p>
        </div>
      </div>
    </div>
  )
}
