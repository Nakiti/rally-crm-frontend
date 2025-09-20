'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useParams } from 'next/navigation';
import { CompactInput, ImageUploader, ToggleSwitch } from '@/components/ui'; // Your shared UI components

// The component receives its own data and its index in the sections array
interface ButtonsSectionEditorProps {
  sectionData: {
    type: 'donationButtons';
    enabled: boolean;
    required: boolean;
    collapsed: boolean;
    props: {
      buttonOne?: string;
      buttonTwo?: string;
      buttonThree?: string;
      buttonFour?: string;
      buttonFive?: string;
      buttonSix?: string;
    };
  };
  sectionIndex: number;
}

export function ButtonsSectionEditor({ sectionData, sectionIndex }: ButtonsSectionEditorProps) {
  // Get the 'updatePageSectionField' action from the central Zustand store
  const { updatePageSectionField } = useCampaignEditorStore();
  
  // We need to get the current page slug from the URL params
  const params = useParams();
  const pageSlug = params.pageSlug as string;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">Buttons Section</h3>
              <p className="text-xs text-gray-500">Preset donation button options</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!sectionData.required && (
              <ToggleSwitch
                label=""
                checked={sectionData.enabled}
                onChange={(isEnabled) => updatePageSectionField(pageSlug, sectionIndex, 'enabled', isEnabled)}
              />
            )}
            {sectionData.enabled && (
              <button
                onClick={() => updatePageSectionField(pageSlug, sectionIndex, 'collapsed', !sectionData.collapsed)}
                className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 group"
                aria-label={sectionData.collapsed ? 'Expand section' : 'Collapse section'}
              >
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 group-hover:text-gray-900 ${sectionData.collapsed ? 'rotate-0' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
              label="Button One"
              value={sectionData.props.buttonOne || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonOne', e.target.value)}
            />
            <CompactInput
              label="Button Two"
              value={sectionData.props.buttonTwo || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonTwo', e.target.value)}
            />
            <CompactInput
              label="Button Three"
              value={sectionData.props.buttonThree || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonThree', e.target.value)}
            /> 
            <CompactInput
              label="Button Four"
              value={sectionData.props.buttonFour || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonFour', e.target.value)}
            />            
            <CompactInput
              label="Button Five"
              value={sectionData.props.buttonFive || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonFive', e.target.value)}
            />
            <CompactInput
              label="Button Six"
              value={sectionData.props.buttonSix || ''}
              onChange={(e) => updatePageSectionField(pageSlug, sectionIndex, 'props.buttonSix', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}