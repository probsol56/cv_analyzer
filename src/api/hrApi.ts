import { createDifyClient } from './client';
import type { DifyUploadResponse, DifyWorkflowResponse } from '../types/dify';

const hrClient = createDifyClient(import.meta.env.VITE_DIFY_HR_KEY as string);

export interface HrWorkflowInputs {
  cv_file: { transfer_method: 'local_file'; upload_file_id: string; type: 'document' };
  job_description: string;
  industry: string;
}

export const hrApi = {
  uploadFile: async (file: File): Promise<DifyUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await hrClient.post<DifyUploadResponse>('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  runScan: async (inputs: HrWorkflowInputs): Promise<DifyWorkflowResponse> => {
    const { data } = await hrClient.post<DifyWorkflowResponse>('/workflows/run', {
      inputs,
      response_mode: 'blocking',
      user: 'user_123',
    });
    return data;
  },
};
