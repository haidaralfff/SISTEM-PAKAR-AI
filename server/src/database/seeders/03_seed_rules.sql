-- Gangguan Mood (P04)
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G13';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G08';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.00
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G01';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G24';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G25';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G28';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G04';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G05';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G06';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G07';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G09';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G11';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G14';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G17';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G29';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P04' AND s.code = 'G30';

-- Depresi Ringan (P01) - existing rules
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G01';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.7
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G04';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.5
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G07';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.4
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G09';

-- Depresi Ringan (P01) - new rules from MySQL legacy
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G13';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G08';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.00
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G06';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G23';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G29';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.80
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G17';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.80
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G11';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P01' AND s.code = 'G21';

-- Depresi Sedang (P02) - existing rules
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.8
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G02';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.7
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G06';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G08';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.6
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G11';

-- Depresi Sedang (P02) - new rules from MySQL legacy
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G13';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G14';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G07';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G29';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G15';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.00
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G16';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G18';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G30';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.00
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G21';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G05';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P02' AND s.code = 'G26';

-- Depresi Berat (P03) - existing rules
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.9
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G05';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.8
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G10';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.9
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G03';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.0
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G12';

-- Depresi Berat (P03) - new rules from MySQL legacy
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G13';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G14';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G07';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G15';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G11';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G19';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.60
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G20';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.20
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G09';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G30';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G26';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 1.00
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G27';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.80
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G22';

-- Depresi Berat (P03) - tambahan rules untuk gejala yang belum ada
INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G01';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G02';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G04';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G06';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G08';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G16';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G17';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G18';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.50
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G21';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G23';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G24';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G25';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.30
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G28';

INSERT INTO rules (disease_id, symptom_id, cf_expert)
SELECT d.id, s.id, 0.40
FROM diseases d, symptoms s WHERE d.code = 'P03' AND s.code = 'G29';
