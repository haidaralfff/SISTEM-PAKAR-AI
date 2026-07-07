const { query } = require('../config/database')

const findAll = async ({ disease_id } = {}) => {
  const conditions = []
  const values = []
  let idx = 1
  if (disease_id) {
    conditions.push(`r.disease_id = $${idx}`)
    values.push(disease_id)
    idx++
  }
  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const { rows } = await query(
    `SELECT r.*, s.name AS symptom_name, s.code AS symptom_code,
            d.name AS disease_name, d.code AS disease_code
     FROM rules r
     JOIN symptoms s ON s.id = r.symptom_id
     JOIN diseases d ON d.id = r.disease_id
     ${where}
     ORDER BY d.code, s.code`,
    values
  )
  return rows
}

const findById = async (id) => {
  const { rows } = await query(
    `SELECT r.*, s.name AS symptom_name, d.name AS disease_name
     FROM rules r
     JOIN symptoms s ON s.id = r.symptom_id
     JOIN diseases d ON d.id = r.disease_id
     WHERE r.id = $1`,
    [id]
  )
  return rows[0] || null
}

const create = async ({ disease_id, symptom_id, cf_expert, created_by }) => {
  const { rows } = await query(
    `INSERT INTO rules (disease_id, symptom_id, cf_expert, created_by)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (disease_id, symptom_id) DO UPDATE SET cf_expert = $3, created_by = $4
     RETURNING *`,
    [disease_id, symptom_id, cf_expert, created_by]
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
    `UPDATE rules SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  )
  return rows[0] || null
}

const remove = async (id) => {
  const { rows } = await query('DELETE FROM rules WHERE id = $1 RETURNING id', [id])
  return rows[0] || null
}

const countAll = async () => {
  const { rows } = await query('SELECT COUNT(*)::int AS total FROM rules')
  return rows[0].total
}

module.exports = { findAll, findById, create, update, remove, countAll }
