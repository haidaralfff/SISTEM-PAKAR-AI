const { z } = require('zod')

const createSymptomSchema = z.object({
  code: z.string().min(1, 'Kode harus diisi').max(10),
  name: z.string().min(1, 'Nama harus diisi').max(200),
  description: z.string().optional().default(''),
  category: z.enum(['Kognitif', 'Emosional', 'Fisik', 'Sosial']),
  is_high_risk: z.boolean().optional().default(false),
})

const updateSymptomSchema = z.object({
  code: z.string().min(1).max(10).optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  category: z.enum(['Kognitif', 'Emosional', 'Fisik', 'Sosial']).optional(),
  is_high_risk: z.boolean().optional(),
})

module.exports = { createSymptomSchema, updateSymptomSchema }
