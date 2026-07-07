const diseaseService = require('../services/disease.service')

const list = async (req, res, next) => {
  try {
    const diseases = await diseaseService.list(req.query)
    res.json({ data: diseases })
  } catch (err) { next(err) }
}

const getById = async (req, res, next) => {
  try {
    const disease = await diseaseService.getById(req.params.id)
    res.json(disease)
  } catch (err) { next(err) }
}

const create = async (req, res, next) => {
  try {
    const disease = await diseaseService.create(req.validatedBody)
    res.status(201).json(disease)
  } catch (err) { next(err) }
}

const update = async (req, res, next) => {
  try {
    const disease = await diseaseService.update(req.params.id, req.validatedBody)
    res.json(disease)
  } catch (err) { next(err) }
}

const remove = async (req, res, next) => {
  try {
    const result = await diseaseService.remove(req.params.id)
    res.json(result)
  } catch (err) { next(err) }
}

module.exports = { list, getById, create, update, remove }
