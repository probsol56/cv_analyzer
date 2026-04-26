import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthStore } from '../../store/useAuthStore';

interface BlurGateProps {
  isBlurred: boolean;
  lockedLabel: string;
  children: React.ReactNode;
}

const BlurGate: React.FC<BlurGateProps> = ({ isBlurred, lockedLabel, children }) => {
  const { openAuthModal } = useAuthStore();

  if (!isBlurred) return <>{children}</>;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.6)',
        }}
      >
        <Stack alignItems="center" spacing={1.5} sx={{ p: 2, textAlign: 'center' }}>
          <LockOutlinedIcon sx={{ color: '#C5A059', fontSize: 28 }} />
          <Typography variant="body2" fontWeight={600} sx={{ maxWidth: 220 }}>
            {lockedLabel}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => openAuthModal(lockedLabel)}
            sx={{ borderRadius: 0, bgcolor: '#C5A059', '&:hover': { bgcolor: '#a8893e' } }}
          >
            Unlock Free
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BlurGate;
