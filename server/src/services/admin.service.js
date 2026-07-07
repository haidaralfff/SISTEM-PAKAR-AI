const userRepo = require('../repositories/user.repo')
const symptomRepo = require('../repositories/symptom.repo')
const diseaseRepo = require('../repositories/disease.repo')
const ruleRepo = require('../repositories/rule.repo')
const consultationRepo = require('../repositories/consultation.repo')
const auditRepo = require('../repositories/audit.repo')
const { createError } = require('../middleware/errorHandler.middleware')

const getStatistics = async () => {
  const [totalUsers, totalSymptoms, totalDiseases, totalRules, totalConsultations, severityData] = await Promise.all([
    userRepo.countAll(),
    symptomRepo.countAll(),
    diseaseRepo.countAll(),
    ruleRepo.countAll(),
    consultationRepo.countAll(),
    consultationRepo.countBySeverity(),
  ])

  const severityMap = { ringan: 0, sedang: 0, berat: 0 }
  severityData.forEach((d) => { severityMap[d.severity_level] = d.total })

  return {
    total_users: totalUsers,
    total_symptoms: totalSymptoms,
    total_diseases: totalDiseases,
    total_rules: totalRules,
    total_consultations: totalConsultations,
    ringan: severityMap.ringan,
    sedang: severityMap.sedang,
    berat: severityMap.berat,
  }
}

const getUsers = async (queryParams) => {
  return userRepo.findAll(queryParams.page, queryParams.limit)
}

const deleteUser = async (id) => {
  const deleted = await userRepo.softDelete(id)
  if (!deleted) throw createError(404, 'Pengguna tidak ditemukan')
  return { message: 'Pengguna berhasil dinonaktifkan' }
}

const getAuditLogs = async (queryParams) => {
  return auditRepo.findAll(queryParams)
}

const getDashboardStats = async (userId) => {
  const [totalConsultations, recentConsultations] = await Promise.all([
    consultationRepo.countByUser(userId),
    consultationRepo.findByUser(userId, { page: 1, limit: 5 }),
  ])
  return { total_consultations: totalConsultations, recent_consultations: recentConsultations }
}

module.exports = { getStatistics, getUsers, deleteUser, getAuditLogs, getDashboardStats }
