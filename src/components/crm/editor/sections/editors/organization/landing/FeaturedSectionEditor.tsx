'use client';

import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { ChevronDown } from 'lucide-react';
import { CompactInput, CompactTextArea, ImageUploader, ToggleSwitch } from '@/components/ui';

// The component receives its own data and its index in the sections array
interface FeaturedSectionEditorProps {
  sectionData: {
    type: 'featured';
    enabled: boolean;
    required: boolean;
    collapsed: boolean;
    props: any;
  };
  sectionIndex: number;
}

export function FeaturedSectionEditor({ sectionData, sectionIndex }: FeaturedSectionEditorProps) {
  // Get the 'updateSectionField' action from the central Zustand store
  const { updateSectionField } = useWebsiteEditorStore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">Featured Section</h3>
              <p className="text-xs text-gray-500">Highlight featured content or campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!sectionData.required && (
              <ToggleSwitch
                label=""
                checked={sectionData.enabled}
                onChange={(isEnabled) => updateSectionField(sectionIndex, 'enabled', isEnabled)}
              />
            )}
            {sectionData.enabled && (
              <button
                onClick={() => updateSectionField(sectionIndex, 'collapsed', !sectionData.collapsed)}
                className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 group"
                aria-label={sectionData.collapsed ? 'Expand section' : 'Collapse section'}
              >
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 group-hover:text-gray-900 cursor-pointer ${sectionData.collapsed ? 'rotate-0' : 'rotate-180'}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {sectionData.enabled && !sectionData.collapsed && (
        <div className="p-4 space-y-4">
          <div className="grid gap-4">
            <CompactInput
              label="Headline One"
              value={sectionData.props.headlineOne || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.headlineOne', e.target.value)}
            />
            <CompactTextArea
              label="Description One"
              value={sectionData.props.descriptionOne || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.descriptionOne', e.target.value)}
            />
            <ImageUploader 
              label="Image One"
              currentImageUrl={sectionData.props.imageOne}
              onUpload={(newUrl) => updateSectionField(sectionIndex, 'props.imageOne', newUrl)}
            />
            <CompactInput
              label="Headline Two"
              value={sectionData.props.headlineTwo || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.headlineTwo', e.target.value)}
            />
            <CompactTextArea
              label="Description Two"
              value={sectionData.props.descriptionTwo || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.descriptionTwo', e.target.value)}
            />
            <ImageUploader 
              label="Image Two"
              currentImageUrl={sectionData.props.imageTwo}
              onUpload={(newUrl) => updateSectionField(sectionIndex, 'props.imageTwo', newUrl)}
            />
            <CompactInput
              label="Headline Three"
              value={sectionData.props.headlineThree || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.headlineThree', e.target.value)}
            />
            <CompactTextArea
              label="Description Three"
              value={sectionData.props.descriptionThree || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.descriptionThree', e.target.value)}
            />
            <ImageUploader 
              label="Image Two"
              currentImageUrl={sectionData.props.imageThree}
              onUpload={(newUrl) => updateSectionField(sectionIndex, 'props.imageThree', newUrl)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
