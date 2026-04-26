import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { supabase } from '../../lib/supabaseClient';
import { useAuthStore } from '../../store/useAuthStore';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalReason, closeAuthModal } = useAuthStore();

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href },
    });
  };

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 0, border: '1px solid #E2E8F0' } }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Box sx={{ p: 1.5, bgcolor: 'rgba(197, 160, 89, 0.1)', borderRadius: '50%' }}>
            <LockOutlinedIcon sx={{ color: '#C5A059', fontSize: 28 }} />
          </Box>
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="h6" fontWeight={700}>
              Unlock Full Results
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
              {authModalReason ?? 'Create a free account to see all your results and track your progress.'}
            </Typography>
          </Stack>
          <Stack spacing={1.5} width="100%">
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={() => handleOAuth('google')}
              sx={{ borderRadius: 0, borderColor: '#E2E8F0', color: 'text.primary', py: 1.5 }}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<LinkedInIcon sx={{ color: '#0A66C2' }} />}
              onClick={() => handleOAuth('linkedin_oidc')}
              sx={{ borderRadius: 0, borderColor: '#E2E8F0', color: 'text.primary', py: 1.5 }}
            >
              Continue with LinkedIn
            </Button>
          </Stack>
          <Divider flexItem />
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Free forever. No credit card required.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
