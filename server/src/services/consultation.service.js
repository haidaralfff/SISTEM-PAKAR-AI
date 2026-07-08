const ruleRepo = require('../repositories/rule.repo')
const diseaseRepo = require('../repositories/disease.repo')
const symptomRepo = require('../repositories/symptom.repo')
const consultationRepo = require('../repositories/consultation.repo')
const { diagnose } = require('../algorithms/dempsterShafer')
const { createError } = require('../middleware/errorHandler.middleware')

const submit = async (userId, { symptoms }) => {
  const rules = await ruleRepo.findAll()
  if (rules.length === 0) {
    throw createError(400, 'Belum ada rule yang dikonfigurasi. Konsultasi tidak dapat diproses.')
  }

  const results = diagnose(symptoms, rules)
  const filtered = results.filter((r) => r.belief > 0)

  if (filtered.length === 0) {
    return {
      result: null,
      alternative_candidates: [],
      message: 'Gejala tidak cukup spesifik. Silakan konsultasi manual dengan konselor kampus.',
    }
  }

  const topResult = filtered[0]
  const topDisease = await diseaseRepo.findById(topResult.disease_id)

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
    belief: topResult.belief,
    has_high_risk_flag: hasHighRisk,
  })

  for (const symptom of symptoms) {
    await consultationRepo.addDetail({
      consultation_id: consultation.id,
      symptom_id: symptom.symptom_id,
      cf_user: symptom.cf_user,
    })
  }

  const alternativeCandidates = filtered.slice(1).filter((r) => r.belief >= 0.1)
    .map((r) => ({
      disease_id: r.disease_id,
      belief: r.belief,
      plausibility: r.plausibility,
    }))

  // Load disease names for alternatives
  const altWithNames = []
  for (const alt of alternativeCandidates) {
    const d = await diseaseRepo.findById(alt.disease_id)
    altWithNames.push({
      disease_name: d?.name || 'Unknown',
      belief: alt.belief,
      plausibility: alt.plausibility,
    })
  }

  return {
    consultation_id: consultation.id,
    result: {
      disease_name: topDisease?.name || null,
      belief: topResult.belief,
      plausibility: topResult.plausibility,
      severity_level: topDisease?.severity_level || null,
      description: topDisease?.description || null,
      solution: topDisease?.solution || null,
      high_risk: hasHighRisk,
    },
    alternative_candidates: altWithNames,
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

const simulate = async ({ symptoms }) => {
  const rules = await ruleRepo.findAll()
  if (rules.length === 0) {
    throw createError(400, 'Belum ada rule yang dikonfigurasi.')
  }

  const results = diagnose(symptoms, rules)

  // Enrich with disease info
  const enriched = []
  for (const r of results) {
    const disease = await diseaseRepo.findById(r.disease_id)
    enriched.push({
      disease_id: r.disease_id,
      disease_code: disease?.code || '',
      disease_name: disease?.name || 'Unknown',
      severity_level: disease?.severity_level || null,
      belief: r.belief,
      plausibility: r.plausibility,
      uncertainty: r.uncertainty,
      matched_count: r.matched_count,
      total_conflict: r.total_conflict,
      steps: r.steps,
    })
  }

  return { results: enriched }
}

module.exports = { submit, getHistory, getDetail, remove, simulate }
