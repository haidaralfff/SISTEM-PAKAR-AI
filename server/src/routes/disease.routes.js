const { Router } = require('express')
const controller = require('../controllers/disease.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { adminOnly } = require('../middleware/rbac.middleware')
const { validate } = require('../middleware/validate.middleware')
const { createDiseaseSchema, updateDiseaseSchema } = require('../validators/disease.schema')

const router = Router()

router.get('/', controller.list)
router.get('/:id', controller.getById)

router.post('/', authenticate, adminOnly, validate(createDiseaseSchema), controller.create)
router.put('/:id', authenticate, adminOnly, validate(updateDiseaseSchema), controller.update)
router.delete('/:id', authenticate, adminOnly, controller.remove)

module.exports = router
