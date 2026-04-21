import { create } from 'zustand';
import type { HrScanState } from '../types/hrScan';

export const useHrScanStore = create<HrScanState>((set) => ({
  status: 'idle',
  currentFile: null,
  scanResult: null,

  setStatus: (status) => set({ status }),
  setFile: (file) => set({ currentFile: file }),
  setScanResult: (result) => set({ scanResult: result }),
  reset: () => set({ status: 'idle', currentFile: null, scanResult: null }),
}));
