const diseaseRepo = require('../repositories/disease.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const list = async (queryParams) => {
  return diseaseRepo.findAll(queryParams)
}

const getById = async (id) => {
  const disease = await diseaseRepo.findById(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  return disease
}

const create = async (data) => {
  const existing = await diseaseRepo.findByCode(data.code)
  if (existing) throw createError(409, `Kode diagnosis ${data.code} sudah ada`)
  return diseaseRepo.create(data)
}

const update = async (id, data) => {
  const disease = await diseaseRepo.findById(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  if (data.code && data.code !== disease.code) {
    const existing = await diseaseRepo.findByCode(data.code)
    if (existing) throw createError(409, `Kode diagnosis ${data.code} sudah ada`)
  }
  return diseaseRepo.update(id, data)
}

const remove = async (id) => {
  const disease = await diseaseRepo.softDelete(id)
  if (!disease) throw createError(404, 'Diagnosis tidak ditemukan')
  return { message: 'Diagnosis berhasil dinonaktifkan' }
}

module.exports = { list, getById, create, update, remove }
