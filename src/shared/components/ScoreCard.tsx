import React from 'react';
import { Paper, Typography, Stack, LinearProgress } from '@mui/material';

const scoreColor = (score: number, max = 100): string => {
  const pct = (score / max) * 100;
  if (pct >= 80) return '#16A34A';
  if (pct >= 60) return '#C5A059';
  return '#DC2626';
};

interface ScoreCardProps {
  label: string;
  score: number;
  max?: number;
  unit?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, score, max = 100, unit }) => {
  const color = scoreColor(score, max);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
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
      <Stack direction="row" alignItems="flex-end" spacing={0.5} sx={{ mt: 0.5, mb: 2 }}>
        <Typography
          sx={{ fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', fontWeight: 700, color, lineHeight: 1 }}
        >
          {score}
        </Typography>
        <Typography sx={{ color: '#94A3B8', fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', pb: 0.5 }}>
          {unit ?? `/ ${max}`}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={(score / max) * 100}
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

export default ScoreCard;
