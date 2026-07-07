const { Router } = require('express')
const controller = require('../controllers/rule.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { adminOnly } = require('../middleware/rbac.middleware')
const { validate } = require('../middleware/validate.middleware')
const { createRuleSchema, updateRuleSchema } = require('../validators/rule.schema')

const router = Router()

router.get('/', controller.list)
router.get('/:id', controller.getById)

router.post('/', authenticate, adminOnly, validate(createRuleSchema), controller.create)
router.put('/:id', authenticate, adminOnly, validate(updateRuleSchema), controller.update)
router.delete('/:id', authenticate, adminOnly, controller.remove)

module.exports = router
