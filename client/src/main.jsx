import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    primary: { main: '#3ba6f1' },
    secondary: { main: '#78716c' },
    background: { default: '#fafaf9', paper: '#ffffff' },
    text: { primary: '#0c0a09', secondary: '#78716c' },
    divider: '#e8e6e5',
  },
  typography: {
    fontFamily: '"Inter Variable", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: { fontFamily: '"Inter Tight Variable", sans-serif', fontWeight: 500, fontSize: '32px', lineHeight: 1.25, letterSpacing: '-0.8px' },
    h5: { fontFamily: '"Inter Tight Variable", sans-serif', fontWeight: 500, fontSize: '20px', lineHeight: 1.2, letterSpacing: '-0.1px' },
    h6: { fontFamily: '"Inter Tight Variable", sans-serif', fontWeight: 500, fontSize: '18px', lineHeight: 1.22 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, fontSize: '14px', color: '#0c0a09' },
    body1: { fontSize: '14px', lineHeight: 1.64 },
    body2: { fontSize: '14px', lineHeight: 1.64, color: '#78716c' },
    caption: { fontSize: '12px', lineHeight: 1.53, color: '#a8a29e' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 9999, textTransform: 'none', fontWeight: 500, padding: '8px 16px' },
        containedPrimary: { color: '#ffffff', border: '1px solid #3398e1' },
        outlinedPrimary: { borderColor: '#e8e6e5', color: '#0c0a09', '&:hover': { borderColor: '#d6d3d1', bgcolor: 'transparent' } },
        textPrimary: { color: '#0c0a09', '&:hover': { bgcolor: 'transparent' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #e8e6e5',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': { borderColor: '#d6d3d1' },
            '&:hover fieldset': { borderColor: '#a8a29e' },
            '&.Mui-focused fieldset': { borderColor: '#3ba6f1', borderWidth: 2 },
          },
          '& .MuiInputLabel-root': { color: '#78716c' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#3ba6f1' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 9999 },
        outlined: { borderColor: '#e8e6e5', color: '#78716c' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { display: 'none' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400,
          color: '#0c0a09',
          borderRadius: 9999,
          border: '1px solid #e8e6e5',
          minHeight: 36,
          padding: '6px 16px',
          '&.Mui-selected': {
            bgcolor: '#1c1917',
            color: '#ffffff',
            borderColor: '#1c1917',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #e8e6e5',
          backgroundImage: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { bgcolor: '#3ba6f1' },
      },
    },
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
