import type { AnalysisStatus } from '../../../types/dify';

export interface HrScanResult {
  hr_score: number;
  interview_likelihood: number;
  jd_match_pct: number;
  red_flags: string[];
  positive_signals: string[];
  hr_comments: string;
  improvement_actions: string[];
}

export interface HrScanState {
  status: AnalysisStatus;
  currentFile: File | null;
  scanResult: HrScanResult | null;
  setStatus: (status: AnalysisStatus) => void;
  setFile: (file: File | null) => void;
  setScanResult: (result: HrScanResult) => void;
  reset: () => void;
}
