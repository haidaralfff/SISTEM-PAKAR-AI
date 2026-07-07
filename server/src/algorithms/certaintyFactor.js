/**
 * Certainty Factor: menghitung CF kombinasi berantai.
 *
 * Rumus:
 *   CF(H,E) = CF(E) × CF(H)    ... untuk satu gejala
 *   CFcombine = CF1 + CF2 × (1 - CF1)   ... kombinasi dua CF
 *
 * @param {Array<{ cf_user: number, cf_expert: number }>} items
 * @returns {number} Nilai CF akhir (0 - 1)
 */
const calculateCF = (items) => {
  if (!items || items.length === 0) return 0

  let combined = 0

  for (const item of items) {
    const cfHe = item.cf_user * item.cf_expert
    if (combined === 0) {
      combined = cfHe
    } else {
      combined = combined + cfHe * (1 - combined)
    }
  }

  return Math.round(combined * 10000) / 10000
}

/**
 * Menghitung CF untuk setiap kandidat diagnosis dan
 * mengembalikan hasil terurut berdasarkan CF tertinggi.
 *
 * @param {Map<string, { disease_id: string, matchedRules: Array }>} candidates
 * @param {Array<{ symptom_id: string, cf_user: number }>} userSymptoms
 * @returns {Array<{ disease_id: string, cf_result: number }>}
 */
const calculateAllCandidates = (candidates, userSymptoms) => {
  const userCfMap = new Map(userSymptoms.map((s) => [s.symptom_id, s.cf_user]))
  const results = []

  for (const [diseaseId, data] of candidates) {
    const cfItems = data.matchedRules.map((rule) => ({
      cf_user: userCfMap.get(rule.symptom_id) || 0,
      cf_expert: rule.cf_expert,
    }))

    const cfResult = calculateCF(cfItems)
    results.push({ disease_id: diseaseId, cf_result: cfResult, matchedCount: cfItems.length })
  }

  results.sort((a, b) => b.cf_result - a.cf_result)
  return results
}

module.exports = { calculateCF, calculateAllCandidates }
