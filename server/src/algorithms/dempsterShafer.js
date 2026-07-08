/**
 * Dempster-Shafer Theory (DST) - Basic Belief Assignment & Combination
 *
 * Untuk sistem pakar depresi dengan 1 gejala → 1 disease.
 *
 * BBA (Basic Belief Assignment):
 *   m(disease) = cf_user × cf_expert
 *   m(Θ)       = 1 - m(disease)   // uncertainty / ketidakpastian
 *
 * Dempster's Rule of Combination:
 *   m1 ⊕ m2(C) = Σ m1(A)×m2(B) / (1 - K)
 *   K = Σ m1(A)×m2(B) untuk A ∩ B = ∅ (konflik)
 *
 * Belief Function:
 *   Bel(A) = Σ m(B) untuk B ⊆ A
 *   Untuk single hypothesis: Bel(disease) = m(disease)
 *
 * Plausibility Function:
 *   Pl(A) = 1 - Bel(¬A) = m(disease) + m(Θ)
 */

/**
 * Hitung BBA untuk satu gejala terhadap satu disease.
 *
 * @param {number} cf_user   - Nilai keyakinan user (0-1)
 * @param {number} cf_expert - Nilai keyakinan pakar (0-1)
 * @returns {{ mass: number, uncertainty: number }}
 */
const calculateBBA = (cf_user, cf_expert) => {
  const mass = cf_user * cf_expert
  return {
    mass: Math.round(mass * 10000) / 10000,
    uncertainty: Math.round((1 - mass) * 10000) / 10000,
  }
}

/**
 * Menggabungkan dua BBA menggunakan Dempster's Rule of Combination.
 *
 * Struktur BBA: { masses: Map<disease_id, number>, uncertainty: number }
 *
 * @param {Map<string, number>} masses1  - Mass disease dari BBA pertama
 * @param {number} uncertainty1          - Uncertainty dari BBA pertama
 * @param {Map<string, number>} masses2  - Mass disease dari BBA kedua
 * @param {number} uncertainty2          - Uncertainty dari BBA kedua
 * @returns {{ masses: Map<string, number>, uncertainty: number, conflict: number }}
 */
const combineTwoBBAs = (masses1, uncertainty1, masses2, uncertainty2) => {
  const result = new Map()
  let conflict = 0

  // disease × disease → conflict (karena disease berbeda = irisan ∅)
  for (const [d1, m1] of masses1) {
    for (const [d2, m2] of masses2) {
      if (d1 !== d2) {
        conflict += m1 * m2
      } else {
        const current = result.get(d1) || 0
        result.set(d1, current + m1 * m2)
      }
    }
  }

  // disease × Θ → disease (tetap di disease yang sama)
  for (const [d, m] of masses1) {
    const current = result.get(d) || 0
    result.set(d, current + m * uncertainty2)
  }

  // Θ × disease → disease
  for (const [d, m] of masses2) {
    const current = result.get(d) || 0
    result.set(d, current + uncertainty1 * m)
  }

  // Θ × Θ → Θ
  const newUncertainty = uncertainty1 * uncertainty2

  // Konflik: Σ m1(d1)×m2(d2) untuk d1 ≠ d2 (sudah dihitung di atas)

  // Normalisasi: bagi semua mass dengan (1 - conflict)
  const K = 1 - conflict
  if (K > 0) {
    for (const [d, m] of result) {
      result.set(d, Math.round((m / K) * 10000) / 10000)
    }
  }

  return {
    masses: result,
    uncertainty: Math.round((newUncertainty / K) * 10000) / 10000,
    conflict: Math.round(conflict * 10000) / 10000,
  }
}

/**
 * Menghitung Plausibility untuk suatu disease.
 * Pl(A) = m(A) + m(Θ) = 1 - Bel(¬A)
 *
 * @param {number} mass       - Mass untuk disease ini
 * @param {number} uncertainty - Total uncertainty (m(Θ))
 * @returns {number}
 */
const calculatePlausibility = (mass, uncertainty) => {
  return Math.round((mass + uncertainty) * 10000) / 10000
}

/**
 * Diagnosis menggunakan DST.
 *
 * @param {Array<{ symptom_id, cf_user }>} userSymptoms - Gejala dari user
 * @param {Array<{ id, disease_id, symptom_id, cf_expert }>} rules - Rules dari DB
 * @returns {Array<{ disease_id, belief, plausibility, matched_count, steps }>}
 */
const diagnose = (userSymptoms, rules) => {
  const userCfMap = new Map(userSymptoms.map((s) => [s.symptom_id, s.cf_user]))

  // Group rules by disease
  const diseaseMap = new Map()
  for (const rule of rules) {
    if (!diseaseMap.has(rule.disease_id)) {
      diseaseMap.set(rule.disease_id, { matchedRules: [] })
    }
    diseaseMap.get(rule.disease_id).matchedRules.push(rule)
  }

  const results = []

  for (const [diseaseId, data] of diseaseMap) {
    // Mulai dengan BBA awal: m(Θ) = 1 (belum ada evidence)
    let combinedMasses = new Map()
    let combinedUncertainty = 1
    let totalConflict = 0
    const steps = []

    // Kombinasikan setiap gejala yang cocok
    for (const rule of data.matchedRules) {
      const cfUser = userCfMap.get(rule.symptom_id) || 0
      const cfExpert = parseFloat(rule.cf_expert)

      // BBA untuk gejala ini
      const bba = calculateBBA(cfUser, cfExpert)

      // Masses untuk gejala ini: hanya 1 disease
      const newMasses = new Map()
      newMasses.set(diseaseId, bba.mass)

      // Kombinasikan dengan hasil sebelumnya
      const combined = combineTwoBBAs(
        combinedMasses, combinedUncertainty,
        newMasses, bba.uncertainty
      )

      steps.push({
        symptom_id: rule.symptom_id,
        symptom_code: rule.symptom_code || '',
        symptom_name: rule.symptom_name || '',
        cf_user: cfUser,
        cf_expert: cfExpert,
        bba_disease: bba.mass,
        bba_theta: bba.uncertainty,
        conflict: combined.conflict,
        after_mass: combined.masses.get(diseaseId) || 0,
        after_theta: combined.uncertainty,
      })

      combinedMasses = combined.masses
      combinedUncertainty = combined.uncertainty
      totalConflict += combined.conflict
    }

    const finalMass = combinedMasses.get(diseaseId) || 0
    const belief = finalMass
    const plausibility = calculatePlausibility(finalMass, combinedUncertainty)

    results.push({
      disease_id: diseaseId,
      belief: Math.round(belief * 10000) / 10000,
      plausibility: Math.round(plausibility * 10000) / 10000,
      uncertainty: combinedUncertainty,
      matched_count: data.matchedRules.length,
      total_conflict: Math.round(totalConflict * 10000) / 10000,
      steps,
    })
  }

  // Sort by belief descending
  results.sort((a, b) => b.belief - a.belief)
  return results
}

module.exports = { calculateBBA, combineTwoBBAs, calculatePlausibility, diagnose }
