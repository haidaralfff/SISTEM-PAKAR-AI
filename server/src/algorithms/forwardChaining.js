/**
 * Forward Chaining: mencocokkan gejala user dengan rule untuk
 * menghasilkan kandidat diagnosis beserta gejala-gejala yang cocok.
 *
 * @param {Array<{ symptom_id: string, cf_user: number }>} userSymptoms
 * @param {Array<{ id, disease_id, symptom_id, cf_expert }>} rules
 * @returns {Map<string, { disease_id: string, ruleIds: string[], matchedSymptoms: Array }>}
 */
const forwardChaining = (userSymptoms, rules) => {
  const userSymptomIds = new Set(userSymptoms.map((s) => s.symptom_id))
  const candidates = new Map()

  for (const rule of rules) {
    if (userSymptomIds.has(rule.symptom_id)) {
      if (!candidates.has(rule.disease_id)) {
        candidates.set(rule.disease_id, {
          disease_id: rule.disease_id,
          matchedRules: [],
          matchedSymptoms: [],
        })
      }
      candidates.get(rule.disease_id).matchedRules.push(rule)
    }
  }

  return candidates
}

module.exports = { forwardChaining }
