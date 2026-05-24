import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Certificate() {
  const location = useLocation()
  const cert = location.state?.cert

  if (!cert) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Certificate Not Found</h1>
        <p className="text-gray-600">No certificate data available.</p>
        <Link to="/" className="mt-4 text-indigo-600 hover:underline">Go back to Home</Link>
      </div>
    )
  }

  const { subject, classification, id, timestamp, txHash, fileType } = cert
  const shortId = id ? id.slice(0, 6) + '...' + id.slice(-6) : 'N/A'
  const issueDate = new Date(timestamp).toLocaleDateString()

  const etherscanUrl = process.env.REACT_APP_ETHERSCAN_URL || 'https://etherscan.io/tx/'

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center bg-yellow-50 rounded-lg shadow-lg max-w-md">
      <div className="border-4 border-blue-700 rounded-lg p-6 w-full text-center">
        <div className="mb-4">
          <img
            src="/Blockchain Authenticity Certificate for Resume.png"
            alt="Blockchain Authenticity Certificate"
            className="mx-auto mb-4 w-24 h-24"
          />
          <h1 className="text-2xl font-bold mb-2">BLOCKCHAIN AUTHENTICITY CERTIFICATE</h1>
        </div>
        <div className="mb-4">
          <a
            href="#"
            className="text-xl font-semibold text-blue-800 underline"
            title={subject}
          >
            {subject}
          </a>
          <p className="text-lg mt-2">{classification}</p>
        </div>
        <div className="text-left text-sm text-gray-700">
          <p>
            <strong>Certificate ID:</strong>{' '}
            <a
              href={`${etherscanUrl}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {shortId}
            </a>
          </p>
          <p><strong>Issued On:</strong> {issueDate}</p>
          <p><strong>File Type:</strong> {fileType}</p>
        </div>
      </div>
      <Link to="/" className="mt-6 text-indigo-600 hover:underline">Back to Home</Link>
    </div>
  )
}
