import React from 'react';
import type { Designation } from '@/lib/types';

interface DefaultDesignationSelectorProps {
  selectedDesignations: Designation[];
  currentDefaultId?: string | null;
  onDefaultChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DefaultDesignationSelector: React.FC<DefaultDesignationSelectorProps> = ({
  selectedDesignations,
  currentDefaultId,
  onDefaultChange
}) => {
  return (
    <>
      <div className="border-b border-gray-300 my-4"/>
      
      <div className="flex flex-row items-center py-4 w-full">
        <div className="flex flex-col w-1/3">
          <h1 className="text-xl font-semibold mb-2">Default <span className="text-red-500">*</span></h1>
          <p className="text-sm text-gray-600">Select the default designation that users will donate to.</p>
        </div>

        <div className="w-2/3 p-4">
          <select 
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentDefaultId || ''}
            name="defaultDesignation"
            onChange={onDefaultChange}
          >
            <option value="" disabled>Select an Option</option>
            {selectedDesignations.map((item) => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
