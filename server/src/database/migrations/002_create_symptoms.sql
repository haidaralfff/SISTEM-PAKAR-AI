CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT DEFAULT '',
  category VARCHAR(50) NOT NULL CHECK (category IN ('Kognitif', 'Emosional', 'Fisik', 'Sosial')),
  is_high_risk BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_symptoms_category ON symptoms(category);
CREATE INDEX idx_symptoms_is_high_risk ON symptoms(is_high_risk);
