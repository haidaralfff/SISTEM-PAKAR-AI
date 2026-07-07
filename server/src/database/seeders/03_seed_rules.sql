-- Depresi Ringan (P01)
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s
WHERE d.code = 'P01' AND s.code = 'G01';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.7
FROM diseases d, symptoms s
WHERE d.code = 'P01' AND s.code = 'G04';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.5
FROM diseases d, symptoms s
WHERE d.code = 'P01' AND s.code = 'G07';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.4
FROM diseases d, symptoms s
WHERE d.code = 'P01' AND s.code = 'G09';

-- Depresi Sedang (P02)
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.8
FROM diseases d, symptoms s
WHERE d.code = 'P02' AND s.code = 'G02';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.7
FROM diseases d, symptoms s
WHERE d.code = 'P02' AND s.code = 'G06';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s
WHERE d.code = 'P02' AND s.code = 'G08';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s
WHERE d.code = 'P02' AND s.code = 'G11';

-- Depresi Berat (P03)
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.9
FROM diseases d, symptoms s
WHERE d.code = 'P03' AND s.code = 'G05';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.8
FROM diseases d, symptoms s
WHERE d.code = 'P03' AND s.code = 'G10';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.9
FROM diseases d, symptoms s
WHERE d.code = 'P03' AND s.code = 'G03';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.0
FROM diseases d, symptoms s
WHERE d.code = 'P03' AND s.code = 'G12';
