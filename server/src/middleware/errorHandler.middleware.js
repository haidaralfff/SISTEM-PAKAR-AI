const logger = require('../utils/logger')

const errorHandler = (err, req, res, _next) => {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  })

  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Terjadi kesalahan internal server'

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  })
}

const createError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  error.isOperational = true
  return error
}

module.exports = { errorHandler, createError }
