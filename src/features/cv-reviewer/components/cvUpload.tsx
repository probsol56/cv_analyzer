import React, { useState } from 'react';
import {
    Autocomplete,
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
import { createFilterOptions } from '@mui/material/Autocomplete';
import { UploadFile, Send } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUiStore } from '../../../store/useUiStore';
import { useAnalyzeCV } from '../hooks/useAnalyzeCv';

const DEFAULT_JOB_OPTIONS = [
    'Software Engineer',
    'Senior Software Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'DevOps Engineer',
    'Product Manager',
    'Data Scientist',
    'Data Analyst',
    'UI/UX Designer',
    'Project Manager',
    'Business Analyst',
];

const filter = createFilterOptions<string>();

const schema = z.object({
    jobTarget: z.string().min(3, 'Please select or enter a job title'),
    market: z.enum(['Bangladesh', 'International'], { message: 'Please select a market' }),
});

type FormData = z.infer<typeof schema>;

const CVUpload: React.FC = () => {
    const { setFile, currentFile, status } = useUiStore();
    const { mutate, isPending } = useAnalyzeCV();
    const [jobOptions, setJobOptions] = useState(DEFAULT_JOB_OPTIONS);

    const [fileError, setFileError] = useState(false);
    const [fileSizeError, setFileSizeError] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { jobTarget: '', market: 'Bangladesh' },
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
        mutate({ file: currentFile, jobTarget: data.jobTarget, market: data.market });
    };

    return (
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0', borderRadius: '0px' }}>
            <Stack spacing={4}>
                {/* File Upload Area */}
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
                            transition: 'all 0.3s ease',
                            bgcolor: fileError ? 'rgba(220, 38, 38, 0.03)' : 'transparent',
                            '&:hover': { borderColor: fileError ? '#DC2626' : '#C5A059', bgcolor: fileError ? 'rgba(220, 38, 38, 0.05)' : 'rgba(197, 160, 89, 0.05)' },
                        }}
                    >
                        <UploadFile sx={{ fontSize: 40, color: fileError ? '#DC2626' : '#C5A059', mb: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, color: fileError ? '#DC2626' : 'inherit' }}>
                            {currentFile ? currentFile.name : 'Drop your CV here or click to upload. (Max 5MB)'}
                        </Typography>
                        <input type="file" hidden accept=".pdf,.docx" onChange={handleFileChange} />
                    </Box>
                    {fileError && (
                        <Typography sx={{ fontSize: '0.75rem', color: '#DC2626', fontFamily: 'Montserrat, sans-serif', mt: 0.75, ml: 0.5 }}>
                            {fileSizeError ? 'File size must not exceed 5 MB.' : 'Please upload a CV before submitting.'}
                        </Typography>
                    )}
                </Box>

                {/* Target Job Autocomplete */}
                <Controller
                    name="jobTarget"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            freeSolo
                            options={jobOptions}
                            value={field.value}
                            // onInputChange={(_, val, reason) => {
                            //     if (reason === 'input') {
                            //         field.onChange(val);
                            //     }
                            // }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                if (params.inputValue && !options.includes(params.inputValue)) {
                                    filtered.unshift(`Add "${params.inputValue}"`);
                                }
                                return filtered;
                            }}
                            onChange={(_, val) => {
                                if (typeof val === 'string' && val.startsWith('Add "')) {
                                    const custom = val.slice(5, -1);
                                    setJobOptions(prev => [custom, ...prev]);
                                    field.onChange(custom);
                                } else {
                                    field.onChange(val ?? '');
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Target Job"
                                    placeholder="ex: Software Engineer"
                                    error={!!errors.jobTarget}
                                    helperText={errors.jobTarget?.message}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0px' } }}
                                />
                            )}
                        />
                    )}
                />

                {/* Market Select */}
                <Controller
                    name="market"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.market} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0px' } }}>
                            <InputLabel>Market</InputLabel>
                            <Select {...field} label="Market" sx={{ borderRadius: '0px' }}>
                                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                <MenuItem value="International">International</MenuItem>
                            </Select>
                            {errors.market && <FormHelperText>{errors.market.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {/* Submit Button */}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isPending || status === 'uploading' || status === 'analyzing'}
                    startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    sx={{ py: 2, height: 'auto' }}
                >
                    {isPending ? 'Processing Analysis...' : 'Start Executive Review'}
                </Button>

                {/* Progress Indicator */}
                {(status === 'uploading' || status === 'analyzing') && (
                    <Box>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
                            <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', color: '#64748B' }}>
                                {status === 'uploading' ? 'Uploading CV...' : 'Analyzing with AI...'}
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif', color: '#C5A059', fontWeight: 600 }}>
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
                        <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 1 }}>
                            {['Upload', 'Analyze', 'Complete'].map((step, i) => {
                                const stepValue = i === 0 ? 33 : i === 1 ? 66 : 100;
                                const currentValue = status === 'uploading' ? 33 : 66;
                                const active = stepValue <= currentValue;
                                return (
                                    <Typography
                                        key={step}
                                        sx={{
                                            fontSize: '0.65rem',
                                            fontFamily: 'Montserrat, sans-serif',
                                            letterSpacing: 1,
                                            textTransform: 'uppercase',
                                            color: active ? '#C5A059' : '#CBD5E1',
                                            fontWeight: active ? 700 : 400,
                                        }}
                                    >
                                        {step}
                                    </Typography>
                                );
                            })}
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
};

export default CVUpload;
