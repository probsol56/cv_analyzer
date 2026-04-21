import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHrScanStore } from '../../features/hr-scanner/store/useHrScanStore';
import HrScanResultComponent from '../../features/hr-scanner/components/HrScanResult';

const HrScannerResultPage: React.FC = () => {
  const { scanResult, reset } = useHrScanStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!scanResult) navigate('/hr-scanner', { replace: true });
  }, [scanResult, navigate]);

  const handleReset = () => {
    reset();
    navigate('/hr-scanner');
  };

  if (!scanResult) return null;

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
              Scan Complete
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mt: 0.5 }}>
              HR Scan Report
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleReset}
            sx={{ borderColor: '#0F172A', color: '#0F172A', borderRadius: 0, px: 3, fontWeight: 600, alignSelf: { xs: 'flex-start', sm: 'center' }, '&:hover': { bgcolor: '#0F172A', color: '#fff' } }}
          >
            Scan Another CV
          </Button>
        </Stack>

        <HrScanResultComponent result={scanResult} />

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleReset}
            size="large"
            sx={{ bgcolor: '#0F172A', color: '#fff', borderRadius: 0, px: 5, fontWeight: 600, '&:hover': { bgcolor: '#1E293B' } }}
          >
            Scan Another CV
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HrScannerResultPage;
