const { query } = require('../config/database')

const create = async ({ actor_id, action, entity, entity_id, detail }) => {
  const { rows } = await query(
    `INSERT INTO audit_logs (actor_id, action, entity, entity_id, detail)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [actor_id, action, entity, entity_id, detail ? JSON.stringify(detail) : null]
  )
  return rows[0]
}

const findAll = async ({ entity, actor_id, page = 1, limit = 50 } = {}) => {
  const conditions = []
  const values = []
  let idx = 1
  if (entity) {
    conditions.push(`entity = $${idx}`)
    values.push(entity)
    idx++
  }
  if (actor_id) {
    conditions.push(`actor_id = $${idx}`)
    values.push(actor_id)
    idx++
  }
  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit
  const { rows } = await query(
    `SELECT a.*, u.name AS actor_name
     FROM audit_logs a
     LEFT JOIN users u ON u.id = a.actor_id
     ${where}
     ORDER BY a.created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    [...values, limit, offset]
  )
  return rows
}

module.exports = { create, findAll }
