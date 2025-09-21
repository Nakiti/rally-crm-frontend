'use client';

import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { ChevronDown } from 'lucide-react';
import { CompactInput, CompactTextArea, ImageUploader, ToggleSwitch } from '@/components/ui';

// The component receives its own data and its index in the sections array
interface BannerSectionEditorProps {
  sectionData: {
    type: 'banner';
    enabled: boolean;
    required: boolean;
    collapsed: boolean;
    props: {
      headline?: string;
      message?: string;
      bannerImage?: string
    };
  };
  sectionIndex: number;
}

export function BannerSectionEditor({ sectionData, sectionIndex }: BannerSectionEditorProps) {
  // Get the 'updateSectionField' action from the central Zustand store
  const { updateSectionField } = useWebsiteEditorStore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">Banner Section</h3>
              <p className="text-xs text-gray-500">Alert banner with headline and message</p>
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
              label="Headline"
              value={sectionData.props.headline || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.headline', e.target.value)}
            />
            <CompactTextArea
              label="Message"
              value={sectionData.props.message || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.message', e.target.value)}
              rows={3}
            />
            <ImageUploader 
              label="Banner Image"
              currentImageUrl={sectionData.props.bannerImage}
              onUpload={(newUrl) => updateSectionField(sectionIndex, 'props.bannerImage', newUrl)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
