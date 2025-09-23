"use client"
import { useContext, useState } from "react"

import { useCampaignEditorStore } from "@/stores/crm/useCampaignEditorStore"
import { useUpdateCampaignSettings } from "@/hooks/crm/useCampaign"
import { EditorLoadingSkeleton } from "@/components/ui/LoadingSkeleton"
import { Button, Checkbox, ErrorModal } from "@/components/ui"
import { useAuth } from "@/providers/AuthProvider"

const SettingsPage = () => {
    const { campaign, updateCampaignSetting, isDirty, markAsSaved } = useCampaignEditorStore();
    const { session: currentUser } = useAuth()
    const updateCampaignMutation = useUpdateCampaignSettings(campaign?.id || '');
    
    const handleSave = () => {
        if (campaign?.settings) {
        updateCampaignMutation.mutate(campaign.settings, {
            onSuccess: () => markAsSaved(),
        });
        }
    };

    if (!campaign) {
        return <EditorLoadingSkeleton />;
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-6">
            {updateCampaignMutation.isError && (
                <ErrorModal
                message={updateCampaignMutation.error.message}
                onClose={() => updateCampaignMutation.reset()}
                />
            )}
            <h1 className="text-4xl font-light text-gray-900 mb-4">Settings</h1>
            <h3 className="text-md text-gray-600 mb-10">Configure campaign settings</h3>
            

            <div className="space-y-6">
                <Checkbox
                title="Show Leaderboard"
                description="When enabled, the leaderboard will be shown on the campaign page"
                // Read the value directly from the nested settings object in the store
                checked={campaign.settings?.showLeaderboard || false}
                // The onChange handler calls the store's update action
                onChange={(isChecked) => updateCampaignSetting('showLeaderboard', isChecked)}
                />
                <Checkbox
                title="Allow Anonymous Donations"
                description="When enabled, donors can choose to make their donation anonymous on public pages"
                checked={campaign.settings?.allowAnonymousDonations || false}
                onChange={(isChecked) => updateCampaignSetting('allowAnonymousDonations', isChecked)}
                />
                <Checkbox
                title="Anonymize All Donations"
                description="When enabled, all donations will be anonymized on public pages"
                checked={campaign.settings?.anonymizeAllDonations || false}
                onChange={(isChecked) => updateCampaignSetting('anonymizeAllDonations', isChecked)}
                />
            </div>

            <div className="w-full flex flex-row mt-6">
                <Button
                    className="ml-auto w-40"
                    onClick={handleSave}
                    disabled={!isDirty || updateCampaignMutation.isPending}
                    loading={updateCampaignMutation.isPending}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default SettingsPage