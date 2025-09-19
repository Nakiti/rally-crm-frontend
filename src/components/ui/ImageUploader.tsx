'use client';

import React, { useState, useRef } from 'react';
import { useGenerateSasUrlMutation } from '@/hooks/crm/useUploadApi';
import { UploadCloud, X } from 'lucide-react'; // Using lucide-react for icons
import { Button } from './Button';

export interface ImageUploaderProps {
  label: string;
  currentImageUrl?: string | null;
  onUpload: (newUrl: string) => void;
  onRemove?: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, currentImageUrl, onUpload, onRemove }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generateSasUrlMutation = useGenerateSasUrlMutation();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // 1. Get the secure upload URL from our backend
    generateSasUrlMutation.mutate({ fileName: file.name, fileType: file.type }, {
      onSuccess: async (data) => {
        try {
          // 2. Upload the file directly to Azure Blob Storage using the SAS URL
          const uploadResponse = await fetch(data.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'x-ms-blob-type': 'BlockBlob',
              'Content-Type': file.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error('File upload failed.');
          }

          // 3. On success, call the parent component's onUpload with the permanent URL
          onUpload(data.accessUrl);
        } catch (uploadError) {
          setError('Failed to upload image. Please try again.');
        }
      },
      onError: () => {
        setError('Could not prepare upload. Please try again.');
      },
    });
  };

  const isLoading = generateSasUrlMutation.isPending;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex items-center space-x-4">
        {currentImageUrl ? (
          <div className="relative">
            <img src={currentImageUrl} alt="Current image" className="h-24 w-24 rounded-md object-cover" />
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-24 w-24 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
          >
            <UploadCloud size={32} />
          </div>
        )}

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            loading={isLoading}
          >
            {currentImageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

