import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { ToolDefinition } from '../../tools/registry';

interface ToolCardProps {
  tool: ToolDefinition;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();
  const Icon = tool.icon;

  return (
    <Paper
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
        '&:hover': {
          borderColor: 'secondary.main',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={() => navigate(tool.route)}
    >
      <Stack spacing={3} sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: 'secondary.main', fontSize: 26 }} />
          </Box>
          {tool.badge && (
            <Chip
              label={tool.badge.toUpperCase()}
              size="small"
              sx={{
                bgcolor: 'secondary.main',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                height: 22,
                borderRadius: 0,
              }}
            />
          )}
        </Stack>

        <Box>
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              letterSpacing: '0.12em',
              fontSize: '0.7rem',
            }}
          >
            {tool.tagline}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'primary.main',
              mt: 0.5,
              lineHeight: 1.3,
            }}
          >
            {tool.name}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, flex: 1 }}>
          {tool.description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              fontStyle: 'italic',
              fontSize: '0.75rem',
            }}
          >
            {tool.inputHint}
          </Typography>
          <Button
            variant="text"
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(tool.route);
            }}
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '0.75rem',
              p: 0,
              minWidth: 'auto',
              '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
            }}
          >
            Start
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ToolCard;
