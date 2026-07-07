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
    fontFamily: '"Roboto", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body2: { color: '#78716c' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 9999, textTransform: 'none', fontWeight: 500 },
        containedPrimary: { color: '#ffffff' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #e8e6e5',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 6 } },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 9999 } },
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
