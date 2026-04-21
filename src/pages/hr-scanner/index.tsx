import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HrScanForm from '../../features/hr-scanner/components/HrScanForm';

const HrScannerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 4, color: 'text.secondary', fontWeight: 600 }}
        >
          Back to Tools
        </Button>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: '0.12em' }}>
                HR CV Scanner
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.1 }}>
                See it Through{' '}
                <span style={{ color: '#C5A059' }}>Their Eyes.</span>
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.75, maxWidth: 380 }}>
                Get an honest HR recruiter perspective on your CV combined with a precise
                job description match analysis.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <HrScanForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HrScannerPage;
