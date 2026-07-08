const { calculateBBA, combineTwoBBAs, calculatePlausibility, diagnose } = require('../../src/algorithms/dempsterShafer')

describe('calculateBBA', () => {
  it('should calculate mass and uncertainty correctly', () => {
    const result = calculateBBA(0.8, 0.7)
    expect(result.mass).toBe(0.56)
    expect(result.uncertainty).toBe(0.44)
  })

  it('should handle cf_user = 1.0', () => {
    const result = calculateBBA(1.0, 0.8)
    expect(result.mass).toBe(0.8)
    expect(result.uncertainty).toBe(0.2)
  })

  it('should handle cf_user = 0', () => {
    const result = calculateBBA(0, 0.8)
    expect(result.mass).toBe(0)
    expect(result.uncertainty).toBe(1)
  })

  it('should handle cf_expert = 0', () => {
    const result = calculateBBA(0.8, 0)
    expect(result.mass).toBe(0)
    expect(result.uncertainty).toBe(1)
  })
})

describe('combineTwoBBAs', () => {
  it('should combine two BBAs for same disease', () => {
    const masses1 = new Map([['d1', 0.5]])
    const masses2 = new Map([['d1', 0.3]])
    const result = combineTwoBBAs(masses1, 0.5, masses2, 0.7)

    // d1: 0.5*0.3 + 0.5*0.7 + 0.5*0.3 = 0.15 + 0.35 + 0.15 = 0.65
    // K = 1 - 0 = 1 (no conflict)
    expect(result.masses.get('d1')).toBeCloseTo(0.65, 2)
    expect(result.conflict).toBe(0)
  })

  it('should handle conflict between different diseases', () => {
    const masses1 = new Map([['d1', 0.6]])
    const masses2 = new Map([['d2', 0.4]])
    const result = combineTwoBBAs(masses1, 0.4, masses2, 0.6)

    // conflict: 0.6 * 0.4 = 0.24
    // K = 1 - 0.24 = 0.76
    // d1: 0.6 * 0.6 / 0.76 = 0.4737
    // d2: 0.4 * 0.4 / 0.76 = 0.2105
    expect(result.conflict).toBeCloseTo(0.24, 2)
    expect(result.masses.get('d1')).toBeCloseTo(0.4737, 2)
    expect(result.masses.get('d2')).toBeCloseTo(0.2105, 2)
  })

  it('should combine Θ correctly', () => {
    const masses1 = new Map([['d1', 0.5]])
    const masses2 = new Map([['d1', 0.3]])
    const result = combineTwoBBAs(masses1, 0.5, masses2, 0.7)

    // Θ = 0.5 * 0.7 = 0.35
    expect(result.uncertainty).toBeCloseTo(0.35, 2)
  })
})

describe('calculatePlausibility', () => {
  it('should calculate plausibility correctly', () => {
    expect(calculatePlausibility(0.6, 0.3)).toBe(0.9)
  })

  it('should handle zero mass', () => {
    expect(calculatePlausibility(0, 0.5)).toBe(0.5)
  })

  it('should handle zero uncertainty', () => {
    expect(calculatePlausibility(0.7, 0)).toBe(0.7)
  })
})

describe('diagnose', () => {
  it('should return empty array for no matching rules', () => {
    const results = diagnose([], [])
    expect(results).toEqual([])
  })

  it('should diagnose single disease with one symptom', () => {
    const symptoms = [{ symptom_id: 's1', cf_user: 1.0 }]
    const rules = [
      { id: 'r1', disease_id: 'd1', symptom_id: 's1', cf_expert: 0.8 },
    ]
    const results = diagnose(symptoms, rules)
    expect(results.length).toBe(1)
    expect(results[0].disease_id).toBe('d1')
    expect(results[0].belief).toBeCloseTo(0.8, 2)
    expect(results[0].plausibility).toBeCloseTo(1.0, 2)
  })

  it('should diagnose multiple symptoms for same disease', () => {
    const symptoms = [
      { symptom_id: 's1', cf_user: 1.0 },
      { symptom_id: 's2', cf_user: 0.8 },
    ]
    const rules = [
      { id: 'r1', disease_id: 'd1', symptom_id: 's1', cf_expert: 0.8 },
      { id: 'r2', disease_id: 'd1', symptom_id: 's2', cf_expert: 0.6 },
    ]
    const results = diagnose(symptoms, rules)
    expect(results.length).toBe(1)
    expect(results[0].disease_id).toBe('d1')
    expect(results[0].matched_count).toBe(2)
    // Belief should be higher than individual BBAs due to combination
    expect(results[0].belief).toBeGreaterThan(0.8)
  })

  it('should rank diseases by belief descending', () => {
    const symptoms = [
      { symptom_id: 's1', cf_user: 1.0 },
      { symptom_id: 's2', cf_user: 1.0 },
    ]
    const rules = [
      { id: 'r1', disease_id: 'd1', symptom_id: 's1', cf_expert: 0.9 },
      { id: 'r2', disease_id: 'd2', symptom_id: 's2', cf_expert: 0.5 },
    ]
    const results = diagnose(symptoms, rules)
    expect(results.length).toBe(2)
    expect(results[0].disease_id).toBe('d1')
    expect(results[1].disease_id).toBe('d2')
    expect(results[0].belief).toBeGreaterThan(results[1].belief)
  })

  it('should return disease with belief 0 when symptoms do not match', () => {
    const symptoms = [{ symptom_id: 'unknown', cf_user: 1.0 }]
    const rules = [
      { id: 'r1', disease_id: 'd1', symptom_id: 's1', cf_expert: 0.8 },
    ]
    const results = diagnose(symptoms, rules)
    expect(results.length).toBe(1)
    expect(results[0].belief).toBe(0)
    expect(results[0].plausibility).toBe(1)
  })
})
