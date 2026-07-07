const { z } = require('zod')

const createRuleSchema = z.object({
  disease_id: z.string().uuid('ID diagnosis tidak valid'),
  symptom_id: z.string().uuid('ID gejala tidak valid'),
  cf_expert: z.number().min(0).max(1, 'CF Pakar harus antara 0 dan 1'),
})

const updateRuleSchema = z.object({
  disease_id: z.string().uuid().optional(),
  symptom_id: z.string().uuid().optional(),
  cf_expert: z.number().min(0).max(1).optional(),
})

module.exports = { createRuleSchema, updateRuleSchema }
