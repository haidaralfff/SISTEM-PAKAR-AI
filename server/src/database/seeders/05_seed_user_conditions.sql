-- Seed user_conditions from MySQL legacy data (kondisi_users)
-- Maps to the 6 levels of user certainty in the expert system

INSERT INTO user_conditions (code, name, description, cf_value, display_order, is_active)
VALUES
  ('C01', 'Tidak Tahu', 'Pengguna tidak mengetahui atau tidak yakin dengan kondisi yang dialami', 0.00, 1, true),
  ('C02', 'Tidak Yakin', 'Pengguna merasa tidak yakin dengan gejala yang dialami', 0.20, 2, true),
  ('C03', 'Mungkin', 'Pengguna merasa mungkin mengalami gejala tersebut', 0.40, 3, true),
  ('C04', 'Kemungkinan Besar', 'Pengguna merasa kemungkinan besar mengalami gejala tersebut', 0.60, 4, true),
  ('C05', 'Hampir Pasti', 'Pengguna merasa hampir pasti mengalami gejala tersebut', 0.80, 5, true),
  ('C06', 'Pasti', 'Pengguna merasa pasti mengalami gejala tersebut', 1.00, 6, true);
