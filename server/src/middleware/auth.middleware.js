const jwt = require('jsonwebtoken')
const env = require('../config/env')
const logger = require('../utils/logger')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.jwt.secret)
    req.user = decoded
    next()
  } catch (err) {
    logger.warn('Invalid access token', { message: err.message })
    return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa.' })
  }
}

module.exports = { authenticate }
