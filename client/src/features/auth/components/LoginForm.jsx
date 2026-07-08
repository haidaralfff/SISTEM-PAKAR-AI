import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import {
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useLogin } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    '& fieldset': { borderColor: '#e8e6e5' },
    '&:hover fieldset': { borderColor: '#d6d3d1' },
    '&.Mui-focused fieldset': { borderColor: '#3ba6f1' },
  },
  '& .MuiInputLabel-root': { fontFamily: '"Inter Variable", sans-serif', color: '#78716c' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#3ba6f1' },
  '& .MuiInputBase-input': { fontFamily: '"Inter Variable", sans-serif', fontSize: 14 },
}

const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => login(data)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: '6px',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 13,
            border: '1px solid #fecaca',
            bgcolor: '#fef2f2',
          }}
        >
          {error.response?.data?.message || 'Email atau password salah'}
        </Alert>
      )}

      <TextField
        label="Email"
        placeholder="Masukkan email"
        type="email"
        fullWidth
        margin="normal"
        autoComplete="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={fieldSx}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Password"
        placeholder="Masukkan password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={fieldSx}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: '#a8a29e', '&:hover': { color: '#78716c' } }}
                >
                  {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isPending}
        endIcon={isPending ? null : <ArrowForwardIcon />}
        sx={{
          mt: 3,
          mb: 1.5,
          py: 1.3,
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 15,
          fontFamily: '"Inter Variable", sans-serif',
          bgcolor: 'linear-gradient(135deg, #3ba6f1 0%, #2196f3 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 16px rgba(59, 166, 241, 0.35)',
          border: 'none',
          letterSpacing: '0.02em',
          '&:hover': {
            bgcolor: 'linear-gradient(135deg, #3398e1 0%, #1e88e5 100%)',
            boxShadow: '0 6px 24px rgba(59, 166, 241, 0.45)',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)', boxShadow: '0 2px 8px rgba(59, 166, 241, 0.3)' },
          '&.Mui-disabled': {
            bgcolor: '#d6d3d1',
            color: '#ffffff',
            border: 'none',
            boxShadow: 'none',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {isPending ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CircularProgress size={18} sx={{ color: '#ffffff' }} />
            Memproses...
          </Box>
        ) : (
          'Masuk'
        )}
      </Button>

      <Divider sx={{ my: 2.5, borderColor: '#e8e6e5' }}>
        <Typography sx={{ fontSize: 12, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif' }}>
          atau
        </Typography>
      </Divider>

      <Typography
        variant="body2"
        align="center"
        sx={{
          color: '#78716c',
          fontFamily: '"Inter Variable", sans-serif',
          fontSize: 13,
        }}
      >
        Belum punya akun?{' '}
        <Link
          to="/register"
          style={{
            color: '#3ba6f1',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Daftar sekarang
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm
