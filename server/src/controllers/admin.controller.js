const adminService = require('../services/admin.service')

const getStatistics = async (req, res, next) => {
  try {
    const stats = await adminService.getStatistics()
    res.json(stats)
  } catch (err) { next(err) }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getUsers(req.query)
    res.json({ data: users })
  } catch (err) { next(err) }
}

const deleteUser = async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.params.id)
    res.json(result)
  } catch (err) { next(err) }
}

const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await adminService.getAuditLogs(req.query)
    res.json({ data: logs })
  } catch (err) { next(err) }
}

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats(req.user.id)
    res.json(stats)
  } catch (err) { next(err) }
}

module.exports = { getStatistics, getUsers, deleteUser, getAuditLogs, getDashboardStats }
