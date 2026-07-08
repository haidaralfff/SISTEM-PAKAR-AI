const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const env = require('./config/env')
const routes = require('./routes')
const { errorHandler } = require('./middleware/errorHandler.middleware')
const { authLimiter } = require('./middleware/rateLimiter.middleware')
const logger = require('./utils/logger')

const app = express()

app.use(helmet())
app.use(cors({ origin: env.corsOrigin, credentials: true }))
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.use('/api/auth', authLimiter)
app.use('/api', routes)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

app.use(errorHandler)

module.exports = app
