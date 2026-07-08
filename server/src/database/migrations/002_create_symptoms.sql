CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT DEFAULT '',
  category VARCHAR(50) NOT NULL CHECK (category IN ('Kognitif', 'Emosional', 'Fisik', 'Sosial')),
  is_high_risk BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  legacy_code VARCHAR(10) DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_symptoms_category ON symptoms(category);
CREATE INDEX IF NOT EXISTS idx_symptoms_is_high_risk ON symptoms(is_high_risk);
CREATE INDEX IF NOT EXISTS idx_symptoms_legacy_code ON symptoms(legacy_code);

-- Add legacy_code column if table already exists (migration safety)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'symptoms' AND column_name = 'legacy_code'
  ) THEN
    ALTER TABLE symptoms ADD COLUMN legacy_code VARCHAR(10) DEFAULT NULL;
    CREATE INDEX IF NOT EXISTS idx_symptoms_legacy_code ON symptoms(legacy_code);
  END IF;
END $$;
