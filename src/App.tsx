import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Theme and Pages
import { theme } from './theme/theme';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';

// 1. Initialize TanStack Query Client
// আমরা এখানে default options সেট করছি যাতে API এররগুলো গ্লোবালি হ্যান্ডেল করা যায়
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // এরর হলে মাত্র একবার চেষ্টা করবে
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // মিউটেশনের ক্ষেত্রে অটো-রিট্রাই বন্ধ রাখা ভালো
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline ডিফল্ট ব্রাউজার স্টাইল রিমুভ করে MUI এর বেস স্টাইল সেট করে */}
        <CssBaseline />

        {/* টোস্ট নোটিফিকেশনের জন্য গ্লোবাল কম্পোনেন্ট */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'Montserrat, sans-serif',
            },
          }}
        />

        <Router>
          <Routes>
            {/* বর্তমানে আমাদের একটিই মেইন পেজ আছে */}
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<ResultPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
