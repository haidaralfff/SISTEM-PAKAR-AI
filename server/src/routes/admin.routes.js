const { Router } = require('express')
const controller = require('../controllers/admin.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { adminOnly } = require('../middleware/rbac.middleware')

const router = Router()

router.get('/statistics', authenticate, adminOnly, controller.getStatistics)
router.get('/users', authenticate, adminOnly, controller.getUsers)
router.delete('/users/:id', authenticate, adminOnly, controller.deleteUser)
router.get('/audit-logs', authenticate, adminOnly, controller.getAuditLogs)

module.exports = router
