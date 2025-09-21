'use client';

import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { ChevronDown } from 'lucide-react';
import { ToggleSwitch } from '@/components/ui';

// The component receives its own data and its index in the sections array
interface DonationButtonsSectionEditorProps {
  sectionData: {
    type: 'donationButtons';
    enabled: boolean;
    required: boolean;
    collapsed: boolean;
    props: {};
  };
  sectionIndex: number;
}

export function DonationButtonsSectionEditor({ sectionData, sectionIndex }: DonationButtonsSectionEditorProps) {
  // Get the 'updateSectionField' action from the central Zustand store
  const { updateSectionField } = useWebsiteEditorStore();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">Donation Buttons Section</h3>
              <p className="text-xs text-gray-500">Quick donation button options</p>
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
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No configuration options available yet.</p>
            <p className="text-gray-400 text-xs mt-1">This section can be extended with custom props in the future.</p>
          </div>
        </div>
      )}
    </div>
  );
}
