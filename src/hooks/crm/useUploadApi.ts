'use client';

import { useMutation } from '@tanstack/react-query';
import * as uploadService from "@/lib/services/crm/upload.service"
import { SasUrlResponse } from '@/lib/services/crm/upload.service';
import * as azureUploadService from '@/lib/services/crm/azureUpload.service'


/**
 * A mutation hook to get a secure SAS URL from the backend for direct file uploads.
 */
export const useGenerateSasUrlMutation = () => {
  return useMutation<
    SasUrlResponse, 
    Error,          
    { fileName: string; fileType: string } 
  >({
    mutationFn: (fileInfo) => uploadService.getSasUrl(fileInfo),
  });
};

export const useUploadFileToAzureMutation = () => {
  return useMutation({
    mutationFn: azureUploadService.uploadFileToAzure,
  });
}
