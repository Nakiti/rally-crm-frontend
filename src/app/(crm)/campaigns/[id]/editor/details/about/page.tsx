"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useGetCampaignById, useUpdateCampaign } from "@/hooks/crm/useCampaign"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import ErrorModal from "@/components/ui/ErrorModal"
import { EditorLoadingSkeleton } from "@/components/ui/LoadingSkeleton"
import { useCampaignEditorStore } from "@/stores/crm/useCampaignEditorStore"

const AboutPage = () => {
   const params = useParams()
   const campaignId = params.id as string
   const { data: initialCampaign, isLoading } = useGetCampaignById(campaignId)
   const updateCampaignMutation = useUpdateCampaign(campaignId)

   const {
    campaign,         // The current state of the campaign being edited
    initialize,       // The action to load the initial data into the store
    updateCampaignField, // The action to update a top-level field like 'title'
    isDirty,          // A boolean flag that tells us if there are unsaved changes
    markAsSaved,      // An action to reset the isDirty flag after a successful save
  } = useCampaignEditorStore();

  useEffect(() => {
    if (initialCampaign) {
      initialize(initialCampaign);
    }
  }, [initialCampaign, initialize]);

  const handleSave = () => {
    if (campaign) {
      updateCampaignMutation.mutate(campaign, {
        onSuccess: () => {
          markAsSaved();
        },
      });
    }
  };

   // Show loading state while data is being fetched
   if (isLoading || !campaign) {
      return <EditorLoadingSkeleton />
   }

   return (
      <div className="w-full max-w-4xl mx-auto py-8 px-6">
      {updateCampaignMutation.isError && (
        <ErrorModal
          message={updateCampaignMutation.error.message || "An error occurred"}
          onClose={() => updateCampaignMutation.reset()}
        />
      )}         <h1 className="text-4xl font-light text-gray-900 mb-4">About</h1>
         <h3 className="text-md text-gray-600 mb-10">Set up Campaign Details</h3>
         
         {/* Form Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            <Input 
               label="External Name" 
               name="externalName" 
               value={campaign.externalName || ''} 
               onChange={(e) => updateCampaignField('externalName', e.target.value)} 
               placeholder="Enter a Name" 
            />
            <Input 
               label="Internal Campaign Name" 
               value={campaign.internalName || ''} 
               onChange={(e) => updateCampaignField('internalName', e.target.value)} 
               placeholder="Enter Internal Name" 
            />
            <Input 
               label="Fundraising Goal" 
               value={campaign.goalAmount || 0} 
               onChange={(e) => updateCampaignField('goalAmount', Number(e.target.value))} 
               placeholder="Enter a Fundraising Goal" 
               type="number" 
               min="1" 
            />
            <Input 
               label="Short URL" 
               value={campaign.slug || ''} 
               onChange={(e) => updateCampaignField('slug', e.target.value)} 
               placeholder="Enter Short URL" 
            />
         </div>

         <div className="w-full flex flex-row mt-6">
         <Button 
            variant="primary"
            size="lg"
            className="ml-auto w-40"
            onClick={handleSave}
            // The button is now enabled based on the 'isDirty' flag from the central store.
            disabled={!isDirty || updateCampaignMutation.isPending}
            loading={updateCampaignMutation.isPending}
         >
            Save Changes
         </Button>
         </div>
      </div>
   )
}

export default AboutPage