import { create } from 'zustand';
import type { LinkedinOptState } from '../types/linkedin';

export const useLinkedinStore = create<LinkedinOptState>((set) => ({
  status: 'idle',
  optimizeResult: null,

  setStatus: (status) => set({ status }),
  setOptimizeResult: (result) => set({ optimizeResult: result }),
  reset: () => set({ status: 'idle', optimizeResult: null }),
}));
