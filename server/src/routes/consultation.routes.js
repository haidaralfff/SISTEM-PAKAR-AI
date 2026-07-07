const { Router } = require('express')
const controller = require('../controllers/consultation.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validate.middleware')
const { submitConsultationSchema } = require('../validators/consultation.schema')

const router = Router()

router.post('/', authenticate, validate(submitConsultationSchema), controller.submit)
router.get('/history', authenticate, controller.getHistory)
router.get('/:id', authenticate, controller.getDetail)
router.delete('/:id', authenticate, controller.remove)

module.exports = router
