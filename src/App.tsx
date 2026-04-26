import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { theme } from './theme/theme';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ResultPage from './pages/ResultPage';
import HrScannerPage from './pages/hr-scanner';
import HrScannerResultPage from './pages/hr-scanner/result';
import LinkedinPage from './pages/linkedin';
import LinkedinResultPage from './pages/linkedin/result';
import AuthModal from './shared/components/AuthModal';
import { supabase } from './lib/supabaseClient';
import { useAuthStore } from './store/useAuthStore';
import { backendClient } from './api/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  },
});

const App: React.FC = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        backendClient.get('/auth/me').catch(() => {});
      }
    });
    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Montserrat, sans-serif' } }} />
        <AuthModal />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cv-reviewer" element={<Home />} />
            <Route path="/cv-reviewer/result" element={<ResultPage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/hr-scanner" element={<HrScannerPage />} />
            <Route path="/hr-scanner/result" element={<HrScannerResultPage />} />
            <Route path="/linkedin" element={<LinkedinPage />} />
            <Route path="/linkedin/result" element={<LinkedinResultPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
