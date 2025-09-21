import apiClient from "@/lib/apiClient";
interface FileInfo {
  fileName: string;
  fileType: string;
}

export interface SasUrlResponse {
  uploadUrl: string; 
  accessUrl: string; 
}

/**
 * A service function that asks the backend for a secure SAS URL
 * for direct-to-cloud file uploads.
 * @param fileInfo - The name and type of the file to be uploaded.
 */
export const getSasUrl = async (fileInfo: FileInfo): Promise<SasUrlResponse> => {
  const response = await apiClient.post('/crm/uploads/generate-sas-url', fileInfo);
  return response.data.data;
};