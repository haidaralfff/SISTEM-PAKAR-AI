import { Box, Typography, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AuthLayout = ({ title, children }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafaf9', display: 'flex', position: 'relative' }}>
      {/* Back Button — pojok kiri atas */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 10,
          color: '#78716c',
          textTransform: 'none',
          fontFamily: '"Inter Variable", sans-serif',
          fontSize: 13,
          bgcolor: 'rgba(250,250,249,0.8)',
          backdropFilter: 'blur(4px)',
          '&:hover': { color: '#0c0a09', bgcolor: '#f5f5f4' },
        }}
      >
        Kembali
      </Button>

      {/* Left Panel — Branding */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#1c1917',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ position: 'absolute', top: -120, right: -120, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 250, height: 250, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />

        <Box
          component="img"
          src="/logo.svg"
          alt="Ruang Pulih Logo"
          sx={{ width: 140, height: 140, mb: 4, filter: 'brightness(0) invert(1) brightness(1.1)' }}
        />

        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 500,
            fontSize: 28,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Ruang Pulih
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#a8a29e',
            textAlign: 'center',
            maxWidth: 300,
            lineHeight: 1.64,
          }}
        >
          Teman dalam proses pemulihan. Kenali kondisi Anda lebih awal
          dengan alat skrining yang dirancang oleh psikolog.
        </Typography>

        <Box sx={{ mt: 6, display: 'flex', gap: 4 }}>
          {[
            { value: '100%', label: 'Gratis' },
            { value: '<5 min', label: 'Proses' },
            { value: 'Privat', label: 'Data Aman' },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: '"Inter Tight Variable", sans-serif',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#ffffff',
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 12,
                  color: '#a8a29e',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Panel — Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6 },
          py: 6,
          position: 'relative',
        }}
      >
        {/* Mobile logo */}
        <Box
          component="img"
          src="/logo.svg"
          alt="Ruang Pulih"
          sx={{ width: 64, height: 64, mb: 2, display: { xs: 'block', md: 'none' } }}
        />

        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 500,
            fontSize: 24,
            color: '#0c0a09',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 3,
          }}
        >
          {title === 'Masuk'
            ? 'Selamat datang kembali! Masuk untuk melanjutkan.'
            : 'Buat akun baru dan mulai skrining pertama Anda.'}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 400,
            minHeight: { xs: 'auto', md: 420 },
            p: { xs: 3, md: 4 },
            borderRadius: '10px',
            border: '1px solid #e8e6e5',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </Paper>

        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 11,
            color: '#a8a29e',
            textAlign: 'center',
            mt: 3,
            maxWidth: 320,
          }}
        >
          Dengan masuk atau mendaftar, Anda menyetujui syarat & ketentuan
          dan kebijakan privasi Ruang Pulih.
        </Typography>
      </Box>
    </Box>
  )
}

export default AuthLayout
