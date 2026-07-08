CREATE TABLE IF NOT EXISTS diseases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  severity_level VARCHAR(20) NOT NULL CHECK (severity_level IN ('gangguan_mood', 'ringan', 'sedang', 'berat')),
  description TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_diseases_severity ON diseases(severity_level);

-- Update severity_level constraint to include gangguan_mood
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname LIKE '%diseases%severity%'
    AND NOT 'gangguan_mood' = ANY(
      SELECT unnest(string_to_array(
        pg_get_constraintdef(oid), ''''
      ))
      FROM pg_constraint
      WHERE conname LIKE '%diseases%severity%'
    )
  ) THEN
    ALTER TABLE diseases DROP CONSTRAINT IF EXISTS diseases_severity_level_check;
    ALTER TABLE diseases ADD CONSTRAINT diseases_severity_level_check
      CHECK (severity_level IN ('gangguan_mood', 'ringan', 'sedang', 'berat'));
  END IF;
END $$;
