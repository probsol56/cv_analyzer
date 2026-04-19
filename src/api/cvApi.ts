// src/api/cvApi.ts
import apiClient from './client';
import type { DifyUploadResponse, DifyWorkflowRequest, DifyWorkflowResponse } from '../types/dify';

export const cvApi = {
    // ফাইল আপলোড ফাংশন (এটি একই থাকবে)
    uploadFile: async (file: File): Promise<DifyUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await apiClient.post<DifyUploadResponse>('/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },

    // Workflow রান করার ফাংশন (আপডেটেড)
    analyzeCV: async (payload: DifyWorkflowRequest): Promise<DifyWorkflowResponse> => {
        const { data } = await apiClient.post<DifyWorkflowResponse>('/workflows/run', payload);
        return data;
    },
};
