const { query } = require('../config/database')

const findAll = async ({ severity, page = 1, limit = 50 } = {}) => {
  const conditions = ['is_active = true']
  const values = []
  let idx = 1
  if (severity) {
    conditions.push(`severity_level = $${idx}`)
    values.push(severity)
    idx++
  }
  const offset = (page - 1) * limit
  const sql = `SELECT * FROM diseases WHERE ${conditions.join(' AND ')} ORDER BY code LIMIT $${idx} OFFSET $${idx + 1}`
  values.push(limit, offset)
  const { rows } = await query(sql, values)
  return rows
}

const findById = async (id) => {
  const { rows } = await query('SELECT * FROM diseases WHERE id = $1 AND is_active = true', [id])
  return rows[0] || null
}

const findByCode = async (code) => {
  const { rows } = await query('SELECT * FROM diseases WHERE code = $1', [code])
  return rows[0] || null
}

const create = async ({ code, name, severity_level, description, solution }) => {
  const { rows } = await query(
    `INSERT INTO diseases (code, name, severity_level, description, solution)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [code, name, severity_level, description, solution]
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
  values.push(id)
  const { rows } = await query(
    `UPDATE diseases SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  )
  return rows[0] || null
}

const softDelete = async (id) => {
  const { rows } = await query(
    'UPDATE diseases SET is_active = false WHERE id = $1 AND is_active = true RETURNING id',
    [id]
  )
  return rows[0] || null
}

const countAll = async () => {
  const { rows } = await query('SELECT COUNT(*)::int AS total FROM diseases WHERE is_active = true')
  return rows[0].total
}

module.exports = { findAll, findById, findByCode, create, update, softDelete, countAll }
