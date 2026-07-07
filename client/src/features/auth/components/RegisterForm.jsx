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
} from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
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

const RegisterForm = () => {
  const { mutate: register, isPending, error } = useRegister()
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const onSubmit = (data) => register({ name: data.name, email: data.email, password: data.password })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'Pendaftaran gagal'}
        </Alert>
      )}

      <TextField
        label="Nama Lengkap"
        fullWidth
        margin="normal"
        autoComplete="name"
        {...reg('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        autoComplete="email"
        {...reg('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        autoComplete="new-password"
        {...reg('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Konfirmasi Password"
        type="password"
        fullWidth
        margin="normal"
        autoComplete="new-password"
        {...reg('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isPending}
        sx={{ mt: 2, mb: 1 }}
      >
        {isPending ? 'Memproses...' : 'Daftar'}
      </Button>

      <Typography variant="body2" align="center" className="mt-1 text-warm-gray">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-cyan-signal no-underline hover:text-cyan-edge">
          Masuk
        </Link>
      </Typography>
    </Box>
  )
}

export default RegisterForm
