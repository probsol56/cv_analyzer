// src/pages/Home.tsx
import React from 'react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import CVUpload from '../features/cv-reviewer/components/cvUpload';

const Home: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Left Side: Editorial Branding */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            <Typography variant="h1" sx={{ lineHeight: 1.1 }}>
                                Elevate Your <br />
                                <span style={{ color: '#C5A059' }}>Professional Identity.</span>
                            </Typography>
                            <Stack sx={{ alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ maxWidth: '400px', fontSize: '1.1rem', opacity: 0.8 }}>
                                    Our AI-driven executive consultant analyzes your CV with surgical precision,
                                    aligning your experience with the industry's most rigorous standards.
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Right Side: The Action Area */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CVUpload />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
