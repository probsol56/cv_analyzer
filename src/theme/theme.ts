// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0F172A', // Midnight Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#C5A059', // Champagne Gold
        },
        background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#0F172A',
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '2.25rem',
            color: '#0F172A',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#334155',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0px', // Sharp corners for a more professional, architectural look
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '1px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '1px solid #E2E8F0',
                },
            },
        },
    },
});
