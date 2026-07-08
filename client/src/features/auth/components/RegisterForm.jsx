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
} from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useRegister } from '../hooks/useAuth'

const registerSchema = z
  .object({
    name: z.string().min(1, 'Nama harus diisi'),
    email: z.string().min(1, 'Email harus diisi').email('Email tidak valid'),
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        'Password harus mengandung huruf dan angka',
      ),
    confirmPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirmPassword'],
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

const RegisterForm = () => {
  const { mutate: register, isPending, error } = useRegister()
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onSubmit = (data) => register({ name: data.name, email: data.email, password: data.password })

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
          {error.response?.data?.message || 'Pendaftaran gagal'}
        </Alert>
      )}

      <TextField
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        fullWidth
        margin="normal"
        autoComplete="name"
        {...reg('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={fieldSx}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Email"
        placeholder="contoh@email.com"
        type="email"
        fullWidth
        margin="normal"
        autoComplete="email"
        {...reg('email')}
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
        placeholder="Minimal 8 karakter"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="new-password"
        {...reg('password')}
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

      <TextField
        label="Konfirmasi Password"
        placeholder="Ulangi password"
        type={showConfirm ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="new-password"
        {...reg('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
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
                  onClick={() => setShowConfirm(!showConfirm)}
                  edge="end"
                  size="small"
                  sx={{ color: '#a8a29e', '&:hover': { color: '#78716c' } }}
                >
                  {showConfirm ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
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
        sx={{
          mt: 2.5,
          mb: 1.5,
          py: 1.1,
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 14,
          fontFamily: '"Inter Variable", sans-serif',
          bgcolor: '#3ba6f1',
          color: '#ffffff',
          border: '1px solid #3398e1',
          '&:hover': { bgcolor: '#3398e1' },
          '&.Mui-disabled': { bgcolor: '#d6d3d1', color: '#ffffff', border: 'none' },
        }}
      >
        {isPending ? 'Memproses...' : 'Daftar'}
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
        Sudah punya akun?{' '}
        <Link
          to="/login"
          style={{
            color: '#3ba6f1',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Masuk
        </Link>
      </Typography>
    </Box>
  )
}

export default RegisterForm
