"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  DonationHeaderSection,
  ButtonsSection,
  FundSelectionSection,
  PersonalInfoSection,
  DonationSummarySection,
  PaymentMethodSection,
  SubmitSection
} from "@/components/public/donationForm"

const DonationForm = ({ params }: { params: { slug: string } }) => {
  const [donationData, setDonationData] = useState({
    amount: 25,
    fund: 'General Fund',
    paymentMethod: '',
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    }
  })

  const handleAmountChange = (amount: number) => {
    setDonationData(prev => ({ ...prev, amount }))
  }

  const handleFundChange = (fund: string) => {
    setDonationData(prev => ({ ...prev, fund }))
  }

  const handlePaymentMethodChange = (method: string) => {
    setDonationData(prev => ({ ...prev, paymentMethod: method }))
  }

  const handleFormDataChange = (field: string, value: string) => {
    setDonationData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }))
  }

  const handleSubmit = () => {
    // Mock submission - in real app, this would process the donation
    console.log('Donation submitted:', donationData)
    // Navigate to thank you page
    window.location.href = `/campaign/${params.slug}/thank-you`
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="px-6 py-4">
        <Link 
          href={`/campaign/${params.slug}`}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Campaign</span>
        </Link>
      </div>

      {/* Content Container */}
      <div className="px-6 py-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <DonationHeaderSection />

          {/* Main Form */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-xl">
            {/* Donation Amount Section */}
            <ButtonsSection onAmountChange={handleAmountChange} />

            {/* Fund Selection */}
            <FundSelectionSection onFundChange={handleFundChange} />

            {/* Personal Information */}
            <PersonalInfoSection onFormDataChange={handleFormDataChange} />

            {/* Custom Questions Placeholder */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3 text-slate-800 text-base">
                Additional Questions
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium mb-1 text-sm text-slate-800">
                    Would you like to receive updates about our work?
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600">Yes, I'd like to receive updates</span>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm text-slate-800">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your response"
                    className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <DonationSummarySection 
              amount={donationData.amount} 
              fund={donationData.fund} 
            />

            {/* Payment Methods */}
            <PaymentMethodSection onPaymentMethodChange={handlePaymentMethodChange} />

            {/* Submit Section */}
            <SubmitSection onSubmit={handleSubmit} />
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-slate-500">
              By making a donation, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationForm