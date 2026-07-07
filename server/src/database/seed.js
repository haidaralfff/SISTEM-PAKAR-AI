const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const { pool, testConnection } = require('../config/database')
const env = require('../config/env')
const logger = require('../utils/logger')

const runSeeders = async () => {
  const connected = await testConnection()
  if (!connected) {
    logger.error('Cannot run seeders: database connection failed')
    process.exit(1)
  }

  const seedersDir = path.resolve(__dirname, 'seeders')
  const files = fs.readdirSync(seedersDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const filePath = path.join(seedersDir, file)
    const sql = fs.readFileSync(filePath, 'utf-8')
    try {
      await pool.query(sql)
      logger.info(`Seed applied: ${file}`)
    } catch (err) {
      logger.warn(`Seed ${file} may already exist or skipped`, { message: err.message })
    }
  }

  const adminPassword = await bcrypt.hash('admin123', env.bcryptSaltRounds)
  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    ['Admin Ruang Pulih', 'admin@ruangpulih.com', adminPassword, 'admin']
  )
  logger.info('Admin user seeded: admin@ruangpulih.com / admin123')

  logger.info('All seeders applied successfully')
}

runSeeders()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
