const fs = require('fs')
const path = require('path')
const { pool, testConnection } = require('../config/database')
const logger = require('../utils/logger')

const runMigrations = async () => {
  const connected = await testConnection()
  if (!connected) {
    logger.error('Cannot run migrations: database connection failed')
    process.exit(1)
  }

  const migrationsDir = path.resolve(__dirname, 'migrations')
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  logger.info(`Found ${files.length} migration files`)

  for (const file of files) {
    const filePath = path.join(migrationsDir, file)
    const sql = fs.readFileSync(filePath, 'utf-8')
    try {
      await pool.query(sql)
      logger.info(`Migration applied: ${file}`)
    } catch (err) {
      logger.error(`Migration failed: ${file}`, { message: err.message })
      throw err
    }
  }

  logger.info('All migrations applied successfully')
}

runMigrations()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
