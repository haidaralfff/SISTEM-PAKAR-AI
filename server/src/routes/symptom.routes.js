const { Router } = require('express')
const controller = require('../controllers/symptom.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { adminOnly } = require('../middleware/rbac.middleware')
const { validate } = require('../middleware/validate.middleware')
const { createSymptomSchema, updateSymptomSchema } = require('../validators/symptom.schema')

const router = Router()

router.get('/', controller.list)
router.get('/:id', controller.getById)

router.post('/', authenticate, adminOnly, validate(createSymptomSchema), controller.create)
router.put('/:id', authenticate, adminOnly, validate(updateSymptomSchema), controller.update)
router.delete('/:id', authenticate, adminOnly, controller.remove)

module.exports = router
