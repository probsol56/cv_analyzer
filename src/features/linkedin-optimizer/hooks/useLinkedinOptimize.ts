import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { linkedinApi } from '../../../api/linkedinApi';
import { useLinkedinStore } from '../store/useLinkedinStore';
import type { LinkedinOptResult } from '../types/linkedin';

export interface LinkedinOptPayload {
  headline: string;
  about: string;
  experience: string;
  targetRole: string;
}

export const useLinkedinOptimize = () => {
  const { setStatus, setOptimizeResult } = useLinkedinStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ headline, about, experience, targetRole }: LinkedinOptPayload) => {
      setStatus('analyzing');
      return linkedinApi.runOptimize({
        headline,
        about,
        experience,
        target_role: targetRole,
      });
    },
    onSuccess: (data) => {
      try {
        const parsed: LinkedinOptResult = JSON.parse(data.data.outputs.result);
        setOptimizeResult(parsed);
        setStatus('completed');
        toast.success('LinkedIn optimization complete!');
        navigate('/linkedin/result');
      } catch {
        setStatus('error');
        toast.error('Failed to parse optimization result.');
      }
    },
    onError: (error: Error) => {
      setStatus('error');
      toast.error(error.message || 'Something went wrong.');
    },
  });
};
