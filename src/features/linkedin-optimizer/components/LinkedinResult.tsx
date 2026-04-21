import React, { useState } from 'react';
import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ScoreCard from '../../../shared/components/ScoreCard';
import type { LinkedinOptResult } from '../types/linkedin';

interface Props {
  result: LinkedinOptResult;
}

const LinkedinResultComponent: React.FC<Props> = ({ result }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyHeadline = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(result.connection_message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <Stack spacing={4}>
      {/* Profile Score */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ScoreCard label="Profile Strength" score={result.profile_score} />
        </Grid>
      </Grid>

      {/* Headline Options */}
      <Box>
        <Typography variant="overline" sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
          Headline Rewrites (pick one)
        </Typography>
        <Stack spacing={2}>
          {result.headline_options.map((headline, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                p: 2.5,
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                '&:hover': { borderColor: '#C5A059' },
              }}
            >
              <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 500, lineHeight: 1.5, flex: 1 }}>
                {headline}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                startIcon={copiedIdx === i ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={() => handleCopyHeadline(headline, i)}
                sx={{ borderRadius: 0, borderColor: copiedIdx === i ? '#16A34A' : '#E2E8F0', color: copiedIdx === i ? '#16A34A' : '#64748B', whiteSpace: 'nowrap', minWidth: 90 }}
              >
                {copiedIdx === i ? 'Copied!' : 'Copy'}
              </Button>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* About Rewrite */}
      <Paper elevation={0} sx={{ p: 3, border: '1px solid #E2E8F0', bgcolor: '#FFFBF0' }}>
        <Typography variant="overline" sx={{ color: '#C5A059', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 2 }}>
          About Section Rewrite
        </Typography>
        <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
          {result.about_rewrite}
        </Typography>
      </Paper>

      {/* Keyword Gaps & Skills */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
              Missing Keywords
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {result.keyword_gaps.map((kw) => (
                <Chip
                  key={kw}
                  label={kw}
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: '#C5A059', color: '#92400E', fontSize: '0.75rem', fontWeight: 600, borderRadius: 0 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
              Skills to Add
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {result.skills_to_add.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{ bgcolor: '#0F172A', color: '#fff', fontSize: '0.75rem', fontWeight: 600, borderRadius: 0 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Connection Message */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="overline" sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem' }}>
            Connection Request Template
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={copiedMessage ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopyMessage}
            sx={{ borderRadius: 0, borderColor: copiedMessage ? '#16A34A' : '#E2E8F0', color: copiedMessage ? '#16A34A' : '#64748B' }}
          >
            {copiedMessage ? 'Copied!' : 'Copy'}
          </Button>
        </Stack>
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8, fontStyle: 'italic' }}>
            {result.connection_message}
          </Typography>
        </Paper>
      </Box>

      {/* Quick Wins */}
      <Box>
        <Typography variant="overline" sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
          Quick Wins
        </Typography>
        <Stack spacing={2}>
          {result.quick_wins.map((win, i) => (
            <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem' }}>{i + 1}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.8, pt: '4px' }}>
                {win}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default LinkedinResultComponent;
