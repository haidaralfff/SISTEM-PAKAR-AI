const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 }

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL] || LOG_LEVELS.info

const formatMsg = (level, msg, meta) => {
  const timestamp = new Date().toISOString()
  const base = `[${timestamp}] [${level.toUpperCase()}] ${msg}`
  if (meta) return `${base} ${JSON.stringify(meta)}`
  return base
}

const logger = {
  error: (msg, meta) => { if (currentLevel >= 0) console.error(formatMsg('error', msg, meta)) },
  warn: (msg, meta) => { if (currentLevel >= 1) console.warn(formatMsg('warn', msg, meta)) },
  info: (msg, meta) => { if (currentLevel >= 2) console.log(formatMsg('info', msg, meta)) },
  debug: (msg, meta) => { if (currentLevel >= 3) console.log(formatMsg('debug', msg, meta)) },
}

module.exports = logger
