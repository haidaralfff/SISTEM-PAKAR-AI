const { Router } = require('express')
const userConditionRepo = require('../repositories/userCondition.repo')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const conditions = await userConditionRepo.findAll()
    res.json({ data: conditions })
  } catch (err) {
    next(err)
  }
})

router.get('/:code', async (req, res, next) => {
  try {
    const condition = await userConditionRepo.findByCode(req.params.code)
    if (!condition) {
      return res.status(404).json({ message: 'Kondisi tidak ditemukan' })
    }
    res.json({ data: condition })
  } catch (err) {
    next(err)
  }
})

module.exports = router
