"use client"
// import { useState, useEffect } from "react"
// import PreviewBar from "@/app/organization/[organizationId]/components/previewBar"
import { 
  ThankYouHeaderSection, 
  ThankYouSummarySection, 
  ThankYouActionsSection, 
  ThankYouInfoSection, 
  ThankYouFooterSection 
} from "@/components/public/campaign/thankYou"

const ThankYouPage = ({params}: {params: any}) => {
   // Mock data - replace service calls
   const mockDisplay = {
      headline: "Thank You!",
      description: "Your generous donation has been received and will make a real difference in our mission. We're grateful for your support and commitment to creating positive change in our community.",
      bg_color: '#f3f4f6',
      bg_image: null
   }

   const mockCampaignDetails = {
      external_name: 'Sample Campaign',
      status: 'active'
   }

   const mockDonationData = {
      amount: '$50.00',
      fund: 'General Fund',
      transactionId: 'TXN-123456',
      total: '$50.00',
      campaignName: 'Sample Campaign',
      transactionDate: new Date().toLocaleDateString()
   }

   const status = params.status
   const campaignId = params.campaignId
   const organizationId = params.organizationId

   return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
         {/* {status == "preview" && <PreviewBar organizationId={organizationId} campaignId={campaignId}/>} */}

         <div className="flex-1 flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden bg-white">
               {/* Header Section */}
               <ThankYouHeaderSection 
                  headline={mockDisplay.headline}
                  message={mockDisplay.description}
               />

               {/* Summary Section */}
               <div className="px-6">
                  <ThankYouSummarySection 
                     amount={mockDonationData.amount}
                     fund={mockDonationData.fund}
                     transactionId={mockDonationData.transactionId}
                     total={mockDonationData.total}
                     campaignName={mockDonationData.campaignName}
                     transactionDate={mockDonationData.transactionDate}
                  />

                  {/* Actions Section */}
                  <ThankYouActionsSection 
                     donateAgainText="Return to Campaign"
                     shareText="Share This Campaign"
                  />

                  {/* Info Section */}
                  <ThankYouInfoSection 
                     nextStepsText="You'll receive a confirmation email shortly. Your donation will be processed and you'll get updates on how your contribution is making a difference."
                     helpText="Questions or Comments?"
                     email="support@organization.com"
                     phone="(555) 123-4567"
                  />
               </div>
            </div>
         </div>

         {/* Footer */}
         <ThankYouFooterSection 
            organizationName={mockCampaignDetails.external_name}
         />
      </div>      
   )
}

export default ThankYouPage