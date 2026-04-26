import axios from 'axios';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../store/useAuthStore';

export const backendClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
});

backendClient.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

backendClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 402) {
      const { used, limit } = error.response.data ?? {};
      useAuthStore.getState().openAuthModal(
        `You've used ${used}/${limit} free analyses. Register to continue.`,
      );
    }
    return Promise.reject(error);
  },
);
