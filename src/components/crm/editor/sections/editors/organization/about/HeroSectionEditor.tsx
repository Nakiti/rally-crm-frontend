'use client';

import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { ChevronDown } from 'lucide-react';
import { CompactInput, CompactTextArea, ToggleSwitch } from '@/components/ui';

// The component receives its own data and its index in the sections array
interface HeroSectionEditorProps {
  sectionData: {
    type: 'hero';
    enabled: boolean;
    required: boolean;
    collapsed: boolean;
    props: {
      headline?: string;
      buttonText?: string;
    };
  };
  sectionIndex: number;
}

export function HeroSectionEditor({ sectionData, sectionIndex }: HeroSectionEditorProps) {
  // Get the 'updateSectionField' action from the central Zustand store
  const { updateSectionField } = useWebsiteEditorStore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">Hero Section</h3>
              <p className="text-xs text-gray-500">Main banner with headline and call-to-action</p>
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
              label="Description"
              value={sectionData.props.description || ''}
              onChange={(e) => updateSectionField(sectionIndex, 'props.description', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
