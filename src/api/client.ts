// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_DIFY_API_URL, // .env ফাইলে এটি সেট করতে হবে
    headers: {
        'Content-Type': 'application/json',
    },
});

// রিকোয়েস্ট ইন্টারসেপ্টর: প্রতিবার API কলে API Key পাঠাবে
apiClient.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_DIFY_API_KEY;
    if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
    }
    return config;
});

export default apiClient;
