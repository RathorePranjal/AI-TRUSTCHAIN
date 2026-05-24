import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            More than an AI detector.<br/>Preserve <span className="text-green-600">what's human.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AI is an innovation that will upscale industries and accelerate progress. But, at the same
            time it is essential to preserve and recognize human creativity, originality,
            and intelligence.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link to="/analyse-file" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out">
              Detect AI
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center h-64 border-2 border-gray-300 bg-white rounded-lg p-4">
          <img src="/image.png" alt="Hero Image" className="max-w-full h-full object-contain" />
        </div>
      </div>
    </section>
  )
}
