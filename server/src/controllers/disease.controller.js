const diseaseService = require('../services/disease.service')

const list = async (req, res, next) => {
  try {
    const result = await diseaseService.list(req.query)
    res.json(result)
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
    const disease = await diseaseService.create(req.validatedBody, req.user.id)
    res.status(201).json(disease)
  } catch (err) { next(err) }
}

const update = async (req, res, next) => {
  try {
    const disease = await diseaseService.update(req.params.id, req.validatedBody, req.user.id)
    res.json(disease)
  } catch (err) { next(err) }
}

const remove = async (req, res, next) => {
  try {
    const result = await diseaseService.remove(req.params.id, req.user.id)
    res.json(result)
  } catch (err) { next(err) }
}

module.exports = { list, getById, create, update, remove }
