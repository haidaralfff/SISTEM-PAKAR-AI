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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useLogin } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

const LoginForm = () => {
  const { mutate: login, isPending, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data) => login(data)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'Login gagal'}
        </Alert>
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        autoComplete="email"
        {...register('email')}
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
        autoComplete="current-password"
        {...register('password')}
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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isPending}
        sx={{ mt: 2, mb: 1 }}
      >
        {isPending ? 'Memproses...' : 'Masuk'}
      </Button>

      <Typography variant="body2" align="center" className="mt-1 text-warm-gray">
        Belum punya akun?{' '}
        <Link to="/register" className="text-cyan-signal no-underline hover:text-cyan-edge">
          Daftar
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm
