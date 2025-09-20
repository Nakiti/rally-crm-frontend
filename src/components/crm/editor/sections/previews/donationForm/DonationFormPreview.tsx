import React from 'react';
import { ButtonsSectionPreview } from './ButtonsSectionPreview';
import { DonationHeaderSectionPreview } from './DonationHeaderSectionPreview';
import { FundSelectionSectionPreview } from './FundSelectionSectionPreview';
import { PersonalInfoSectionPreview } from './PersonalInfoSectionPreview';
import { DonationSummarySectionPreview } from './DonationSummarySectionPreview';
import { PaymentMethodSectionPreview } from './PaymentMethodSectionPreview';
import { SubmitSectionPreview } from './SubmitSectionPreview';


export function DonationFormPreview({pageSections}) {
  const donationHeaderSection = pageSections.find(s => s.type === 'donationHeader' && s.enabled)
  const buttonsSection = pageSections.find(s => s.type === 'donationButtons' && s.enabled)

  return (
    <div 
      className={`w-full `}
    >
      {/* Content Container */}
      <div>
        <div className={`max-w-xl mx-auto px-4 py-8 `}>
           {donationHeaderSection && <DonationHeaderSectionPreview {...donationHeaderSection.props} />}

          {/* Main Form */}
          <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-xl">
            {/* Donation Amount Section */}
            {buttonsSection && <ButtonsSectionPreview {...buttonsSection.props}/>}

            {/* Fund Selection */}
            <FundSelectionSectionPreview />

            {/* Personal Information */}
            <PersonalInfoSectionPreview />

            {/* Custom Questions */}
            <h2 className="font-semibold mt-3 mb-6 text-center text-slate-800 text-base">
              Custom Questions Will Be Shown Here
            </h2>

            {/* Summary */}
            <DonationSummarySectionPreview />

            {/* Payment Methods */}
            <PaymentMethodSectionPreview />

            {/* Submit Section */}
            <SubmitSectionPreview />
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
  );
}