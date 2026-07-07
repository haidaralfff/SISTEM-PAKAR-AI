const app = require('./app')
const env = require('./config/env')
const { testConnection } = require('./config/database')
const logger = require('./utils/logger')

const start = async () => {
  const dbConnected = await testConnection()
  if (!dbConnected) {
    logger.warn('Starting server without database connection. Some endpoints may fail.')
  }

  app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port} in ${env.nodeEnv} mode`)
  })
}

start().catch((err) => {
  logger.error('Failed to start server', { message: err.message })
  process.exit(1)
})
