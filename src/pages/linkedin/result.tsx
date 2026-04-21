import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLinkedinStore } from '../../features/linkedin-optimizer/store/useLinkedinStore';
import LinkedinResultComponent from '../../features/linkedin-optimizer/components/LinkedinResult';

const LinkedinResultPage: React.FC = () => {
  const { optimizeResult, reset } = useLinkedinStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!optimizeResult) navigate('/linkedin', { replace: true });
  }, [optimizeResult, navigate]);

  const handleReset = () => {
    reset();
    navigate('/linkedin');
  };

  if (!optimizeResult) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          spacing={2}
          sx={{ mb: 5 }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: '#C5A059', letterSpacing: 3, fontSize: '0.65rem' }}>
              Optimization Complete
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mt: 0.5 }}>
              LinkedIn Report
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleReset}
            sx={{ borderColor: '#0F172A', color: '#0F172A', borderRadius: 0, px: 3, fontWeight: 600, alignSelf: { xs: 'flex-start', sm: 'center' }, '&:hover': { bgcolor: '#0F172A', color: '#fff' } }}
          >
            Optimize Again
          </Button>
        </Stack>

        <LinkedinResultComponent result={optimizeResult} />

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleReset}
            size="large"
            sx={{ bgcolor: '#0F172A', color: '#fff', borderRadius: 0, px: 5, fontWeight: 600, '&:hover': { bgcolor: '#1E293B' } }}
          >
            Optimize Again
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LinkedinResultPage;
