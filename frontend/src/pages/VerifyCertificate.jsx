import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID')
      return
    }

    setLoading(true)
    setError(null)
    setVerificationResult(null)

    try {
      const response = await axios.post(`${API_URL}/api/certificate/verify`, {
        id: certificateId
      })

      if (response.data.ok) {
        setVerificationResult(response.data)
      } else {
        setError(response.data.error || 'Verification failed')
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred during verification')
      console.error('Verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setCertificateId('')
    setVerificationResult(null)
    setError(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Verify Certificate</h1>
      <p className="text-gray-600 mb-8">Check the authenticity of your AI TrustChain certificate</p>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <div className="mb-6">
          <label htmlFor="certificateId" className="block text-lg font-medium text-gray-700 mb-2">
            Certificate ID
          </label>
          <input
            type="text"
            id="certificateId"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter your certificate ID here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleVerify}
            disabled={loading || !certificateId.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Certificate'}
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Clear
          </button>

          <button
            onClick={() => navigate('/analyse-file')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Analyze Content
          </button>
        </div>

        {verificationResult && (
          <div className={`mt-6 p-4 rounded-md ${verificationResult.valid ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className={`text-xl font-medium ${verificationResult.valid ? 'text-green-800' : 'text-red-800'} mb-2`}>
              {verificationResult.valid ? '✅ Certificate Valid' : '❌ Certificate Invalid'}
            </h3>
            
            {verificationResult.valid && verificationResult.cert && (
              <div className="text-gray-700">
                <p><strong>Subject:</strong> {verificationResult.cert.subject}</p>
                <p><strong>Classification:</strong> {verificationResult.cert.classification}</p>
                <p><strong>Timestamp:</strong> {new Date(verificationResult.cert.timestamp).toLocaleString()}</p>
                <p><strong>Certificate ID:</strong> {verificationResult.cert.id}</p>
                <p><strong>Transaction Hash:</strong> {verificationResult.cert.txHash}</p>
              </div>
            )}

            {!verificationResult.valid && (
              <p className="text-red-700">{verificationResult.error}</p>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 rounded-md">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
