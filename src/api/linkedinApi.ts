import { backendClient } from './client';
import type { DifyWorkflowResponse } from '../types/dify';

export interface LinkedinWorkflowInputs {
  headline: string;
  about: string;
  experience: string;
  target_role: string;
}

export const linkedinApi = {
  runOptimize: async (inputs: LinkedinWorkflowInputs): Promise<DifyWorkflowResponse> => {
    const { data } = await backendClient.post<DifyWorkflowResponse>('/proxy/linkedin/optimize', { inputs });
    return data;
  },
};
