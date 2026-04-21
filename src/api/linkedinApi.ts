import { createDifyClient } from './client';
import type { DifyWorkflowResponse } from '../types/dify';

const linkedinClient = createDifyClient(import.meta.env.VITE_DIFY_LINKEDIN_KEY as string);

export interface LinkedinWorkflowInputs {
  headline: string;
  about: string;
  experience: string;
  target_role: string;
}

export const linkedinApi = {
  runOptimize: async (inputs: LinkedinWorkflowInputs): Promise<DifyWorkflowResponse> => {
    const { data } = await linkedinClient.post<DifyWorkflowResponse>('/workflows/run', {
      inputs,
      response_mode: 'blocking',
      user: 'user_123',
    });
    return data;
  },
};
