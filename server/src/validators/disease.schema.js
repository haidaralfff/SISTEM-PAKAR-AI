const { z } = require('zod')

const createDiseaseSchema = z.object({
  code: z.string().min(1, 'Kode harus diisi').max(10),
  name: z.string().min(1, 'Nama harus diisi').max(200),
  severity_level: z.enum(['ringan', 'sedang', 'berat']),
  description: z.string().optional().default(''),
  solution: z.string().optional().default(''),
})

const updateDiseaseSchema = z.object({
  code: z.string().min(1).max(10).optional(),
  name: z.string().min(1).max(200).optional(),
  severity_level: z.enum(['ringan', 'sedang', 'berat']).optional(),
  description: z.string().optional(),
  solution: z.string().optional(),
})

module.exports = { createDiseaseSchema, updateDiseaseSchema }
