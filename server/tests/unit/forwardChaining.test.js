const { forwardChaining } = require('../../src/algorithms/forwardChaining')

describe('forwardChaining', () => {
  const rules = [
    { id: 'r1', disease_id: 'd1', symptom_id: 's1', cf_expert: 0.8 },
    { id: 'r2', disease_id: 'd1', symptom_id: 's2', cf_expert: 0.6 },
    { id: 'r3', disease_id: 'd2', symptom_id: 's1', cf_expert: 0.7 },
    { id: 'r4', disease_id: 'd2', symptom_id: 's3', cf_expert: 0.5 },
  ]

  it('should return empty map when no symptoms match', () => {
    const userSymptoms = [{ symptom_id: 's99', cf_user: 0.8 }]
    const result = forwardChaining(userSymptoms, rules)
    expect(result.size).toBe(0)
  })

  it('should return candidates with matched rules', () => {
    const userSymptoms = [
      { symptom_id: 's1', cf_user: 1.0 },
      { symptom_id: 's2', cf_user: 0.8 },
    ]
    const result = forwardChaining(userSymptoms, rules)
    expect(result.size).toBe(2)
    expect(result.has('d1')).toBe(true)
    expect(result.has('d2')).toBe(true)
    expect(result.get('d1').matchedRules.length).toBe(2)
    expect(result.get('d2').matchedRules.length).toBe(1)
  })

  it('should return single candidate when only one disease matches', () => {
    const userSymptoms = [{ symptom_id: 's3', cf_user: 0.6 }]
    const result = forwardChaining(userSymptoms, rules)
    expect(result.size).toBe(1)
    expect(result.has('d2')).toBe(true)
    expect(result.get('d2').matchedRules.length).toBe(1)
  })

  it('should handle empty rules array', () => {
    const userSymptoms = [{ symptom_id: 's1', cf_user: 0.8 }]
    const result = forwardChaining(userSymptoms, [])
    expect(result.size).toBe(0)
  })
})
