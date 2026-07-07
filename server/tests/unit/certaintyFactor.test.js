const { calculateCF, calculateAllCandidates } = require('../../src/algorithms/certaintyFactor')

describe('calculateCF', () => {
  it('should return 0 for empty items', () => {
    expect(calculateCF([])).toBe(0)
  })

  it('should return 0 if no items passed', () => {
    expect(calculateCF()).toBe(0)
  })

  it('should calculate single item correctly (CF user * CF expert)', () => {
    const items = [{ cf_user: 1.0, cf_expert: 0.8 }]
    expect(calculateCF(items)).toBe(0.8)
  })

  it('should calculate two items with combine formula', () => {
    const items = [
      { cf_user: 1.0, cf_expert: 0.8 },
      { cf_user: 0.8, cf_expert: 0.6 },
    ]
    const cf1 = 1.0 * 0.8
    const cf2 = 0.8 * 0.6
    const expected = cf1 + cf2 * (1 - cf1)
    expect(calculateCF(items)).toBeCloseTo(expected, 4)
  })

  it('should calculate three items iteratively', () => {
    const items = [
      { cf_user: 1.0, cf_expert: 0.8 },
      { cf_user: 0.8, cf_expert: 0.6 },
      { cf_user: 0.4, cf_expert: 0.4 },
    ]
    const cf1 = 1.0 * 0.8
    const cf2 = 0.8 * 0.6
    const combine1 = cf1 + cf2 * (1 - cf1)
    const cf3 = 0.4 * 0.4
    const expected = combine1 + cf3 * (1 - combine1)
    expect(calculateCF(items)).toBeCloseTo(expected, 4)
  })

  it('should handle same values as PRD example', () => {
    const items = [
      { cf_user: 1.0, cf_expert: 0.8 },
      { cf_user: 0.8, cf_expert: 0.6 },
      { cf_user: 0.4, cf_expert: 0.4 },
    ]
    const result = calculateCF(items)
    expect(result).toBeCloseTo(0.9126, 3)
  })
})

describe('calculateAllCandidates', () => {
  it('should return sorted results by CF descending', () => {
    const candidates = new Map([
      ['d1', {
        disease_id: 'd1',
        matchedRules: [
          { disease_id: 'd1', symptom_id: 's1', cf_expert: 0.8 },
        ],
      }],
      ['d2', {
        disease_id: 'd2',
        matchedRules: [
          { disease_id: 'd2', symptom_id: 's2', cf_expert: 0.6 },
        ],
      }],
    ])

    const userSymptoms = [
      { symptom_id: 's1', cf_user: 1.0 },
      { symptom_id: 's2', cf_user: 0.5 },
    ]

    const results = calculateAllCandidates(candidates, userSymptoms)
    expect(results.length).toBe(2)
    expect(results[0].disease_id).toBe('d1')
    expect(results[1].disease_id).toBe('d2')
    expect(results[0].cf_result).toBeGreaterThan(results[1].cf_result)
  })

  it('should handle empty candidates map', () => {
    const results = calculateAllCandidates(new Map(), [])
    expect(results).toEqual([])
  })
})
