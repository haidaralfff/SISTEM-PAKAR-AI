const { Router } = require('express')
const authRoutes = require('./auth.routes')
const symptomRoutes = require('./symptom.routes')
const diseaseRoutes = require('./disease.routes')
const ruleRoutes = require('./rule.routes')
const consultationRoutes = require('./consultation.routes')
const adminRoutes = require('./admin.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/symptoms', symptomRoutes)
router.use('/diseases', diseaseRoutes)
router.use('/rules', ruleRoutes)
router.use('/consultations', consultationRoutes)
router.use('/admin', adminRoutes)

router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() })
})

router.get('/dashboard/stats', require('../middleware/auth.middleware').authenticate, async (req, res, next) => {
  try {
    const stats = await require('../services/admin.service').getDashboardStats(req.user.id)
    res.json(stats)
  } catch (err) { next(err) }
})

module.exports = router
