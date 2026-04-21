import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UploadFile, Send } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useHrScanStore } from '../store/useHrScanStore';
import { useHrScan } from '../hooks/useHrScan';

const INDUSTRIES = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'E-Commerce & Retail',
  'Manufacturing',
  'Telecom',
  'Education',
  'Consulting',
  'Media & Marketing',
  'Government & NGO',
];

const schema = z.object({
  jobDescription: z.string().min(50, 'Please paste a job description (min 50 characters)'),
  industry: z.string().min(1, 'Please select an industry'),
});

type FormData = z.infer<typeof schema>;

const HrScanForm: React.FC = () => {
  const { setFile, currentFile, status } = useHrScanStore();
  const { mutate, isPending } = useHrScan();
  const [fileError, setFileError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { jobDescription: '', industry: '' },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFileError(true);
      setFileSizeError(true);
      e.target.value = '';
      return;
    }
    setFileSizeError(false);
    setFile(file);
    setFileError(false);
  };

  const onSubmit = (data: FormData) => {
    if (!currentFile) {
      setFileError(true);
      return;
    }
    mutate({ file: currentFile, jobDescription: data.jobDescription, industry: data.industry });
  };

  const isProcessing = isPending || status === 'uploading' || status === 'analyzing';

  return (
    <Paper elevation={0} sx={{ p: 4 }}>
      <Stack spacing={4}>
        {/* File Upload */}
        <Box>
          <Box
            component="label"
            sx={{
              display: 'block',
              border: '2px dashed',
              borderColor: fileError ? '#DC2626' : currentFile ? '#C5A059' : '#E2E8F0',
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { borderColor: '#C5A059', bgcolor: 'rgba(197, 160, 89, 0.04)' },
            }}
          >
            <UploadFile sx={{ fontSize: 40, color: fileError ? '#DC2626' : '#C5A059', mb: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: fileError ? '#DC2626' : 'inherit' }}>
              {currentFile ? currentFile.name : 'Upload your CV (PDF or DOCX, max 5MB)'}
            </Typography>
            <input type="file" hidden accept=".pdf,.docx" onChange={handleFileChange} />
          </Box>
          {fileError && (
            <Typography sx={{ fontSize: '0.75rem', color: '#DC2626', mt: 0.75, ml: 0.5 }}>
              {fileSizeError ? 'File size must not exceed 5 MB.' : 'Please upload your CV before submitting.'}
            </Typography>
          )}
        </Box>

        {/* Job Description */}
        <Controller
          name="jobDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Job Description"
              placeholder="Paste the full job description here..."
              multiline
              rows={6}
              error={!!errors.jobDescription}
              helperText={errors.jobDescription?.message ?? 'Paste the job posting you\'re applying for'}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
            />
          )}
        />

        {/* Industry */}
        <Controller
          name="industry"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.industry}>
              <InputLabel>Industry</InputLabel>
              <Select {...field} label="Industry" sx={{ borderRadius: 0 }}>
                {INDUSTRIES.map((ind) => (
                  <MenuItem key={ind} value={ind}>
                    {ind}
                  </MenuItem>
                ))}
              </Select>
              {errors.industry && <FormHelperText>{errors.industry.message}</FormHelperText>}
            </FormControl>
          )}
        />

        {/* Submit */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit(onSubmit)}
          disabled={isProcessing}
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <Send />}
          sx={{ py: 2 }}
        >
          {isProcessing ? 'Processing Scan...' : 'Run HR Scan'}
        </Button>

        {/* Progress */}
        {(status === 'uploading' || status === 'analyzing') && (
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>
                {status === 'uploading' ? 'Uploading CV...' : 'Analyzing with AI...'}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#C5A059', fontWeight: 600 }}>
                {status === 'uploading' ? '33%' : '66%'}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={status === 'uploading' ? 33 : 66}
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

export default HrScanForm;
