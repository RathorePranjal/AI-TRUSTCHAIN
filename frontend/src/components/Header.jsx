import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow relative z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-indigo-600">AI Trustchain</Link>
        <nav className="flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
          <Link to="/features" className="hover:text-indigo-600">Features</Link>
          <Link to="/services" className="hover:text-indigo-600">Services</Link>
          <Link to="/pricing" className="hover:text-indigo-600">Pricing</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          <Link to="/get-started" className="bg-gray-100 hover:bg-gray-200 text-indigo-600 border border-indigo-600 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">Get Started</Link>
          <Link to="/verify-certificate" className="hover:text-indigo-600">Verify Certificate</Link>
        </nav>
      </div>
    </header>
  )
}
