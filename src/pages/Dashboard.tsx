import React from 'react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import ToolCard from '../shared/components/ToolCard';
import { TOOLS } from '../tools/registry';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'primary.main',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography
              variant="overline"
              sx={{
                color: 'secondary.main',
                fontWeight: 700,
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
              }}
            >
              Career Intelligence Suite
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.1,
              }}
            >
              Elevate Your <br />
              <span style={{ color: '#C5A059' }}>Professional Identity.</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1rem',
                lineHeight: 1.7,
              }}
            >
              AI-powered tools that analyze, optimize, and position your career
              with surgical precision.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Tools Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={1} sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: '0.1em' }}
          >
            Choose Your Tool
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            What would you like to optimize?
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {TOOLS.map((tool) => (
            <Grid key={tool.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
