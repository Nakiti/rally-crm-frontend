"use client"
import { useGetCampaignById } from "@/hooks/crm/useCampaign";
import { CampaignHeaderBar } from "@/components/crm/CampaignHeaderBar";
import {use} from "react"
import { usePathname } from "next/navigation";

interface CampaignPageLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const CampaignPageLayout: React.FC<CampaignPageLayoutProps> = ({ children, params }) => {
    const campaignId = params.id
    const {isLoading, isError, error, data: campaign} = useGetCampaignById(campaignId)
    const pathname = usePathname()
    const isEditorRoute = pathname.includes('/editor')

    return (
        <div className="overflow-y-auto h-screen">
            {!isEditorRoute && <CampaignHeaderBar campaignType={"crowdfunding"} campaign={campaign} campaignId={campaignId}/>}
            {children}
        </div>
    )
}

export default CampaignPageLayout