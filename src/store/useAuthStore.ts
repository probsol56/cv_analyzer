import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  authModalReason: string | null;
  setUser: (user: User | null) => void;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthModalOpen: false,
      authModalReason: null,
      setUser: (user) => set({ user }),
      openAuthModal: (reason) => set({ isAuthModalOpen: true, authModalReason: reason ?? null }),
      closeAuthModal: () => set({ isAuthModalOpen: false, authModalReason: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
