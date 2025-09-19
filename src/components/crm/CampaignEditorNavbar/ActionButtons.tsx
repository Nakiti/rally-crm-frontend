import React from 'react';

interface ActionButtonsProps {
  status?: string;
  hasUnsavedChanges: boolean;
  isPublishing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onPublish: () => void;
  onDeactivate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  hasUnsavedChanges,
  isPublishing,
  isSaving,
  onSave,
  onPublish,
  onDeactivate,
}) => {
  return (
    <div className="flex space-x-6 text-md">
      {status === "inactive" ? (
        <button 
          className={`py-3 px-8 rounded-md text-white transition-all duration-200 ${
            hasUnsavedChanges ? "bg-blue-700 hover:bg-blue-500" : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={onSave}
          disabled={!hasUnsavedChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save & Exit"}
        </button>
      ) : (
        <button 
          className="bg-blue-700 hover:bg-blue-500 py-3 px-8 rounded-md text-white transition-all duration-200"
          onClick={onDeactivate}
          disabled={isPublishing || isSaving}
        >
          Deactivate
        </button>
      )}
      <button 
        className="py-3 px-8 rounded-md text-white transition-all duration-200 bg-blue-700 hover:bg-blue-500"
        onClick={onPublish}
        disabled={isPublishing || isSaving}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default ActionButtons;
