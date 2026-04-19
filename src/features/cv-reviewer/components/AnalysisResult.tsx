import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import type { CvAnalysisResult } from '../../../types/dify';

interface Props {
    result: CvAnalysisResult;
}

const scoreColor = (score: number): string => {
    if (score >= 80) return '#16A34A';
    if (score >= 60) return '#C5A059';
    return '#DC2626';
};

const ScoreCard = ({ label, score }: { label: string; score: number }) => {
    const color = scoreColor(score);
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: '1px solid #E2E8F0',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    backgroundColor: color,
                },
            }}
        >
            <Typography
                variant="overline"
                sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }}
            >
                {label}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ mt: { xs: 0.5, sm: 0 }, mb: { xs: 0, sm: 2 } }}>
                <Typography
                    sx={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', fontWeight: 700, color, lineHeight: 1 }}
                >
                    {score}
                </Typography>
                <Typography sx={{ color: '#94A3B8', fontFamily: 'Montserrat, sans-serif', fontSize: '1rem' }}>
                    / 100
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={score}
                sx={{
                    height: 6,
                    borderRadius: 0,
                    backgroundColor: '#E2E8F0',
                    '& .MuiLinearProgress-bar': { backgroundColor: color },
                }}
            />
        </Paper>
    );
};

const sectionLabels: Record<string, string> = {
    summary: 'Summary',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
};

const AnalysisResult = ({ result }: Props) => {
    return (
        <Stack spacing={4}>
            {/* Score Hero */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <ScoreCard label="Overall Score" score={result.overall_score} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <ScoreCard label="ATS Score" score={result.ats_score} />
                </Grid>
            </Grid>

            {/* Market Fit Banner */}
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #E2E8F0', backgroundColor: '#FFFBF0' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }} spacing={2} mb={2}>
                    <Typography
                        variant="overline"
                        sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Market Fit
                    </Typography>
                    <Typography
                        sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.5rem', color: '#C5A059' }}
                    >
                        {result.market_fit.score} / 100
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={result.market_fit.score}
                    sx={{
                        height: 6,
                        borderRadius: 0,
                        mb: 2,
                        backgroundColor: '#E2E8F0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#C5A059' },
                    }}
                />
                <Typography variant="body2" sx={{ color: '#475569', fontFamily: 'Montserrat, sans-serif' }}>
                    {result.market_fit.comment}
                </Typography>
            </Paper>

            {/* Strengths & Weaknesses */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{ p: 3, border: '1px solid #BBF7D0', backgroundColor: '#F0FDF4', height: '100%' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <CheckCircleOutlineIcon sx={{ color: '#16A34A', fontSize: '1.1rem' }} />
                            <Typography
                                variant="overline"
                                sx={{ color: '#16A34A', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }}
                            >
                                Strengths
                            </Typography>
                        </Stack>
                        <Stack spacing={1.5}>
                            {result.strengths.map((s, i) => (
                                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#16A34A',
                                            mt: '7px',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#166534', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6 }}>
                                        {s}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{ p: 3, border: '1px solid #FECACA', backgroundColor: '#FEF2F2', height: '100%' }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <ErrorOutlineIcon sx={{ color: '#DC2626', fontSize: '1.1rem' }} />
                            <Typography
                                variant="overline"
                                sx={{ color: '#DC2626', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }}
                            >
                                Weaknesses
                            </Typography>
                        </Stack>
                        <Stack spacing={1.5}>
                            {result.weaknesses.map((w, i) => (
                                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: '#DC2626',
                                            mt: '7px',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#991B1B', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6 }}>
                                        {w}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Section Feedback */}
            <Box>
                <Typography
                    variant="overline"
                    sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', display: 'block', mb: 1.5 }}
                >
                    Section Feedback
                </Typography>
                {Object.entries(result.section_feedback).map(([key, value]) => (
                    <Accordion
                        key={key}
                        elevation={0}
                        disableGutters
                        sx={{
                            border: '1px solid #E2E8F0',
                            borderBottom: 'none',
                            '&:last-of-type': { borderBottom: '1px solid #E2E8F0' },
                            '&::before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#C5A059' }} />}>
                            <Typography
                                sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '1rem', color: '#0F172A' }}
                            >
                                {sectionLabels[key] ?? key}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderTop: '1px solid #E2E8F0', pt: 2 }}>
                            <Typography variant="body2" sx={{ color: '#475569', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.8 }}>
                                {value}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Missing Keywords */}
            <Box>
                <Typography
                    variant="overline"
                    sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', display: 'block', mb: 1.5 }}
                >
                    Missing Keywords
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {result.missing_keywords.map((kw) => (
                        <Chip
                            key={kw}
                            label={kw}
                            variant="outlined"
                            size="small"
                            sx={{
                                borderColor: '#C5A059',
                                color: '#92400E',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                borderRadius: 0,
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Improvement Tips */}
            <Box>
                <Typography
                    variant="overline"
                    sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', display: 'block', mb: 1.5 }}
                >
                    Improvement Tips
                </Typography>
                <Stack spacing={2}>
                    {result.improvement_tips.map((tip, i) => (
                        <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                            <Box
                                sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    backgroundColor: '#C5A059',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <Typography sx={{ color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.75rem' }}>
                                    {i + 1}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#334155', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.8, pt: '4px' }}>
                                {tip}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
};

export default AnalysisResult;
