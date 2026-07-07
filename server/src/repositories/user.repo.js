const { query } = require('../config/database')

const findByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email])
  return rows[0] || null
}

const findById = async (id) => {
  const { rows } = await query(
    'SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = $1 AND is_active = true',
    [id]
  )
  return rows[0] || null
}

const create = async ({ name, email, password, role = 'user' }) => {
  const { rows } = await query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`,
    [name, email, password, role]
  )
  return rows[0]
}

const update = async (id, fields) => {
  const sets = []
  const values = []
  let idx = 1
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      sets.push(`${key} = $${idx}`)
      values.push(value)
      idx++
    }
  }
  if (sets.length === 0) return null
  sets.push(`updated_at = NOW()`)
  values.push(id)
  const { rows } = await query(
    `UPDATE users SET ${sets.join(', ')} WHERE id = $${idx}
     RETURNING id, name, email, role, created_at, updated_at`,
    values
  )
  return rows[0] || null
}

const softDelete = async (id) => {
  const { rows } = await query(
    `UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1 AND is_active = true
     RETURNING id`,
    [id]
  )
  return rows[0] || null
}

const findAll = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit
  const { rows } = await query(
    `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at,
            COUNT(c.id) AS consultation_count
     FROM users u
     LEFT JOIN consultations c ON c.user_id = u.id
     WHERE u.is_active = true
     GROUP BY u.id
     ORDER BY u.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  )
  return rows
}

const countAll = async () => {
  const { rows } = await query('SELECT COUNT(*)::int AS total FROM users WHERE is_active = true')
  return rows[0].total
}

module.exports = { findByEmail, findById, create, update, softDelete, findAll, countAll }
