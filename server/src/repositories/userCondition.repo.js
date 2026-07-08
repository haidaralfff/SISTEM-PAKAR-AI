const { query } = require('../config/database')

const findAll = async () => {
  const { rows } = await query(
    'SELECT * FROM user_conditions WHERE is_active = true ORDER BY display_order ASC'
  )
  return rows
}

const findByCode = async (code) => {
  const { rows } = await query('SELECT * FROM user_conditions WHERE code = $1', [code])
  return rows[0] || null
}

const findById = async (id) => {
  const { rows } = await query('SELECT * FROM user_conditions WHERE id = $1', [id])
  return rows[0] || null
}

module.exports = { findAll, findByCode, findById }
