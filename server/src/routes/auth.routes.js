const { Router } = require('express')
const controller = require('../controllers/auth.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validate.middleware')
const { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } = require('../validators/auth.schema')

const router = Router()

router.post('/register', validate(registerSchema), controller.register)
router.post('/login', validate(loginSchema), controller.login)
router.post('/refresh', controller.refresh)
router.post('/logout', controller.logout)

router.get('/profile', authenticate, controller.getProfile)
router.put('/profile', authenticate, validate(updateProfileSchema), controller.updateProfile)
router.put('/change-password', authenticate, validate(changePasswordSchema), controller.changePassword)

module.exports = router
