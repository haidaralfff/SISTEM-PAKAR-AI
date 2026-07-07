const authService = require('../services/auth.service')

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.validatedBody)
    res.status(201).json(user)
  } catch (err) { next(err) }
}

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.validatedBody)
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth',
    })
    res.json({ accessToken: result.accessToken, user: result.user })
  } catch (err) { next(err) }
}

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken
    const result = await authService.refresh(refreshToken)
    res.json(result)
  } catch (err) { next(err) }
}

const logout = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken', { path: '/api/auth' })
    res.status(204).end()
  } catch (err) { next(err) }
}

const getProfile = async (req, res, next) => {
  try {
    const profile = await authService.getProfile(req.user.id)
    res.json(profile)
  } catch (err) { next(err) }
}

const updateProfile = async (req, res, next) => {
  try {
    const updated = await authService.updateProfile(req.user.id, req.validatedBody)
    res.json(updated)
  } catch (err) { next(err) }
}

const changePassword = async (req, res, next) => {
  try {
    await authService.changePassword(req.user.id, req.validatedBody)
    res.json({ message: 'Password berhasil diubah' })
  } catch (err) { next(err) }
}

module.exports = { register, login, refresh, logout, getProfile, updateProfile, changePassword }
