import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function Report() {
  const location = useLocation()
  const navigate = useNavigate()
  const { result, cert } = location.state || {}
  const [certificate, setCertificate] = useState(cert || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // If no result, redirect to analyze page
  if (!result) {
    navigate('/analyse-file')
    return null
  }

  const handleMintCertificate = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const subject = cert?.subject || "AI Content Analysis Report"
      
      const response = await axios.post(`${API_URL}/api/certificate/mint-onchain`, {
        subject,
        analysisResult: result
      })
      
      if (response.data.ok) {
        setCertificate(response.data.cert)
      } else {
        setError(response.data.error || 'Failed to mint certificate.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while minting certificate.')
      console.error('Certificate minting error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "ai_analysis_report.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handlePrintCertificate = () => {
    if (certificate) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>AI TrustChain Certificate</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .certificate { border: 2px solid #000; padding: 30px; text-align: center; }
              .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
              .content { margin: 20px 0; }
              .id { font-family: monospace; background: #f0f0f0; padding: 10px; }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="header">AI TrustChain Certificate of Authenticity</div>
              <div class="content">
                <p><strong>Subject:</strong> ${certificate.subject}</p>
                <p><strong>Classification:</strong> ${certificate.classification}</p>
                <p><strong>Timestamp:</strong> ${new Date(certificate.timestamp).toLocaleString()}</p>
                <p><strong>Certificate ID:</strong></p>
                <p class="id">${certificate.id}</p>
                <p><strong>Transaction Hash:</strong></p>
                <p class="id">${certificate.txHash}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  // Updated logic to determine if content is AI-generated based on the new backend response
  const isAIContent = result.verdict === "AI-Likely" || (result.ai_probability && result.ai_probability > 0.5)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analysis Report</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Analysis</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Result</h3>
          <div className={`p-4 rounded-md ${isAIContent ? 'bg-red-100' : 'bg-green-100'}`}>
            <p className={`text-lg font-medium ${isAIContent ? 'text-red-800' : 'text-green-800'}`}>
              {isAIContent ? 'AI-Generated Content Detected' : 'Human-Generated Content Detected'}
            </p>
          </div>
        </div>
        
        {result.ai_probability !== undefined && (
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-700 mb-2">AI Probability</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${(result.ai_probability * 100).toFixed(2)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-gray-700">{(result.ai_probability * 100).toFixed(2)}% chance of being AI-generated</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4">
          {!certificate && (
            <button
              onClick={handleMintCertificate}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out disabled:opacity-50"
            >
              {loading ? 'Minting...' : 'Mint Certificate'}
            </button>
          )}
          
          {certificate && (
            <button
              onClick={handlePrintCertificate}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Print Certificate
            </button>
          )}
          
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Download Report
          </button>
          
          <button
            onClick={() => navigate('/analyse-file')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Analyze Another
          </button>
        </div>
        
        {certificate && (
          <div className="mt-6 p-4 bg-green-100 rounded-md">
            <h3 className="text-xl font-medium text-green-800 mb-2">Certificate Minted Successfully!</h3>
            <p className="text-green-700"><strong>Subject:</strong> {certificate.subject}</p>
            <p className="text-green-700"><strong>Classification:</strong> {certificate.classification}</p>
            <p className="text-green-700"><strong>Certificate ID:</strong> {certificate.id}</p>
            <p className="text-green-700"><strong>Transaction Hash:</strong> {certificate.txHash}</p>
            <p className="text-green-700"><strong>Timestamp:</strong> {new Date(certificate.timestamp).toLocaleString()}</p>
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
