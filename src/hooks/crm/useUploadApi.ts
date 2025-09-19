'use client';

import { useMutation } from '@tanstack/react-query';
import apiClient from '../../lib/apiClient'; // Your configured Axios instance

// Define the shape of the data the backend will return
interface SasUrlResponse {
  uploadUrl: string;   // The temporary, signed URL for uploading
  accessUrl: string;   // The final, permanent URL for viewing
}

// The service function that makes the API call
const getSasUrl = async (fileInfo: { fileName: string; fileType: string }): Promise<SasUrlResponse> => {
  const response = await apiClient.post('/crm/uploads/generate-sas-url', fileInfo);
  return response.data.data;
};

/**
 * A mutation hook to get a secure SAS URL from the backend for direct file uploads.
 */
export const useGenerateSasUrlMutation = () => {
  return useMutation({
    mutationFn: getSasUrl,
  });
};
