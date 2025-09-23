"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { HeroSection } from "@/components/public/organization/campaign/landingPage/HeroSection"
import { StorySection } from "@/components/public/organization/campaign/landingPage/StorySection"
import { ProgressSection } from "@/components/public/organization/campaign/landingPage/ProgressSection"
import { LeaderBoard } from "@/components/public/organization/campaign/landingPage/LeaderBoard"
import { Sidebar } from "@/components/public/organization/campaign/landingPage/Sidebar"
// import PreviewBar from "@/app/organization/[organizationId]/components/previewBar"

interface CampaignDetails {
  status: string;
  goal: number;
  id: string | undefined;
}

interface DisplayData {
  headline?: string;
  description?: string;
  mainHeadline?: string;
  mainText?: string;
  donate_button_text?: string;
  share_button_text?: string;
  subtitle?: string;
  show_progress?: boolean;
  show_donor_count?: boolean;
  show_days_left?: boolean;
  show_amount_grid?: boolean;
  days_left?: number;
  footer_text?: string;
  privacy_policy_url?: string;
  terms_of_service_url?: string;
  bg_color?: string;
  bg_image?: string | null;
  p_color?: string;
  s_color?: string;
  b1_color?: string;
  b2_color?: string;
  bt_color?: string;
  buttonRadius?: number;
  buttonTextSize?: number;
  heroTitleSize?: number;
  heroSubtitleSize?: number;
  sectionTitleSize?: number;
  bodyTextSize?: number;
  cardTitleSize?: number;
  cardRadius?: number;
  sectionPadding?: number;
  overlayOpacity?: number;
  heroHeight?: number;
  button1?: string;
  button2?: string;
  button3?: string;
  button4?: string;
  button5?: string;
  button6?: string;
  banner_image?: string;
}

interface PageParams {
  status?: string;
  campaignId?: string;
  organizationId?: string;
}

const DonationLandingPage = ({params}: {params: PageParams}) => {
   const [display, setDisplay] = useState<DisplayData | null>(null)
   const [designations, setDesignations] = useState<any>(null)
   const [campaignDetails, setCampaignDetails] = useState<CampaignDetails | null>(null)
   const [amountRaised, setAmountRaised] = useState(0)
   const [donorCount, setDonorCount] = useState(0)
   const router = useRouter()
   const parameters = useParams()

   const status = params.status
   const campaignId = params.campaignId
   const organizationId = params.organizationId

   useEffect(() => {
      // Mock data for demonstration - replace with actual API calls
      const mockCampaignDetails = {
         status: "active",
         goal: 10000,
         id: campaignId
      }
      
      const mockDisplay = {
         headline: "Support Our Cause",
         description: "Your support makes a real difference in our community. Every donation, no matter the size, helps us achieve our mission and create positive change for those who need it most.",
         mainHeadline: "Making a Difference Together",
         mainText: "Our organization works tirelessly to create positive change in the community. Through innovative programs and dedicated volunteers, we're building a better future for everyone.",
         donate_button_text: "Donate Now",
         share_button_text: "Share",
         subtitle: "Fundraiser",
         show_progress: true,
         show_donor_count: true,
         show_days_left: true,
         show_amount_grid: true,
         days_left: 23,
         footer_text: "Your Organization",
         privacy_policy_url: "#",
         terms_of_service_url: "#",

         button1: "25",
         button2: "50", 
         button3: "100",
         button4: "250",
         button5: "500",
         button6: "1000"
      }

      setCampaignDetails(mockCampaignDetails)
      setDisplay(mockDisplay)
      setAmountRaised(2450)
      setDonorCount(89)
   }, [])

   // Calculate progress percentage
   const progressPercentage = campaignDetails?.goal ? Math.min((amountRaised / campaignDetails.goal) * 100, 100) : 0

   return (
      <div className="w-full mb-4 overflow-y-auto bg-white">
         {/* {status == "preview" && <PreviewBar organizationId={organizationId} campaignId={campaignId}/>} */}
         {display && (
            <div className="flex flex-col h-full">
               {/* Hero section at the top */}
               <HeroSection
                  headline={display.headline}
                  description={display.description}
                  imageUrl={display.banner_image}
                  donateButtonText={display.donate_button_text}
                  shareButtonText={display.share_button_text}
                  organizationId={organizationId}
                  campaignId={campaignId}
                  status={status}
               />
               
               <div className="flex flex-1">
                  {/* Left side: Story, Progress and Leaderboard stacked vertically */}
                  <div className="flex-1 flex flex-col">
                     <StorySection
                        title={display.subtitle}
                        mainHeadline={display.mainHeadline}
                        mainText={display.mainText}
                        shareButtonText={display.share_button_text}
                     />
                     
                     <div className="px-4 py-20">
                        <ProgressSection
                           progressData={{
                              raised: amountRaised,
                              goal: campaignDetails?.goal || 0,
                              donations: 127,
                              uniqueDonors: donorCount,
                              averageDonation: 27.53,
                              daysLeft: display.days_left || 23
                           }}
                           showProgress={display.show_progress}
                           showDonorCount={display.show_donor_count}
                           showDaysLeft={display.show_days_left}
                        />

                        {/* Leaderboard */}
                        <LeaderBoard />
                     </div>
                  </div>
                  
                  {/* Right side: Sidebar */}
                  <div className="w-80 px-4 py-20">
                     <Sidebar
                        title="Choose Your Amount"
                        donationAmounts={[display.button1, display.button2, display.button3, display.button4, display.button5, display.button6].filter(Boolean) as string[]}
                        donateButtonText={display.donate_button_text}
                        addToCartButtonText="Add to Cart"
                        showAmountGrid={display.show_amount_grid}
                        organizationId={organizationId}
                        campaignId={campaignId}
                        status={status}
                     />
                  </div>
               </div>

               {/* Footer */}
               <div className="border-t border-gray-200 py-8 px-4 text-center">
                  <p className="text-sm text-gray-500">
                     {display.footer_text || "Your Organization"}
                  </p>
                  <div className="flex justify-center space-x-4 mt-2">
                     <a 
                        href={display.privacy_policy_url || "#"}
                        className="text-xs hover:underline text-gray-500"
                     >
                        Privacy Policy
                     </a>
                     <a 
                        href={display.terms_of_service_url || "#"}
                        className="text-xs hover:underline text-gray-500"
                     >
                        Terms of Service
                     </a>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default DonationLandingPage