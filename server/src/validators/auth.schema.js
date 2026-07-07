const { z } = require('zod')

const registerSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').max(150, 'Nama maksimal 150 karakter'),
  email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password harus mengandung huruf dan angka'),
})

const loginSchema = z.object({
  email: z.string().min(1, 'Email harus diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').max(150).optional(),
  email: z.string().email('Format email tidak valid').optional(),
})

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Password lama harus diisi'),
  newPassword: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password harus mengandung huruf dan angka'),
})

const refreshSchema = z.object({
  refreshToken: z.string().optional(),
})

module.exports = { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema, refreshSchema }
