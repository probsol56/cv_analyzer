import type { AnalysisStatus } from '../../../types/dify';

export interface LinkedinOptResult {
  profile_score: number;
  headline_options: string[];
  about_rewrite: string;
  keyword_gaps: string[];
  skills_to_add: string[];
  connection_message: string;
  quick_wins: string[];
}

export interface LinkedinOptState {
  status: AnalysisStatus;
  optimizeResult: LinkedinOptResult | null;
  setStatus: (status: AnalysisStatus) => void;
  setOptimizeResult: (result: LinkedinOptResult) => void;
  reset: () => void;
}
