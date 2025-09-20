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
    <div className="flex space-x-4 text-sm">
      {status === "draft" ? (
        <button 
          className={`py-2 px-6 rounded-md text-white transition-all duration-200 ${
            isSaving 
              ? "bg-gray-500 cursor-not-allowed" 
              : "bg-blue-700 hover:bg-blue-500 cursor-pointer"
          }`}
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      ) : (
        <button 
          className={`py-2 px-6 rounded-md text-white transition-all duration-200 ${
            isPublishing || isSaving
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-500 cursor-pointer"
          }`}
          onClick={onDeactivate}
          disabled={isPublishing || isSaving}
        >
          Deactivate
        </button>
      )}
      <button 
        className={`py-2 px-6 rounded-md text-white transition-all duration-200 ${
          isPublishing || isSaving
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-500 cursor-pointer"
        }`}
        onClick={onPublish}
        disabled={isPublishing || isSaving}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default ActionButtons;
