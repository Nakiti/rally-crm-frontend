// /app/(crm)/campaigns/[id]/edit/pages/[pageSlug]/page.tsx
'use client';

import { useEffect } from 'react';
// import { useGetCampaignPageConfig } from '@/hooks/crm/useCampaigns';
import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { ContentEditorForm } from '@/components/crm/editor/ContentEditorForm';
import {LivePreview} from '@/components/crm/editor/LivePreview';
import { useGetCampaignPageConfig } from '@/hooks/crm/useCampaign';

export default function PageEditor({ params } : any) {
  // 1. Fetch the initial data from the backend
  const { data: initialConfig, isLoading } = useGetCampaignPageConfig(params.id, params.pageSlug);
  
  // 2. Get the 'initialize' action from the Zustand store
  const { initialize } = useCampaignEditorStore();

  // 3. When the data is fetched, load it into the store
  useEffect(() => {
    if (initialConfig) {
      initialize(initialConfig);
    }
  }, [initialConfig, initialize]);

  if (isLoading) return <p>Loading Editor...</p>;

  return (
    <div className="editor-layout">
      <ContentEditorForm />
      <LivePreview />
      {/* The Save button would also live here */}
    </div>
  );
}