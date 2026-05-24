import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AnalyseFile() {
  const [activeTab, setActiveTab] = useState('text') // 'text' or 'file'
  const [text, setText] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleTextChange = (event) => {
    setText(event.target.value)
    setError(null)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    setError(null)
  }

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)

    try {
      let response
      if (activeTab === 'text') {
        if (!text.trim()) {
          setError('Please enter some text for analysis.')
          setLoading(false)
          return
        }
        response = await axios.post(`${API_URL}/api/analyze/text`, { text })
      } else {
        if (!selectedFile) {
          setError('Please select a file first.')
          setLoading(false)
          return
        }
        const formData = new FormData()
        formData.append('file', selectedFile)
        response = await axios.post(`${API_URL}/api/analyze/file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }

      console.log('Response from backend:', response.data); // Log the response
      if (response.data.ok) {
        // Mint certificate after successful analysis
        try {
          const mintResponse = await axios.post(`${API_URL}/api/certificate/mint-onchain`, {
            subject: activeTab === 'file' && selectedFile ? selectedFile.name : 'text-analysis.txt',
            analysisResult: response.data.result
          });
          if (mintResponse.data.ok) {
            // Navigate to report page with minted cert and analysis data
            navigate('/report', { state: { cert: mintResponse.data.cert, result: response.data.result } });
          } else {
            setError(mintResponse.data.error || 'Certificate minting failed.');
          }
        } catch (mintErr) {
          setError(mintErr.message || 'Certificate minting error.');
          console.error('Minting error:', mintErr);
        }
      } else {
        setError(response.data.error || 'Analysis failed.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.')
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">AI-TrustChain</h1>
      <p className="text-gray-600 mb-8">Verify human originality in the AI era.</p>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={`py-3 px-6 text-lg font-medium ${activeTab === 'text' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Analyze Text
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`py-3 px-6 text-lg font-medium ${activeTab === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Upload File
          </button>
        </div>

        {activeTab === 'text' && (
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Leveraging cutting-edge machine learning paradigms, this comprehensive analysis synthesizes multifaceted insights to deliver a scalable, data-driven solution that optimizes stakeholder outcomes."
            rows="10"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        )}

        {activeTab === 'file' && (
          <div className="flex flex-col items-center justify-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {selectedFile && !error && (
              <p className="text-gray-700 mt-2">Selected file: {selectedFile.name}</p>
            )}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || (activeTab === 'text' && !text.trim()) || (activeTab === 'file' && !selectedFile)}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? 'Analyzing...' : 'Check Authenticity'}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}
      </div>
    </div>
  )
}
