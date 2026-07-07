const symptomService = require('../services/symptom.service')

const list = async (req, res, next) => {
  try {
    const symptoms = await symptomService.list(req.query)
    res.json({ data: symptoms })
  } catch (err) { next(err) }
}

const getById = async (req, res, next) => {
  try {
    const symptom = await symptomService.getById(req.params.id)
    res.json(symptom)
  } catch (err) { next(err) }
}

const create = async (req, res, next) => {
  try {
    const symptom = await symptomService.create(req.validatedBody)
    res.status(201).json(symptom)
  } catch (err) { next(err) }
}

const update = async (req, res, next) => {
  try {
    const symptom = await symptomService.update(req.params.id, req.validatedBody)
    res.json(symptom)
  } catch (err) { next(err) }
}

const remove = async (req, res, next) => {
  try {
    const result = await symptomService.remove(req.params.id)
    res.json(result)
  } catch (err) { next(err) }
}

module.exports = { list, getById, create, update, remove }
