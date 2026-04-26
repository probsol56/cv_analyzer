import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cvApi } from '../../../api/cvApi';
import { useUiStore } from '../../../store/useUiStore';
import type { CvAnalysisResult, DifyWorkflowResponse } from '../../../types/dify';
import { toast } from 'react-hot-toast';

interface AnalyzeCVPayload {
    file: File;
    targetRole: string;
    location: string;
    jobDescription?: string;
}

export const useAnalyzeCV = () => {
    const { setStatus, setAnalysisResult } = useUiStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ file, targetRole, location, jobDescription }: AnalyzeCVPayload): Promise<DifyWorkflowResponse> => {
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
                        target_role: targetRole,
                        location: location,
                        job_description: jobDescription,
                    },
                    response_mode: 'blocking',
                    user: 'frontend',
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
                navigate('/cv-reviewer/result');
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
