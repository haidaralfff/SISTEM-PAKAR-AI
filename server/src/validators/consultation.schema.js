const { z } = require('zod')

const symptomEntrySchema = z.object({
  symptom_id: z.string().uuid('ID gejala tidak valid'),
  cf_user: z.number().min(0).max(1, 'CF User harus antara 0 dan 1'),
})

const submitConsultationSchema = z.object({
  symptoms: z.array(symptomEntrySchema).min(1, 'Minimal 1 gejala harus dipilih'),
})

module.exports = { submitConsultationSchema }
