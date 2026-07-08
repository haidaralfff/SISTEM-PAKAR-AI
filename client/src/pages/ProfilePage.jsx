import { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Box,
  InputAdornment,
  Skeleton,
  IconButton,
} from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'
import { useUpdateProfile, useChangePassword } from '../features/auth/hooks/useAuth'
import { getProfile } from '../features/auth/api'

const profileSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().min(1, 'Email harus diisi').email('Email tidak valid'),
})

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Password lama harus diisi'),
    newPassword: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password harus mengandung huruf dan angka'),
    confirmNewPassword: z.string().min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirmNewPassword'],
  })

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user)
  const setAuth = useAuthStore((s) => s.setAuth)
  const accessToken = useAuthStore((s) => s.accessToken)
  const { mutate: updateProfile, isPending: updating, error: updateError, isSuccess: updateSuccess } = useUpdateProfile()
  const { mutate: changePassword, isPending: changing, error: changeError, isSuccess: changeSuccess } = useChangePassword()

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  useEffect(() => {
    if (profileData?.data) {
      setAuth(profileData.data, accessToken)
    }
  }, [profileData])

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  })

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSubmit = (data) => updateProfile(data)
  const onPasswordSubmit = (data) => {
    changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword })
    passwordForm.reset()
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 400, fontFamily: '"Inter Tight Variable", sans-serif', color: '#0c0a09' }}>
        Profil
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 400, color: '#0c0a09' }}>
            <PersonOutlinedIcon fontSize="small" sx={{ color: '#3ba6f1' }} /> Edit Profil
          </Typography>

          {isLoading ? (
            <Box><Skeleton height={56} sx={{ mb: 2 }} /><Skeleton height={56} sx={{ mb: 2 }} /></Box>
          ) : (
            <>
              {updateSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>Profil berhasil diperbarui</Alert>
              )}
              {updateError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {updateError.response?.data?.message || 'Gagal memperbarui profil'}
                </Alert>
              )}

              <Box component="form" onSubmit={profileForm.handleSubmit(onProfileSubmit)} noValidate>
                <TextField
                  label="Nama Lengkap"
                  fullWidth
                  margin="normal"
                  {...profileForm.register('name')}
                  error={!!profileForm.formState.errors.name}
                  helperText={profileForm.formState.errors.name?.message}
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
                  fullWidth
                  margin="normal"
                  {...profileForm.register('email')}
                  error={!!profileForm.formState.errors.email}
                  helperText={profileForm.formState.errors.email?.message}
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
                <Button type="submit" variant="contained" disabled={updating} sx={{ mt: 2, border: '1px solid #3398e1' }}>
                  {updating ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 400, color: '#0c0a09' }}>
            <VpnKeyOutlinedIcon fontSize="small" sx={{ color: '#3ba6f1' }} /> Ganti Password
          </Typography>

          {changeSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>Password berhasil diubah</Alert>
          )}
          {changeError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {changeError.response?.data?.message || 'Gagal mengubah password'}
            </Alert>
          )}

          <Box component="form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} noValidate>
            <TextField
              label="Password Lama"
              type={showOld ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...passwordForm.register('oldPassword')}
              error={!!passwordForm.formState.errors.oldPassword}
              helperText={passwordForm.formState.errors.oldPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOld(!showOld)} edge="end" size="small">
                        {showOld ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Password Baru"
              type={showNew ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...passwordForm.register('newPassword')}
              error={!!passwordForm.formState.errors.newPassword}
              helperText={passwordForm.formState.errors.newPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNew(!showNew)} edge="end" size="small">
                        {showNew ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Konfirmasi Password Baru"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...passwordForm.register('confirmNewPassword')}
              error={!!passwordForm.formState.errors.confirmNewPassword}
              helperText={passwordForm.formState.errors.confirmNewPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" sx={{ color: '#a8a29e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" size="small">
                        {showConfirm ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button type="submit" variant="contained" disabled={changing} sx={{ mt: 2, border: '1px solid #3398e1' }}>
              {changing ? 'Mengubah...' : 'Ubah Password'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilePage
