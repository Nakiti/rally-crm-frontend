import axios from "axios";

interface UploadFileParams {
  uploadUrl: string; // The signed SAS URL from our backend
  file: File;
}

/**
 * A service function that uploads a file directly to an Azure SAS URL.
 */
export const uploadFileToAzure = async ({ uploadUrl, file }: UploadFileParams): Promise<Response> => {
  const response = await axios.put(uploadUrl, file, {
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type,
    },
  });

  if (response.status != 201) {
    console.log(response)
    throw new Error('File upload to Azure failed.');
  }

  console.log(response)

  return response;
};