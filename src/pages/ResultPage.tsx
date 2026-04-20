import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUiStore } from '../store/useUiStore';
import AnalysisResult from '../features/cv-reviewer/components/AnalysisResult';

const ResultPage = () => {
    const { analysisResult, reset } = useUiStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!analysisResult) {
            navigate('/', { replace: true });
        }
    }, [analysisResult, navigate]);

    const handleReset = () => {
        reset();
        navigate('/');
    };

    if (!analysisResult) return null;

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#F8FAFC', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ justifyContent: 'space-between', alignItems: 'center', spacing: 2, mb: 5 }}
                >
                    <Box>
                        <Typography
                            variant="overline"
                            sx={{ color: '#C5A059', letterSpacing: 3, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }}
                        >
                            Analysis Complete
                        </Typography>
                        <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mt: 0.5 }}>
                            Your CV Report
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleReset}
                        sx={{
                            borderColor: '#0F172A',
                            color: '#0F172A',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            borderRadius: 0,
                            px: 3,
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                            '&:hover': { backgroundColor: '#0F172A', color: '#fff' },
                        }}
                    >
                        Analyze Another CV
                    </Button>
                </Stack>

                <AnalysisResult result={analysisResult} />

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleReset}
                        size="large"
                        sx={{
                            backgroundColor: '#0F172A',
                            color: '#fff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            borderRadius: 0,
                            px: 5,
                            '&:hover': { backgroundColor: '#1E293B' },
                        }}
                    >
                        Analyze Another CV
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ResultPage;
