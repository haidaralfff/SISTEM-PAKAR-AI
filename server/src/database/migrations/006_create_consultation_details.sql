CREATE TABLE IF NOT EXISTS consultation_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  symptom_id UUID NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
  cf_user DECIMAL(3,2) NOT NULL CHECK (cf_user >= 0 AND cf_user <= 1)
);

CREATE INDEX IF NOT EXISTS idx_consultation_details_consultation ON consultation_details(consultation_id);
