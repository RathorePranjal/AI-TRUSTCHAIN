import React from 'react'

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200">
    <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Our Comprehensive Features</h2>

      <section className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">AI Detection Engine: Multi-modal Analysis</h3>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">Our advanced AI engine performs originality analysis across various content types, identifying subtle indicators of AI generation.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎥"
            title="Video Analysis"
            description="Detects deepfakes, lip-sync inconsistencies, and synthetic video content."
          />
          <FeatureCard
            icon="🎤"
            title="Audio Analysis"
            description="Identifies voice cloning, robotic intonation, and synthetic speech patterns."
          />
          <FeatureCard
            icon="📝"
            title="Text Analysis"
            description="Screens for AI-generated essays, resumes, articles, and phishing attempts."
          />
          <FeatureCard
            icon="💻"
            title="Code Analysis"
            description="Recognizes GPT-like structures, absence of human-centric comments, and AI coding styles."
          />
          <FeatureCard
            icon="📄"
            title="Documents/Images Analysis"
            description="Uncovers metadata tampering, AI-generated textures, and digital manipulation."
          />
        </div>
      </section>

      <section className="mb-16 bg-gray-50 p-10 rounded-lg">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Blockchain Certification: Tamper-Proof Authenticity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>Our platform ensures the integrity of human-created content through cutting-edge blockchain technology. Verified files are cryptographically hashed and immutably stored on the blockchain, creating a permanent, transparent record of origin.</p>
            <p>Upon successful verification, AI-TrustChain issues a tamper-proof authenticity certificate. This digital notary service provides irrefutable proof for critical documents like resumes, academic papers, legal contracts, and creative works, safeguarding intellectual property and fostering unparalleled trust.</p>
            <p className="font-semibold text-indigo-600">Key Benefits:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-medium">Immutability:</span> Once certified, the record cannot be altered.</li>
              <li><span className="font-medium">Transparency:</span> All certifications are publicly verifiable.</li>
              <li><span className="font-medium">Global Recognition:</span> Blockchain-backed proof for worldwide acceptance.</li>
              <li><span className="font-medium">Enhanced Trust:</span> Build confidence in the authenticity of your digital assets.</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img src="/Blockchain Authenticity Certificate for Resume.png" alt="Blockchain Authenticity Certificate" className="max-w-full h-auto rounded-lg" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">AI-TrustChain's Unique Approach</h3>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">We address the critical gaps in current AI detection and content verification solutions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon="🌟"
            title="Multi-modal Integrated Detection"
            description="A single platform for comprehensive analysis across text, audio, video, documents, code, and images."
          />
          <FeatureCard
            icon="✅"
            title="Trusted & Certifiable Results"
            description="Beyond mere scores, we provide verifiable proof of authenticity with every detection."
          />
          <FeatureCard
            icon="🔒"
            title="Blockchain-Backed Authenticity Certificates"
            description="Tamper-proof validation, a digital stamp showing 'Verified By AI-TrustChain'."
          />
          <FeatureCard
            icon="📈"
            title="Real-World Applicability"
            description="Empowering recruiters, legal authorities, and enterprises to distinguish genuine human work from AI content."
          />
        </div>
      </section>
    </div>
  )
}
