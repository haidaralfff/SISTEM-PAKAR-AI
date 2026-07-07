import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Box,
  InputAdornment,
} from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../store/authStore'
import { useUpdateProfile, useChangePassword } from '../features/auth/hooks/useAuth'

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
  const { mutate: updateProfile, isPending: updating, error: updateError, isSuccess: updateSuccess } = useUpdateProfile()
  const { mutate: changePassword, isPending: changing, error: changeError, isSuccess: changeSuccess } = useChangePassword()

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
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Profil
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonOutlinedIcon fontSize="small" /> Edit Profil
          </Typography>

          {updateSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profil berhasil diperbarui
            </Alert>
          )}
          {updateError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {updateError.response?.data?.message || 'Gagal memperbarui profil'}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            noValidate
          >
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
              {...profileForm.register('email')}
              error={!!profileForm.formState.errors.email}
              helperText={profileForm.formState.errors.email?.message}
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
            <Button
              type="submit"
              variant="contained"
              disabled={updating}
              sx={{ mt: 2 }}
            >
              {updating ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VpnKeyOutlinedIcon fontSize="small" /> Ganti Password
          </Typography>

          {changeSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password berhasil diubah
            </Alert>
          )}
          {changeError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {changeError.response?.data?.message || 'Gagal mengubah password'}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            noValidate
          >
            <TextField
              label="Password Lama"
              type="password"
              fullWidth
              margin="normal"
              {...passwordForm.register('oldPassword')}
              error={!!passwordForm.formState.errors.oldPassword}
              helperText={passwordForm.formState.errors.oldPassword?.message}
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
              label="Password Baru"
              type="password"
              fullWidth
              margin="normal"
              {...passwordForm.register('newPassword')}
              error={!!passwordForm.formState.errors.newPassword}
              helperText={passwordForm.formState.errors.newPassword?.message}
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
              label="Konfirmasi Password Baru"
              type="password"
              fullWidth
              margin="normal"
              {...passwordForm.register('confirmNewPassword')}
              error={!!passwordForm.formState.errors.confirmNewPassword}
              helperText={passwordForm.formState.errors.confirmNewPassword?.message}
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
              disabled={changing}
              sx={{ mt: 2 }}
            >
              {changing ? 'Mengubah...' : 'Ubah Password'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilePage
