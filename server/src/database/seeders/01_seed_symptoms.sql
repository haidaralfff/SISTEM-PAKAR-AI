INSERT INTO symptoms (code, name, description, category, is_high_risk, legacy_code) VALUES
-- Kognitif (existing)
('G01', 'Apakah Anda sulit berkonsentrasi?', 'Merasa sulit fokus saat belajar atau mengerjakan tugas', 'Kognitif', false, 'G003'),
('G02', 'Apakah Anda sering memikirkan hal-hal negatif secara berulang?', 'Sering memikirkan hal-hal buruk tentang diri sendiri', 'Kognitif', false, NULL),
('G03', 'Apakah Anda sulit mengambil keputusan?', 'Merasa ragu-ragu dan bingung dalam mengambil keputusan sehari-hari', 'Kognitif', false, 'G026'),

-- Emosional (existing)
('G04', 'Apakah Anda mudah merasa cemas?', 'Merasa gelisah atau khawatir berlebihan terhadap hal-hal kecil', 'Emosional', false, NULL),
('G05', 'Apakah Anda mudah marah tanpa sebab yang jelas?', 'Merasa mudah tersinggung dan marah tanpa alasan jelas', 'Emosional', false, 'G023'),
('G06', 'Apakah Anda kehilangan minat terhadap hal-hal yang biasanya Anda nikmati?', 'Tidak lagi tertarik pada hobi atau kegiatan yang dulu disukai', 'Emosional', false, 'G006'),

-- Fisik (existing)
('G07', 'Apakah Anda mengalami kesulitan tidur?', 'Kesulitan memulai atau mempertahankan tidur, atau tidur terlalu banyak', 'Fisik', false, 'G010'),
('G08', 'Apakah Anda merasa kelelahan secara terus-menerus?', 'Merasa lelah sepanjang hari meskipun tidak melakukan aktivitas berat', 'Fisik', false, 'G002'),
('G09', 'Apakah nafsu makan Anda mengalami perubahan?', 'Makan jauh lebih banyak atau lebih sedikit dari biasanya', 'Fisik', false, 'G021'),

-- Sosial (existing)
('G10', 'Apakah Anda menarik diri dari lingkungan sosial?', 'Menghindari pertemuan sosial dan lebih suka menyendiri', 'Sosial', false, 'G024'),
('G11', 'Apakah Anda merasa kesepian?', 'Merasa sendiri meskipun dikelilingi orang lain', 'Sosial', false, 'G016'),
('G12', 'Apakah Anda memiliki pikiran untuk menyakiti diri sendiri?', 'Muncul pikiran untuk menyakiti diri sendiri atau mengakhiri hidup', 'Sosial', true, 'G025'),

-- Kognitif (new from MySQL legacy)
('G15', 'Apakah Anda merasa kecewa dengan diri sendiri?', 'Merasa kecewa atau tidak puas dengan kemampuan diri sendiri', 'Kognitif', false, 'G012'),
('G16', 'Apakah Anda merasa terganggu dengan banyak hal?', 'Mudah terdistraksi dan sulit fokus karena banyak pikiran', 'Kognitif', false, 'G013'),
('G18', 'Apakah Anda sering merasa bersalah?', 'Merasa bersalah secara berlebihan tanpa alasan yang jelas', 'Kognitif', false, 'G017'),
('G19', 'Apakah Anda merasa dihakimi oleh orang lain?', 'Merasa orang lain selalu menilai atau menghakimi', 'Kognitif', false, 'G018'),
('G20', 'Apakah Anda membenci diri sendiri?', 'Merasa benci atau tidak menyukai diri sendiri', 'Kognitif', false, 'G019'),
('G21', 'Apakah Anda khawatir tentang penampilan Anda?', 'Terlalu memikirkan penampilan fisik dan takut dinilai orang', 'Kognitif', false, 'G022'),
('G22', 'Apakah Anda kurang percaya diri?', 'Merasa tidak mampu atau meragukan kemampuan sendiri', 'Kognitif', false, 'G029'),
('G23', 'Apakah Anda cenderung pesimis?', 'Selalu berpikiran negatif tentang masa depan', 'Kognitif', false, 'G008'),
('G25', 'Apakah Anda sering melamun?', 'Sering terjebak dalam pikiran sendiri dan tidak fokus', 'Kognitif', false, 'G005'),
('G26', 'Apakah Anda sulit melakukan kegiatan dengan baik?', 'Merasa sulit menyelesaikan tugas atau aktivitas sehari-hari', 'Kognitif', false, 'G027'),

-- Emosional (new from MySQL legacy)
('G13', 'Apakah Anda sering merasa sedih tanpa alasan yang jelas?', 'Merasa sedih atau murung tanpa alasan yang jelas', 'Emosional', false, 'G001'),
('G14', 'Apakah Anda sering menangis secara tiba-tiba?', 'Menangis tanpa sebab yang jelas atau karena hal kecil', 'Emosional', false, 'G009'),
('G17', 'Apakah Anda sering murung atau lesu?', 'Sering merasa sedih, murung, atau kehilangan semangat', 'Emosional', false, 'G014'),
('G24', 'Apakah Anda mudah merasa bosan?', 'Cepat bosan dengan aktivitas yang biasanya disukai', 'Emosional', false, 'G004'),
('G28', 'Apakah Anda merasa risau?', 'Merasa gelisah, khawatir, atau tidak tenang', 'Emosional', false, 'G007'),
('G29', 'Apakah Anda merasa cemas secara berlebihan?', 'Merasa cemas atau takut secara berlebihan', 'Emosional', false, 'G011'),
('G30', 'Apakah Anda mudah tersinggung?', 'Mudah marah atau tersinggung dengan hal-hal kecil', 'Emosional', false, 'G020'),

-- Fisik (new from MySQL legacy)
('G27', 'Apakah berat badan Anda mengalami penambahan atau penurunan?', 'Berat badan naik atau turun tanpa perubahan pola makan', 'Fisik', false, 'G028');
