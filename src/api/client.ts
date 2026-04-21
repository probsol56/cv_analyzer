import axios from 'axios';

const BASE_URL = import.meta.env.VITE_DIFY_API_URL as string;

export const createDifyClient = (apiKey: string) => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${apiKey}`;
    return config;
  });

  return client;
};

// backward-compat default client (CV Reviewer)
const apiClient = createDifyClient(
  (import.meta.env.VITE_DIFY_CV_KEY ?? import.meta.env.VITE_DIFY_API_KEY) as string,
);

export default apiClient;
