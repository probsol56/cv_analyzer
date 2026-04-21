import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { hrApi } from '../../../api/hrApi';
import { useHrScanStore } from '../store/useHrScanStore';
import type { HrScanResult } from '../types/hrScan';

interface HrScanPayload {
  file: File;
  jobDescription: string;
  industry: string;
}

export const useHrScan = () => {
  const { setStatus, setScanResult } = useHrScanStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ file, jobDescription, industry }: HrScanPayload) => {
      setStatus('uploading');
      const uploadRes = await hrApi.uploadFile(file);

      setStatus('analyzing');
      const scanRes = await hrApi.runScan({
        cv_file: {
          transfer_method: 'local_file',
          upload_file_id: uploadRes.id,
          type: 'document',
        },
        job_description: jobDescription,
        industry,
      });

      return scanRes;
    },
    onSuccess: (data) => {
      try {
        const parsed: HrScanResult = JSON.parse(data.data.outputs.result);
        setScanResult(parsed);
        setStatus('completed');
        toast.success('HR Scan completed!');
        navigate('/hr-scanner/result');
      } catch {
        setStatus('error');
        toast.error('Failed to parse scan result.');
      }
    },
    onError: (error: Error) => {
      setStatus('error');
      toast.error(error.message || 'Something went wrong.');
    },
  });
};
