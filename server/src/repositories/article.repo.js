const { query } = require('../config/database')

const findAll = async ({ diseaseCode, page = 1, limit = 20 } = {}) => {
  const conditions = ['is_published = true']
  const values = []
  let idx = 1

  if (diseaseCode) {
    conditions.push(`disease_code = $${idx}`)
    values.push(diseaseCode)
    idx++
  }

  const offset = (page - 1) * limit
  const sql = `
    SELECT a.*, u.name AS author_name
    FROM articles a
    LEFT JOIN users u ON a.created_by = u.id
    WHERE ${conditions.join(' AND ')}
    ORDER BY a.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}`
  values.push(limit, offset)

  const { rows } = await query(sql, values)
  return rows
}

const findById = async (id) => {
  const { rows } = await query(
    `SELECT a.*, u.name AS author_name
     FROM articles a
     LEFT JOIN users u ON a.created_by = u.id
     WHERE a.id = $1`,
    [id]
  )
  return rows[0] || null
}

const countAll = async ({ diseaseCode } = {}) => {
  const conditions = ['is_published = true']
  const values = []
  let idx = 1

  if (diseaseCode) {
    conditions.push(`disease_code = $${idx}`)
    values.push(diseaseCode)
    idx++
  }

  const sql = `SELECT COUNT(*)::int AS total FROM articles WHERE ${conditions.join(' AND ')}`
  const { rows } = await query(sql, values)
  return rows[0].total
}

module.exports = { findAll, findById, countAll }
