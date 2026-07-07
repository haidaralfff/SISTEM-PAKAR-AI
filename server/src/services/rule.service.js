const ruleRepo = require('../repositories/rule.repo')
const auditRepo = require('../repositories/audit.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const list = async (queryParams) => {
  return ruleRepo.findAll(queryParams)
}

const getById = async (id) => {
  const rule = await ruleRepo.findById(id)
  if (!rule) throw createError(404, 'Rule tidak ditemukan')
  return rule
}

const create = async (data, actorId) => {
  const rule = await ruleRepo.create({ ...data, created_by: actorId })
  await auditRepo.create({
    actor_id: actorId,
    action: 'CREATE_RULE',
    entity: 'rules',
    entity_id: rule.id,
    detail: { data },
  })
  return rule
}

const update = async (id, data, actorId) => {
  const existing = await ruleRepo.findById(id)
  if (!existing) throw createError(404, 'Rule tidak ditemukan')

  const updated = await ruleRepo.update(id, data)
  await auditRepo.create({
    actor_id: actorId,
    action: 'UPDATE_RULE',
    entity: 'rules',
    entity_id: id,
    detail: { before: existing, after: updated },
  })
  return updated
}

const remove = async (id, actorId) => {
  const existing = await ruleRepo.findById(id)
  if (!existing) throw createError(404, 'Rule tidak ditemukan')

  const deleted = await ruleRepo.remove(id)
  await auditRepo.create({
    actor_id: actorId,
    action: 'DELETE_RULE',
    entity: 'rules',
    entity_id: id,
    detail: { data: existing },
  })
  return { message: 'Rule berhasil dihapus' }
}

module.exports = { list, getById, create, update, remove }
