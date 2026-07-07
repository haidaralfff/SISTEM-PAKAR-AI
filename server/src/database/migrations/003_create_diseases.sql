CREATE TABLE IF NOT EXISTS diseases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  severity_level VARCHAR(20) NOT NULL CHECK (severity_level IN ('ringan', 'sedang', 'berat')),
  description TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_diseases_severity ON diseases(severity_level);
