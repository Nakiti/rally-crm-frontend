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
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        {label} <span className="text-red-500 ml-1">*</span>
      </p>
      
      {currentImageUrl ? (
        <div className="relative w-full h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
          <img src={currentImageUrl} alt="Current image" className="h-full w-full object-cover rounded-lg" />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
          <div 
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 cursor-pointer flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2">
              <UploadCloud size={20} className="text-gray-600" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            disabled={isLoading}
          />
        </div>
      ) : (
        <label className="group relative w-full h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 cursor-pointer overflow-hidden">
          <div className="flex flex-col items-center justify-center text-center p-4">
            <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-600 group-hover:text-gray-700 font-medium">Click to upload an image</span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
          </div>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden" 
            accept="image/png, image/jpeg, image/gif"
            disabled={isLoading}
          />
        </label>
      )}
      
      {isLoading && (
        <div className="mt-2 text-sm text-gray-500">Uploading...</div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

