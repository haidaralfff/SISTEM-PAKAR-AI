const ruleRepo = require('../repositories/rule.repo')
const diseaseRepo = require('../repositories/disease.repo')
const symptomRepo = require('../repositories/symptom.repo')
const consultationRepo = require('../repositories/consultation.repo')
const { forwardChaining } = require('../algorithms/forwardChaining')
const { calculateAllCandidates } = require('../algorithms/certaintyFactor')
const { createError } = require('../middleware/errorHandler.middleware')

const submit = async (userId, { symptoms }) => {
  const rules = await ruleRepo.findAll()
  if (rules.length === 0) {
    throw createError(400, 'Belum ada rule yang dikonfigurasi. Konsultasi tidak dapat diproses.')
  }

  const candidates = forwardChaining(symptoms, rules)
  if (candidates.size === 0) {
    return {
      result: null,
      alternative_candidates: [],
      message: 'Gejala tidak cukup spesifik. Silakan konsultasi manual dengan konselor kampus.',
    }
  }

  const diseaseIds = [...candidates.keys()]
  const diseases = {}
  for (const id of diseaseIds) {
    const d = await diseaseRepo.findById(id)
    if (d) diseases[id] = d
  }

  const ranked = calculateAllCandidates(candidates, symptoms)
  const filtered = ranked.filter((r) => r.cf_result > 0)

  if (filtered.length === 0) {
    return {
      result: null,
      alternative_candidates: [],
      message: 'Gejala tidak cukup spesifik. Silakan konsultasi manual dengan konselor kampus.',
    }
  }

  const topCandidate = filtered[0]
  const topDisease = diseases[topCandidate.disease_id]

  const selectedSymptomIds = symptoms.map((s) => s.symptom_id)
  const highRiskSymptoms = []
  for (const sid of selectedSymptomIds) {
    const s = await symptomRepo.findById(sid)
    if (s && s.is_high_risk) highRiskSymptoms.push(s)
  }
  const hasHighRisk = highRiskSymptoms.length > 0

  const consultation = await consultationRepo.create({
    user_id: userId,
    disease_id: topDisease?.id || null,
    result: topDisease?.name || null,
    cf_result: topCandidate.cf_result,
    has_high_risk_flag: hasHighRisk,
  })

  for (const symptom of symptoms) {
    await consultationRepo.addDetail({
      consultation_id: consultation.id,
      symptom_id: symptom.symptom_id,
      cf_user: symptom.cf_user,
    })
  }

  const alternativeCandidates = filtered.slice(1).filter((r) => r.cf_result >= 0.4)
    .map((r) => ({
      disease_name: diseases[r.disease_id]?.name || 'Unknown',
      cf_result: r.cf_result,
    }))

  return {
    consultation_id: consultation.id,
    result: {
      disease_name: topDisease?.name || null,
      cf_result: topCandidate.cf_result,
      severity_level: topDisease?.severity_level || null,
      description: topDisease?.description || null,
      solution: topDisease?.solution || null,
      high_risk: hasHighRisk,
    },
    alternative_candidates: alternativeCandidates,
  }
}

const getHistory = async (userId, queryParams) => {
  const consultations = await consultationRepo.findByUser(userId, queryParams)
  const total = await consultationRepo.countByUser(userId)
  return { data: consultations, meta: { total, page: queryParams.page || 1, limit: queryParams.limit || 10 } }
}

const getDetail = async (consultationId, userId) => {
  const consultation = await consultationRepo.findById(consultationId)
  if (!consultation) throw createError(404, 'Konsultasi tidak ditemukan')
  if (consultation.user_id !== userId) throw createError(403, 'Akses ditolak')

  const details = await consultationRepo.findDetailsByConsultationId(consultationId)
  return { ...consultation, consultation_details: details }
}

const remove = async (consultationId, userId) => {
  const deleted = await consultationRepo.remove(consultationId, userId)
  if (!deleted) throw createError(404, 'Konsultasi tidak ditemukan atau bukan milik Anda')
  return { message: 'Riwayat konsultasi berhasil dihapus' }
}

module.exports = { submit, getHistory, getDetail, remove }
