const diseaseRepo = require('../repositories/disease.repo')
const auditRepo = require('../repositories/audit.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const list = async (queryParams) => {
  const data = await diseaseRepo.findAll(queryParams)
  const total = await diseaseRepo.countAll()
  return { data, meta: { total, page: parseInt(queryParams.page) || 1, limit: parseInt(queryParams.limit) || 50 } }
}

const getById = async (id) => {
  const disease = await diseaseRepo.findById(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  return disease
}

const create = async (data, actorId) => {
  const existing = await diseaseRepo.findByCode(data.code)
  if (existing) throw createError(409, `Kode diagnosis ${data.code} sudah ada`)
  const disease = await diseaseRepo.create(data)
  await auditRepo.create({
    actor_id: actorId,
    action: 'CREATE_DISEASE',
    entity: 'diseases',
    entity_id: disease.id,
    detail: { data },
  })
  return disease
}

const update = async (id, data, actorId) => {
  const disease = await diseaseRepo.findById(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  if (data.code && data.code !== disease.code) {
    const existing = await diseaseRepo.findByCode(data.code)
    if (existing) throw createError(409, `Kode diagnosis ${data.code} sudah ada`)
  }
  const updated = await diseaseRepo.update(id, data)
  await auditRepo.create({
    actor_id: actorId,
    action: 'UPDATE_DISEASE',
    entity: 'diseases',
    entity_id: id,
    detail: { before: disease, after: updated },
  })
  return updated
}

const remove = async (id, actorId) => {
  const disease = await diseaseRepo.findById(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  await diseaseRepo.softDelete(id)
  await auditRepo.create({
    actor_id: actorId,
    action: 'DELETE_DISEASE',
    entity: 'diseases',
    entity_id: id,
    detail: { data: disease },
  })
  return { message: 'Diagnosis berhasil dinonaktifkan' }
}

module.exports = { list, getById, create, update, remove }
