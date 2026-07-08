const { query } = require('../config/database')

const create = async ({ user_id, disease_id, result, belief, has_high_risk_flag }) => {
  const { rows } = await query(
    `INSERT INTO consultations (user_id, disease_id, result, belief, has_high_risk_flag)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, disease_id, result, belief, has_high_risk_flag]
  )
  return rows[0]
}

const addDetail = async ({ consultation_id, symptom_id, cf_user }) => {
  const { rows } = await query(
    `INSERT INTO consultation_details (consultation_id, symptom_id, cf_user)
     VALUES ($1, $2, $3) RETURNING *`,
    [consultation_id, symptom_id, cf_user]
  )
  return rows[0]
}

const findByUser = async (user_id, { page = 1, limit = 10, from, to, severity } = {}) => {
  const conditions = ['c.user_id = $1']
  const values = [user_id]
  let idx = 2

  if (from) {
    conditions.push(`c.created_at >= $${idx}`)
    values.push(from)
    idx++
  }
  if (to) {
    conditions.push(`c.created_at <= $${idx}`)
    values.push(to)
    idx++
  }
  if (severity) {
    conditions.push(`d.severity_level = $${idx}`)
    values.push(severity)
    idx++
  }

  const offset = (page - 1) * limit
  const { rows } = await query(
    `SELECT c.*, d.severity_level, d.name AS disease_name
     FROM consultations c
     LEFT JOIN diseases d ON d.id = c.disease_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY c.created_at DESC
     LIMIT $${idx} OFFSET $${idx + 1}`,
    [...values, limit, offset]
  )
  return rows
}

const countByUser = async (user_id) => {
  const { rows } = await query(
    'SELECT COUNT(*)::int AS total FROM consultations WHERE user_id = $1',
    [user_id]
  )
  return rows[0].total
}

const findById = async (id) => {
  const { rows } = await query(
    `SELECT c.*, d.severity_level, d.name AS disease_name, d.description, d.solution
     FROM consultations c
     LEFT JOIN diseases d ON d.id = c.disease_id
     WHERE c.id = $1`,
    [id]
  )
  return rows[0] || null
}

const findDetailsByConsultationId = async (consultation_id) => {
  const { rows } = await query(
    `SELECT cd.*, s.name AS symptom_name, s.code AS symptom_code
     FROM consultation_details cd
     JOIN symptoms s ON s.id = cd.symptom_id
     WHERE cd.consultation_id = $1
     ORDER BY s.code`,
    [consultation_id]
  )
  return rows
}

const remove = async (id, user_id) => {
  const { rows } = await query(
    'DELETE FROM consultations WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, user_id]
  )
  return rows[0] || null
}

const countAll = async () => {
  const { rows } = await query('SELECT COUNT(*)::int AS total FROM consultations')
  return rows[0].total
}

const countBySeverity = async () => {
  const { rows } = await query(
    `SELECT d.severity_level, COUNT(*)::int AS total
     FROM consultations c
     JOIN diseases d ON d.id = c.disease_id
     GROUP BY d.severity_level`
  )
  return rows
}

const findHighRisk = async (limit = 5) => {
  const { rows } = await query(
    `SELECT c.id, c.created_at, c.belief, d.name AS disease_name
     FROM consultations c
     JOIN diseases d ON d.id = c.disease_id
     WHERE c.has_high_risk_flag = true
     ORDER BY c.created_at DESC
     LIMIT $1`,
    [limit]
  )
  return rows
}

module.exports = {
  create, addDetail, findByUser, countByUser, findById, findDetailsByConsultationId, remove, countAll, countBySeverity, findHighRisk,
}
