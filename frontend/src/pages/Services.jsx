import React from 'react'

const ServiceCard = ({ icon, title, description, features }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 h-full flex flex-col">
    <div className="text-5xl text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <ul className="list-none space-y-2 text-left mx-auto max-w-xs">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
)

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Our Services</h1>
      <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-16">AI-TrustChain offers a suite of services designed to ensure authenticity and integrity across various digital content formats for individuals and enterprises.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ServiceCard
          icon="✍️"
          title="Content Verification"
          description="Comprehensive analysis for a wide range of content types to detect AI-generated elements and provide authenticity reports."
          features={[
            "Textual content analysis (essays, articles)",
            "Code originality detection",
            "Document and image authenticity checks"
          ]}
        />
        <ServiceCard
          icon="🎬"
          title="Multi-modal Deepfake Detection"
          description="Specialized services for verifying the authenticity of audio and video content against deepfake and synthetic manipulations."
          features={[
            "Video deepfake and lip-sync mismatch detection",
            "Audio voice cloning and synthetic speech identification",
            "Real-time and batch processing options"
          ]}
        />
        <ServiceCard
          icon="📜"
          title="Blockchain Certification"
          description="Issue immutable, tamper-proof blockchain certificates for verified human-created content, serving as a digital notary."
          features={[
            "Permanent record of content origin",
            "Globally verifiable authenticity certificates",
            "Enhanced trust for legal, academic, and creative works"
          ]}
        />
        <ServiceCard
          icon="💼"
          title="Enterprise Solutions"
          description="Customizable solutions for businesses to integrate AI-TrustChain's detection and certification capabilities into their workflows."
          features={[
            "API access for seamless integration",
            "Bulk content processing",
            "Dedicated support and compliance features"
          ]}
        />
        <ServiceCard
          icon="🎓"
          title="Academic Integrity"
          description="Tools for educational institutions to uphold academic honesty by detecting AI-generated submissions."
          features={[
            "Plagiarism and AI content detection for essays",
            "Automated submission analysis",
            "Integration with learning management systems (LMS)"
          ]}
        />
        <ServiceCard
          icon="🔎"
          title="Forensic Analysis"
          description="In-depth investigative services for suspicious digital content, providing expert reports for legal and investigative purposes."
          features={[
            "Detailed origin reports",
            "Expert witness support",
            "Advanced metadata and artifact analysis"
          ]}
        />
      </div>
    </div>
  )
}
