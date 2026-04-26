import { backendClient } from './client';
import type { DifyUploadResponse, DifyWorkflowResponse } from '../types/dify';

export interface HrWorkflowInputs {
  cv_file: { transfer_method: 'local_file'; upload_file_id: string; type: 'document' };
  job_description: string;
  industry: string;
}

export const hrApi = {
  uploadFile: async (file: File): Promise<DifyUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await backendClient.post<DifyUploadResponse>('/proxy/hr/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  runScan: async (inputs: HrWorkflowInputs): Promise<DifyWorkflowResponse> => {
    const { data } = await backendClient.post<DifyWorkflowResponse>('/proxy/hr/scan', { inputs });
    return data;
  },
};
