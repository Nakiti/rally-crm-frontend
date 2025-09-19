'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { Input, ImageUploader, ToggleSwitch } from '@/components/ui'; // Your shared UI components

// The component receives its own data and its index in the sections array
interface HeroSectionEditorProps {
  sectionData: {
    type: 'hero';
    enabled: boolean;
    props: {
      headline?: string;
      subheadline?: string;
      imageUrl?: string;
      buttonText?: string;
    };
  };
  sectionIndex: number;
}

export function HeroSectionEditor({ sectionData, sectionIndex }: HeroSectionEditorProps) {
  // Get the 'updateField' action from the central Zustand store
  const { updateField } = useCampaignEditorStore();

  // A helper function to create the correct, dynamic path for updating the store
  const getPath = (fieldName: string) => `sections.${sectionIndex}.props.${fieldName}`;
  const getEnabledPath = () => `sections.${sectionIndex}.enabled`;

  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Hero Section</h3>
        <ToggleSwitch
          label="Show Section"
          checked={sectionData.enabled}
          onChange={(isEnabled) => updateField(getEnabledPath(), isEnabled)}
        />
      </div>

      {/* Render the form fields only if the section is enabled */}
      {sectionData.enabled && (
        <>
          <Input
            label="Headline"
            value={sectionData.props.headline || ''}
            onChange={(e) => updateField(getPath('headline'), e.target.value)}
          />
          <Input
            label="Subheadline"
            value={sectionData.props.subheadline || ''}
            onChange={(e) => updateField(getPath('subheadline'), e.target.value)}
          />
          <Input
            label="Button Text"
            value={sectionData.props.buttonText || ''}
            onChange={(e) => updateField(getPath('buttonText'), e.target.value)}
          />
          <ImageUploader
            label="Background Image"
            currentImageUrl={sectionData.props.imageUrl}
            onUpload={(newUrl) => updateField(getPath('imageUrl'), newUrl)}
          />
        </>
      )}
    </div>
  );
}