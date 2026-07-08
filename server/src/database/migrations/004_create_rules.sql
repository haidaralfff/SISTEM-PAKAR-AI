CREATE TABLE IF NOT EXISTS rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  symptom_id UUID NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
  cf_expert DECIMAL(3,2) NOT NULL CHECK (cf_expert >= 0 AND cf_expert <= 1),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(disease_id, symptom_id)
);

CREATE INDEX IF NOT EXISTS idx_rules_disease ON rules(disease_id);
CREATE INDEX IF NOT EXISTS idx_rules_symptom ON rules(symptom_id);
