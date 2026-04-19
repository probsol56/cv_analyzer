import { create } from 'zustand';
import type { AnalysisStatus, CvAnalysisResult } from '../types/dify';

interface UiState {
    status: AnalysisStatus;
    currentFile: File | null;
    jobDescription: string;
    analysisResult: CvAnalysisResult | null;

    setStatus: (status: AnalysisStatus) => void;
    setFile: (file: File | null) => void;
    setJobDescription: (jd: string) => void;
    setAnalysisResult: (result: CvAnalysisResult) => void;
    reset: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    status: 'idle',
    currentFile: null,
    jobDescription: '',
    analysisResult: null,

    setStatus: (status) => set({ status }),
    setFile: (file) => set({ currentFile: file }),
    setJobDescription: (jd) => set({ jobDescription: jd }),
    setAnalysisResult: (result) => set({ analysisResult: result }),
    reset: () => set({
        status: 'idle',
        currentFile: null,
        jobDescription: '',
        analysisResult: null,
    }),
}));
