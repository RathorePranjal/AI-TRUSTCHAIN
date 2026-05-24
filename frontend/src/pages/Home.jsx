import React from 'react'
import Hero from '../components/Hero'
import MovingBanner from '../components/MovingBanner'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <MovingBanner />
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-gray-800">100+</h3>
              <p className="text-gray-600">Documents already certified</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-gray-800">98%</h3>
              <p className="text-gray-600">Success rate*</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-gray-800">10+</h3>
              <p className="text-gray-600">Tools</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white text-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="md:flex justify-between items-center mb-12">
            <div className="md:w-1/2 text-left mb-8 md:mb-0">
              <h2 className="text-5xl font-extrabold mb-6">
                Blockchain Certification:<br/>Tamper-Proof Authenticity
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Our platform ensures the integrity of human-created content through
                cutting edge blockchain technology.
                <br/><br/>
                Verified files are cryptographically hashed and stored immutably on the
                blockchain, creating a permanent, transparent record of origin.
              </p>
              <Link to="/verify-certificate" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
                Check certificate authenticity
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center items-center relative">
              {/* Main certificate box */}
              <div className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-72 h-72 flex flex-col items-center justify-center text-center z-20">
                <p className="text-sm font-semibold text-gray-500 mb-2">BLOCKCHAIN AUTHENTICITY CERTIFICATE</p>
                <img src="/updated-certificate.png" alt="Updated Certificate" className="max-w-full h-auto mb-4" />
                <p className="text-sm text-gray-600">Resume.pdf</p>
                <p className="text-xs text-green-600 flex items-center mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Verified Human-Created</p>
                <div className="text-xs text-gray-500 mt-2">Certificate ID: 0x4a5f3...856ec232 <span className="ml-4">Issued On: 2024-05-27</span></div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Have Questions? Contact Us!</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">Our team is ready to assist you. Reach out to us for support, inquiries, or partnership opportunities.</p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
              Get in Touch
            </Link>
            <Link to="/about" className="bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
