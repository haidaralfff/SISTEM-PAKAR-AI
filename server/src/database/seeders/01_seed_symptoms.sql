INSERT INTO symptoms (code, name, description, category, is_high_risk) VALUES
-- Kognitif
('G01', 'Sulit berkonsentrasi', 'Merasa sulit fokus saat belajar atau mengerjakan tugas', 'Kognitif', false),
('G02', 'Pikiran negatif berulang', 'Sering memikirkan hal-hal buruk tentang diri sendiri', 'Kognitif', false),
('G03', 'Sulit mengambil keputusan', 'Merasa ragu-ragu dan bingung dalam mengambil keputusan sehari-hari', 'Kognitif', false),

-- Emosional
('G04', 'Mudah cemas', 'Merasa gelisah atau khawatir berlebihan terhadap hal-hal kecil', 'Emosional', false),
('G05', 'Mudah marah', 'Merasa mudah tersinggung dan marah tanpa alasan jelas', 'Emosional', false),
('G06', 'Kehilangan minat', 'Tidak lagi tertarik pada hobi atau kegiatan yang dulu disukai', 'Emosional', false),

-- Fisik
('G07', 'Sulit tidur', 'Kesulitan memulai atau mempertahankan tidur, atau tidur terlalu banyak', 'Fisik', false),
('G08', 'Kelelahan terus-menerus', 'Merasa lelah sepanjang hari meskipun tidak melakukan aktivitas berat', 'Fisik', false),
('G09', 'Perubahan nafsu makan', 'Makan jauh lebih banyak atau lebih sedikit dari biasanya', 'Fisik', false),

-- Sosial
('G10', 'Menarik diri dari lingkungan', 'Menghindari pertemuan sosial dan lebih suka menyendiri', 'Sosial', false),
('G11', 'Merasa kesepian', 'Merasa sendiri meskipun dikelilingi orang lain', 'Sosial', false),
('G12', 'Pikiran menyakiti diri', 'Muncul pikiran untuk menyakiti diri sendiri atau mengakhiri hidup', 'Sosial', true);
