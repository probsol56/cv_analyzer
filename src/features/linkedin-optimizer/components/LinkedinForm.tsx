import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AutoFixHigh } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLinkedinStore } from '../store/useLinkedinStore';
import { useLinkedinOptimize } from '../hooks/useLinkedinOptimize';

const schema = z.object({
  headline: z.string().min(5, 'Enter your current LinkedIn headline'),
  about: z.string().min(30, 'Paste your About section (min 30 characters)'),
  experience: z
    .string()
    .min(50, 'Paste your top 2-3 experience entries (min 50 characters)'),
  targetRole: z.string().min(3, 'Enter the role you are targeting'),
});

type FormData = z.infer<typeof schema>;

const LinkedinForm: React.FC = () => {
  const { status } = useLinkedinStore();
  const { mutate, isPending } = useLinkedinOptimize();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { headline: '', about: '', experience: '', targetRole: '' },
  });

  const onSubmit = (data: FormData) => {
    mutate({
      headline: data.headline,
      about: data.about,
      experience: data.experience,
      targetRole: data.targetRole,
    });
  };

  const isProcessing = isPending || status === 'analyzing';

  return (
    <Paper elevation={0} sx={{ p: 4 }}>
      <Stack spacing={4}>
        <Controller
          name="headline"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Current Headline"
              placeholder="e.g. Senior Software Engineer at Acme Corp"
              error={!!errors.headline}
              helperText={errors.headline?.message ?? 'Copy from your LinkedIn profile'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
          )}
        />

        <Controller
          name="about"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="About Section"
              placeholder="Paste your LinkedIn About section here..."
              multiline
              rows={5}
              error={!!errors.about}
              helperText={errors.about?.message ?? 'Your current "About" paragraph from LinkedIn'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
          )}
        />

        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Top Experience Entries"
              placeholder="Paste your most recent 2-3 job titles and descriptions..."
              multiline
              rows={6}
              error={!!errors.experience}
              helperText={errors.experience?.message ?? 'Copy your top experience entries from LinkedIn'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
          )}
        />

        <Controller
          name="targetRole"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Target Role"
              placeholder="e.g. Engineering Manager"
              error={!!errors.targetRole}
              helperText={errors.targetRole?.message ?? 'The role you want to be discovered for'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
          )}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit(onSubmit)}
          disabled={isProcessing}
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <AutoFixHigh />}
          sx={{ py: 2 }}
        >
          {isProcessing ? 'Optimizing...' : 'Optimize My Profile'}
        </Button>

        {status === 'analyzing' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>Analyzing profile...</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#C5A059', fontWeight: 600 }}>66%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={66}
              sx={{
                height: 4,
                borderRadius: 0,
                backgroundColor: '#E2E8F0',
                '& .MuiLinearProgress-bar': { backgroundColor: '#C5A059' },
              }}
            />
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default LinkedinForm;
