const symptomRepo = require('../repositories/symptom.repo')
const auditRepo = require('../repositories/audit.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const list = async (queryParams) => {
  const data = await symptomRepo.findAll(queryParams)
  const total = await symptomRepo.countAll()
  return { data, meta: { total, page: parseInt(queryParams.page) || 1, limit: parseInt(queryParams.limit) || 50 } }
}

const getById = async (id) => {
  const symptom = await symptomRepo.findById(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  return symptom
}

const create = async (data, actorId) => {
  const existing = await symptomRepo.findByCode(data.code)
  if (existing) throw createError(409, `Kode gejala ${data.code} sudah ada`)
  const symptom = await symptomRepo.create(data)
  await auditRepo.create({
    actor_id: actorId,
    action: 'CREATE_SYMPTOM',
    entity: 'symptoms',
    entity_id: symptom.id,
    detail: { data },
  })
  return symptom
}

const update = async (id, data, actorId) => {
  const symptom = await symptomRepo.findById(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  if (data.code && data.code !== symptom.code) {
    const existing = await symptomRepo.findByCode(data.code)
    if (existing) throw createError(409, `Kode gejala ${data.code} sudah ada`)
  }
  const updated = await symptomRepo.update(id, data)
  await auditRepo.create({
    actor_id: actorId,
    action: 'UPDATE_SYMPTOM',
    entity: 'symptoms',
    entity_id: id,
    detail: { before: symptom, after: updated },
  })
  return updated
}

const remove = async (id, actorId) => {
  const symptom = await symptomRepo.findById(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  await symptomRepo.softDelete(id)
  await auditRepo.create({
    actor_id: actorId,
    action: 'DELETE_SYMPTOM',
    entity: 'symptoms',
    entity_id: id,
    detail: { data: symptom },
  })
  return { message: 'Gejala berhasil dinonaktifkan' }
}

module.exports = { list, getById, create, update, remove }
