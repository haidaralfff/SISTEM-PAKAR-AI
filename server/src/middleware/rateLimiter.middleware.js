const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Terlalu banyak percobaan. Silakan tunggu beberapa menit.' },
})

module.exports = { authLimiter }
