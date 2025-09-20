import { TwoPanelLayout, EditorPanel, PreviewPanel } from "@/components/ui";
import { ContentEditorForm } from "@/components/crm/editor/ContentEditorForm";
import { LivePreview } from "@/components/crm/editor/LivePreview";
import { useInitializeWebsiteEditorStore } from "@/hooks/crm/useInitializeWebisteEditorStore";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import { useWebsiteEditorStore } from "@/stores/crm/useWebsiteEditorStore";
import { websitePageEditorConfig } from "@/config/websitePageEditor.config";

interface PageEditorProps {
  params: {
    pageSlug: string;
  };
}

export default function PageEditor({ params }: PageEditorProps) {
  const { pageSlug } = params;
  const {data: user} = useGetCurrentUser()
  const {isLoading, isError} = useInitializeWebsiteEditorStore(user?.organizationId, pageSlug)
  
  if (isLoading) return <p>Loading Editor...</p>;

  return (
    <TwoPanelLayout
      leftPanel={
        <EditorPanel title="Content Editor">
          <ContentEditorForm 
            useEditorStore={useWebsiteEditorStore} 
            editorConfig={websitePageEditorConfig}
          />
        </EditorPanel>
      }
      rightPanel={
        <PreviewPanel>
          <LivePreview />
        </PreviewPanel>
      }
    />
  );
}