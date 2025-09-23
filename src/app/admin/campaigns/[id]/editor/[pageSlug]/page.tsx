'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { ContentEditorForm } from '@/components/crm/editor/ContentEditorForm';
import { LivePreview } from '@/components/crm/editor/LivePreview';
import { useInitializeCampaignEditorStore } from '@/hooks/crm/useInitializeCampaignEditorStore';
import { campaignPageEditorConfig } from '@/config/campaignPageEditor.config';
import { TwoPanelLayout, EditorPanel, PreviewPanel } from '@/components/ui';

interface PageEditorProps {
  params: {
    id: string;
    pageSlug: string;
  };
}

export default function PageEditor({ params }: PageEditorProps) {
  const { id: campaignId, pageSlug } = params;
  const {isLoading, isError} = useInitializeCampaignEditorStore(campaignId, pageSlug)
  
  if (isLoading) return <p>Loading Editor...</p>;

  return (
    <TwoPanelLayout
      leftPanel={
        <EditorPanel title="Content Editor">
          <ContentEditorForm 
            useEditorStore={useCampaignEditorStore} 
            editorConfig={campaignPageEditorConfig}
          />
        </EditorPanel>
      }
      rightPanel={
        <PreviewPanel>
          <LivePreview useEditorStore={useCampaignEditorStore}/>
        </PreviewPanel>
      }
    />
  );
}