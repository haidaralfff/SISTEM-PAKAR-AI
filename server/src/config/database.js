const { Pool } = require('pg')
const env = require('./env')
const logger = require('../utils/logger')

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

pool.on('error', (err) => {
  logger.error('Unexpected database pool error', { message: err.message })
})

const query = (text, params) => pool.query(text, params)

const getClient = () => pool.connect()

const testConnection = async () => {
  try {
    await pool.query('SELECT 1')
    logger.info('Database connection established')
    return true
  } catch (err) {
    logger.error('Database connection failed', { message: err.message })
    return false
  }
}

module.exports = { pool, query, getClient, testConnection }
