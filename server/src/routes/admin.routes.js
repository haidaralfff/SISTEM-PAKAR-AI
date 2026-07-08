const { Router } = require('express')
const controller = require('../controllers/admin.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { adminOnly } = require('../middleware/rbac.middleware')
const { validate } = require('../middleware/validate.middleware')
const { z } = require('zod')

const simulateSchema = z.object({
  symptoms: z.array(z.object({
    symptom_id: z.string().uuid(),
    cf_user: z.number().min(0).max(1),
  })).min(1, 'Minimal 1 gejala harus dipilih'),
})

const router = Router()

router.get('/statistics', authenticate, adminOnly, controller.getStatistics)
router.get('/users', authenticate, adminOnly, controller.getUsers)
router.delete('/users/:id', authenticate, adminOnly, controller.deleteUser)
router.get('/audit-logs', authenticate, adminOnly, controller.getAuditLogs)
router.get('/high-risk-incidents', authenticate, adminOnly, controller.getHighRiskIncidents)
router.post('/simulate', authenticate, adminOnly, validate(simulateSchema), controller.simulate)

module.exports = router
