// src/types/dify.ts

export interface DifyFileInput {
    transfer_method: 'local_file';
    upload_file_id: string;
    type: 'document' | 'image' | 'audio' | 'video'
}

export interface DifyUploadResponse {
    id: string;
    name: string;
    created_at: string;
}

export interface DifyWorkflowRequest {
    inputs: {
        cv_file: DifyFileInput;
        job_target: string;
        market: string;
    };
    response_mode: 'blocking';
    user: string;
}

export interface DifyWorkflowResponse {
    task_id: string;
    workflow_run_id: string;
    data: {
        id: string;
        workflow_id: string;
        status: 'succeeded' | 'failed' | 'running';
        outputs: {
            result: string;
            [key: string]: unknown;
        };
        error: string | null;
        elapsed_time: number;
        total_tokens: number;
        total_steps: number;
        created_at: number;
        finished_at: number;
    };
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'completed' | 'error';

export interface CvAnalysisResult {
    overall_score: number;
    ats_score: number;
    strengths: string[];
    weaknesses: string[];
    section_feedback: {
        summary: string;
        experience: string;
        skills: string;
        education: string;
    };
    missing_keywords: string[];
    improvement_tips: string[];
    market_fit: {
        score: number;
        comment: string;
    };
}
