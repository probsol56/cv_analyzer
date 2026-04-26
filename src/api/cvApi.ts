import { backendClient } from './client';
import type { DifyUploadResponse, DifyWorkflowRequest, DifyWorkflowResponse } from '../types/dify';

export const cvApi = {
  uploadFile: async (file: File): Promise<DifyUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await backendClient.post<DifyUploadResponse>('/proxy/cv/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  analyzeCV: async (payload: DifyWorkflowRequest): Promise<DifyWorkflowResponse> => {
    const { data } = await backendClient.post<DifyWorkflowResponse>('/proxy/cv/analyze', payload);
    return data;
  },
};
