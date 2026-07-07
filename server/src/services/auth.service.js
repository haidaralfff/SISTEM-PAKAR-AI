const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../config/env')
const userRepo = require('../repositories/user.repo')
const { createError } = require('../middleware/errorHandler.middleware')
const logger = require('../utils/logger')

const register = async ({ name, email, password }) => {
  const existing = await userRepo.findByEmail(email)
  if (existing) {
    throw createError(409, 'Email sudah terdaftar')
  }

  const hashedPassword = await bcrypt.hash(password, env.bcryptSaltRounds)
  const user = await userRepo.create({ name, email, password: hashedPassword })
  logger.info('User registered', { userId: user.id, email: user.email })
  return user
}

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email)
  if (!user) {
    throw createError(401, 'Email atau password salah')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw createError(401, 'Email atau password salah')
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.accessExpiresIn }
  )

  const refreshToken = jwt.sign(
    { id: user.id },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn }
  )

  logger.info('User logged in', { userId: user.id })
  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, created_at: user.created_at },
  }
}

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(401, 'Refresh token diperlukan')
  }

  let decoded
  try {
    decoded = jwt.verify(refreshToken, env.jwt.refreshSecret)
  } catch {
    throw createError(401, 'Refresh token tidak valid atau kedaluwarsa')
  }

  const user = await userRepo.findById(decoded.id)
  if (!user) {
    throw createError(401, 'Pengguna tidak ditemukan')
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.accessExpiresIn }
  )

  return { accessToken }
}

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId)
  if (!user) {
    throw createError(404, 'Pengguna tidak ditemukan')
  }
  return user
}

const updateProfile = async (userId, { name, email }) => {
  if (email) {
    const existing = await userRepo.findByEmail(email)
    if (existing && existing.id !== userId) {
      throw createError(409, 'Email sudah digunakan')
    }
  }

  const updated = await userRepo.update(userId, { name, email })
  if (!updated) {
    throw createError(404, 'Pengguna tidak ditemukan')
  }
  return updated
}

const changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await userRepo.findById(userId)
  if (!user) {
    throw createError(404, 'Pengguna tidak ditemukan')
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password)
  if (!isMatch) {
    throw createError(400, 'Password lama salah')
  }

  const hashedPassword = await bcrypt.hash(newPassword, env.bcryptSaltRounds)
  await userRepo.update(userId, { password: hashedPassword })
  logger.info('Password changed', { userId })
}

module.exports = { register, login, refresh, getProfile, updateProfile, changePassword }
