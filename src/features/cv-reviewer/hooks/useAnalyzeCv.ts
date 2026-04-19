import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cvApi } from '../../../api/cvApi';
import { useUiStore } from '../../../store/useUiStore';
import type { CvAnalysisResult, DifyWorkflowResponse } from '../../../types/dify';
import { toast } from 'react-hot-toast';

interface AnalyzeCVPayload {
    file: File;
    jobTarget: string;
    market: string;
}

export const useAnalyzeCV = () => {
    const { setStatus, setAnalysisResult } = useUiStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ file, jobTarget, market }: AnalyzeCVPayload): Promise<DifyWorkflowResponse> => {
            try {
                setStatus('uploading');
                const uploadRes = await cvApi.uploadFile(file);
                const fileId = uploadRes.id;

                setStatus('analyzing');
                const analysisRes = await cvApi.analyzeCV({
                    inputs: {
                        cv_file: {
                            transfer_method: 'local_file',
                            upload_file_id: fileId,
                            type: 'document',
                        },
                        job_target: jobTarget,
                        market: market,
                    },
                    response_mode: 'blocking',
                    user: 'user_123',
                });

                return analysisRes;
            } catch (error: unknown) {
                const err = error as { response?: { data?: { message?: string } } };
                console.error('Analysis Error:', error);
                throw new Error(err.response?.data?.message || 'Something went wrong during analysis');
            }
        },
        onSuccess: (data) => {
            try {
                const parsed: CvAnalysisResult = JSON.parse(data.data.outputs.result);
                setAnalysisResult(parsed);
                setStatus('completed');
                toast.success('CV Analysis Completed successfully!');
                navigate('/results');
            } catch {
                setStatus('error');
                toast.error('Failed to parse analysis result.');
            }
        },
        onError: (error: Error) => {
            setStatus('error');
            toast.error(error.message);
        },
    });
};
