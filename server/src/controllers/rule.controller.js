const ruleService = require('../services/rule.service')

const list = async (req, res, next) => {
  try {
    const rules = await ruleService.list(req.query)
    res.json({ data: rules })
  } catch (err) { next(err) }
}

const getById = async (req, res, next) => {
  try {
    const rule = await ruleService.getById(req.params.id)
    res.json(rule)
  } catch (err) { next(err) }
}

const create = async (req, res, next) => {
  try {
    const rule = await ruleService.create(req.validatedBody, req.user.id)
    res.status(201).json(rule)
  } catch (err) { next(err) }
}

const update = async (req, res, next) => {
  try {
    const rule = await ruleService.update(req.params.id, req.validatedBody, req.user.id)
    res.json(rule)
  } catch (err) { next(err) }
}

const remove = async (req, res, next) => {
  try {
    const result = await ruleService.remove(req.params.id, req.user.id)
    res.json(result)
  } catch (err) { next(err) }
}

module.exports = { list, getById, create, update, remove }
