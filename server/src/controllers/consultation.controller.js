const consultationService = require('../services/consultation.service')

const submit = async (req, res, next) => {
  try {
    const result = await consultationService.submit(req.user.id, req.validatedBody)
    res.status(201).json(result)
  } catch (err) { next(err) }
}

const getHistory = async (req, res, next) => {
  try {
    const result = await consultationService.getHistory(req.user.id, req.query)
    res.json(result)
  } catch (err) { next(err) }
}

const getDetail = async (req, res, next) => {
  try {
    const detail = await consultationService.getDetail(req.params.id, req.user.id)
    res.json(detail)
  } catch (err) { next(err) }
}

const remove = async (req, res, next) => {
  try {
    const result = await consultationService.remove(req.params.id, req.user.id)
    res.json(result)
  } catch (err) { next(err) }
}

const simulate = async (req, res, next) => {
  try {
    const result = await consultationService.simulate(req.validatedBody)
    res.json(result)
  } catch (err) { next(err) }
}

module.exports = { submit, getHistory, getDetail, remove, simulate }
