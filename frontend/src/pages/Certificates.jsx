import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Certificates() {
  const location = useLocation()
  const { result } = location.state || {}

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Certificates & Reports</h1>

      {result ? (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto mb-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Analysis Report</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-xl font-semibold">
              {result.isHuman ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <span>{result.isHuman ? 'Human-made content' : 'AI-generated content'}</span>
            </div>

            {result.certificateId && (
              <div className="flex items-center justify-center space-x-2 text-lg text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-2 4h4v-4l-1-1h-2l-1 1zm0 0h-4v-4l-1-1H3l-1-1V5h18v10h-4l-1 1h-2l-1-1zm-2 0V5h-4v10h4z" />
                </svg>
                <span>Certificate: {result.certificateId}</span>
              </div>
            )}

            {/* Display more details from result if available */}
            {result.details && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Details:</h3>
                <pre className="whitespace-pre-wrap text-gray-700 text-sm">{JSON.stringify(result.details, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">No recent analysis report available. Please perform an analysis first.</p>
      )}

      {/* Placeholder for listing actual certificates */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Certified Documents</h2>
        <div className="text-center text-gray-600">
          <p>No certificates found. Certify your human-made content to see it here.</p>
        </div>
      </section>
    </div>
  )
}
