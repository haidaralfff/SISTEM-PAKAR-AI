const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const envPath = path.resolve(__dirname, '../../.env')
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath })
}

const generateSecrets = () => {
  let envContent = ''
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8')
  }

  if (!process.env.JWT_SECRET) {
    const secret = crypto.randomBytes(64).toString('hex')
    process.env.JWT_SECRET = secret
    if (envContent.includes('JWT_SECRET=')) {
      envContent = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${secret}`)
    } else {
      envContent += `\nJWT_SECRET=${secret}`
    }
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    const secret = crypto.randomBytes(64).toString('hex')
    process.env.JWT_REFRESH_SECRET = secret
    if (envContent.includes('JWT_REFRESH_SECRET=')) {
      envContent = envContent.replace(/JWT_REFRESH_SECRET=.*/g, `JWT_REFRESH_SECRET=${secret}`)
    } else {
      envContent += `\nJWT_REFRESH_SECRET=${secret}`
    }
  }

  fs.writeFileSync(envPath, envContent, 'utf-8')
}

generateSecrets()

const env = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'ruang_pulih',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
}

module.exports = env
