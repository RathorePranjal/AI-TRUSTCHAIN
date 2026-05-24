import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Certificates from './pages/Certificates'
import AnalyseFile from './pages/AnalyseFile'
import Report from './pages/Report'
import Certificate from './pages/Certificate'
import Hero from './components/Hero' // Keep Hero component for now
import Features from './pages/Features' // Import the new Features component
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import GetStarted from './pages/GetStarted'
import Contact from './pages/Contact' // This will be the NEW Contact.jsx
import VerifyCertificate from './pages/VerifyCertificate'

export default function App() {
  const [result, setResult] = useState(null)

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certs" element={<Certificates />} />
            <Route path="/analyse-file" element={<AnalyseFile />} />
            <Route path="/report" element={<Report />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} /> {/* Render Features component */}
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
