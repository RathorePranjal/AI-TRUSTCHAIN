import React from 'react'

const PricingCard = ({ title, price, description, features, buttonText, buttonLink, isPrimary }) => (
  <div className={`bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border ${isPrimary ? 'border-indigo-600' : 'border-gray-200'}`}>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <p className="text-5xl font-extrabold text-indigo-600 mb-6">{price}</p>
    <p className="text-gray-600 text-center mb-8 flex-grow">{description}</p>
    <ul className="list-none space-y-3 mb-10 text-left w-full">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <a
      href={buttonLink}
      className={`w-full text-center font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out ${isPrimary ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'}`}
    >
      {buttonText}
    </a>
  </div>
)

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Flexible Pricing Plans</h1>
      <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-16">Choose the plan that best fits your needs, from individual content creators to large enterprises requiring extensive verification and certification.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <PricingCard
          title="Free Trial"
          price="₹0"
          description="Experience basic AI detection and content verification."
          features={[
            "5 text analyses per month",
            "1 file upload per month",
            "Basic AI detection report",
            "Email support"
          ]}
          buttonText="Start Free"
          buttonLink="/get-started"
          isPrimary={false}
        />
        <PricingCard
          title="Pro Plan"
          price="₹2999/month"
          description="Ideal for content creators and small businesses needing more robust analysis."
          features={[
            "Unlimited text analyses",
            "50 file uploads per month",
            "Advanced AI detection report",
            "Blockchain certification (10 per month)",
            "Priority email support"
          ]}
          buttonText="Choose Pro"
          buttonLink="/get-started"
          isPrimary={true}
        />
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="Tailored solutions for large organizations with high-volume needs."
          features={[
            "Customizable analysis limits",
            "Dedicated API access",
            "Multi-modal deepfake detection",
            "Unlimited blockchain certifications",
            "24/7 Premium support & Account Manager"
          ]}
          buttonText="Contact Sales"
          buttonLink="/contact"
          isPrimary={false}
        />
      </div>

      <div className="mt-20 text-center text-gray-600">
        <p>* All plans include access to our latest AI detection models and regular updates.</p>
      </div>
    </div>
  )
}
