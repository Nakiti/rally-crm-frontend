import React from 'react';
import { Trash } from 'lucide-react';
import type { Designation } from '@/lib/types';

interface ActiveDesignationsListProps {
  selectedDesignations: Designation[];
  onRemove: (designationId: string) => void;
}

export const ActiveDesignationsList: React.FC<ActiveDesignationsListProps> = ({
  selectedDesignations,
  onRemove
}) => {
  return (
    <>
      <div className="border-b border-gray-300 my-4"/>

      <div className="px-2 py-4">
        <h1 className="text-xl font-semibold mb-2">Active Designations</h1>
        <p className="text-sm text-gray-600 w-1/2 mb-4">
          These are the designations that users will be able to direct their donations towards for this campaign.
        </p>

        {selectedDesignations.length > 0 ? (
          selectedDesignations.map((item, index) => (
            <div key={index} className="w-full p-4 bg-gray-100 flex flex-row justify-between rounded-md mb-2">
              <p>{item.name}</p>
              <button 
                onClick={() => onRemove(item.id)} 
                className="text-gray-600 hover:text-red-500 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="w-full p-4 bg-gray-50 rounded-md text-center text-gray-500">
            <p>No designations selected yet. Choose designations from the list below.</p>
          </div>
        )}
      </div>
    </>
  );
};
