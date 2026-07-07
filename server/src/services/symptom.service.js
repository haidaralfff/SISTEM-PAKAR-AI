const symptomRepo = require('../repositories/symptom.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const list = async (queryParams) => {
  return symptomRepo.findAll(queryParams)
}

const getById = async (id) => {
  const symptom = await symptomRepo.findById(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  return symptom
}

const create = async (data) => {
  const existing = await symptomRepo.findByCode(data.code)
  if (existing) throw createError(409, `Kode gejala ${data.code} sudah ada`)
  return symptomRepo.create(data)
}

const update = async (id, data) => {
  const symptom = await symptomRepo.findById(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  if (data.code && data.code !== symptom.code) {
    const existing = await symptomRepo.findByCode(data.code)
    if (existing) throw createError(409, `Kode gejala ${data.code} sudah ada`)
  }
  return symptomRepo.update(id, data)
}

const remove = async (id) => {
  const symptom = await symptomRepo.softDelete(id)
  if (!symptom) throw createError(404, 'Gejala tidak ditemukan')
  return { message: 'Gejala berhasil dinonaktifkan' }
}

module.exports = { list, getById, create, update, remove }
