"use client"
import { TwoPanelLayout, EditorPanel, PreviewPanel } from "@/components/ui";
import { ContentEditorForm } from "@/components/crm/editor/ContentEditorForm";
import { LivePreview } from "@/components/crm/editor/LivePreview";
import { useInitializeWebsiteEditorStore } from "@/hooks/crm/useInitializeWebisteEditorStore";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import { useWebsiteEditorStore } from "@/stores/crm/useWebsiteEditorStore";
import { websitePageEditorConfig } from "@/config/websitePageEditor.config";
import WebsiteEditorNavbar from "@/components/crm/WebsiteEditorNavbar/WebsiteEditorNavbar";
import { useUpdateOrganizationPageContentConfig, useGetOrganizationPageByType } from "@/hooks/crm/useOrganizationPage";

interface PageEditorProps {
  params: {
    pageSlug: string;
  };
}

export default function PageEditor({ params }: PageEditorProps) {
  const { pageSlug } = params;
  const { data: user } = useGetCurrentUser();
  const { isLoading, isError } = useInitializeWebsiteEditorStore(pageSlug);
  const { data: organizationPage } = useGetOrganizationPageByType(pageSlug);

  if (isLoading) return <p>Loading Editor...</p>;
  if (isError) return <p>Error loading editor...</p>;
  if (!user?.organizationId) return <p>No organization found...</p>;

  const navigationLinks = ["Elements", "Design"];

  return (
    <div>
      <WebsiteEditorNavbar 
        organizationId={user.organizationId}
        title={`${pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1)} Page Editor`}
        isPublished={organizationPage.isPublished}
        links={navigationLinks}
        pageSlug={pageSlug}
      />
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
            <LivePreview useEditorStore={useWebsiteEditorStore}/>
          </PreviewPanel>
        }
      />
    </div>
  );
}