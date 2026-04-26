import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import ScoreCard from '../../../shared/components/ScoreCard';
import BlurGate from '../../../shared/components/BlurGate';
import { useAuthStore } from '../../../store/useAuthStore';
import type { HrScanResult } from '../types/hrScan';

interface Props {
  result: HrScanResult;
}

const VISIBLE_RED_FLAGS = 1;
const VISIBLE_ACTIONS = 2;

const HrScanResultComponent: React.FC<Props> = ({ result }) => {
  const { user } = useAuthStore();
  const isAnonymous = !user;

  const hiddenFlags = Math.max(0, result.red_flags.length - VISIBLE_RED_FLAGS);
  const hiddenActions = Math.max(0, result.improvement_actions.length - VISIBLE_ACTIONS);

  return (
    <Stack spacing={4}>
      {/* Score Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ScoreCard label="HR Impression" score={result.hr_score} max={10} unit="/ 10" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ScoreCard label="Interview Likelihood" score={result.interview_likelihood} unit="%" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <ScoreCard label="JD Match" score={result.jd_match_pct} unit="%" />
        </Grid>
      </Grid>

      {/* Red Flags & Positive Signals */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BlurGate
            isBlurred={isAnonymous && hiddenFlags > 0}
            lockedLabel={`Register to see ${hiddenFlags} more red flag${hiddenFlags > 1 ? 's' : ''}`}
          >
            <Paper elevation={0} sx={{ p: 3, border: '1px solid #FECACA', bgcolor: '#FEF2F2', height: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ErrorOutlineIcon sx={{ color: '#DC2626', fontSize: '1.1rem' }} />
                <Typography variant="overline" sx={{ color: '#DC2626', letterSpacing: 2, fontSize: '0.65rem' }}>
                  Red Flags
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {result.red_flags.slice(0, isAnonymous ? VISIBLE_RED_FLAGS : undefined).map((flag, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#DC2626', mt: '7px', flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: '#991B1B', lineHeight: 1.6 }}>{flag}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </BlurGate>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #BBF7D0', bgcolor: '#F0FDF4', height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <CheckCircleOutlineIcon sx={{ color: '#16A34A', fontSize: '1.1rem' }} />
              <Typography variant="overline" sx={{ color: '#16A34A', letterSpacing: 2, fontSize: '0.65rem' }}>
                Positive Signals
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              {result.positive_signals.map((signal, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#16A34A', mt: '7px', flexShrink: 0 }}
                  />
                  <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>
                    {signal}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* HR Comments */}
      <Accordion
        elevation={0}
        defaultExpanded
        disableGutters
        sx={{
          border: '1px solid #E2E8F0',
          '&::before': { display: 'none' },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#C5A059' }} />}>
          <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: '1rem' }}>
            HR Manager's Perspective
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: '1px solid #E2E8F0', pt: 2 }}>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
            {result.hr_comments}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Improvement Actions */}
      <Box>
        <Typography
          variant="overline"
          sx={{ color: '#64748B', letterSpacing: 2, fontSize: '0.65rem', display: 'block', mb: 1.5 }}
        >
          Action Items
        </Typography>
        <BlurGate
          isBlurred={isAnonymous && hiddenActions > 0}
          lockedLabel={`Register to unlock ${hiddenActions} more action item${hiddenActions > 1 ? 's' : ''}`}
        >
          <Stack spacing={2}>
            {result.improvement_actions.slice(0, isAnonymous ? VISIBLE_ACTIONS : undefined).map((action, i) => (
              <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: '#C5A059',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem' }}>{i + 1}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.8, pt: '4px' }}>
                  {action}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </BlurGate>
      </Box>
    </Stack>
  );
};

export default HrScanResultComponent;
