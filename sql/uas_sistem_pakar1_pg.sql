-- ============================================================
-- PostgreSQL version of uas_sistem_pakar1.sql
-- Converted from MySQL syntax
-- ============================================================

-- Create schema for MySQL legacy data (if not exists)
CREATE SCHEMA IF NOT EXISTS mysql_legacy;

-- ============================================================
-- Tabel: artikels (from uas_sistem_pakar1.sql)
-- ============================================================
DROP TABLE IF EXISTS mysql_legacy.artikels_v2 CASCADE;

CREATE TABLE mysql_legacy.artikels_v2 (
  id BIGSERIAL PRIMARY KEY,
  url_gambar VARCHAR(255) NOT NULL,
  kode_depresi VARCHAR(10) NOT NULL,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

INSERT INTO mysql_legacy.artikels_v2 (id, url_gambar, kode_depresi, judul, isi, created_at, updated_at) VALUES
(1, 'https://via.placeholder.com/640x480.png/0011ff?text=emotion+qui', 'P002', 'Inventore eum aperiam eligendi voluptate ipsa.', 'Ut eveniet quaerat aut. Voluptas et sint sit voluptas et nesciunt vel. Cum ipsam et iure quo sit perspiciatis labore. Architecto ut est qui quis dolores. Corporis nesciunt magni distinctio nihil ducimus tempora. Laborum et quaerat sequi quia consequatur nam illo. Deleniti sit itaque ut fuga accusamus quia. Laborum in est voluptas pariatur temporibus. Cum ut dolor possimus minima hic dolores. Ut et aut nihil recusandae dolores. Sit nihil modi doloremque ad consequuntur. Nulla autem totam est suscipit.', '2022-12-28 03:27:28', '2022-12-28 03:27:28'),
(2, 'https://via.placeholder.com/640x480.png/00dd33?text=emotion+dolorem', 'P002', 'Amet animi vitae dolorum aut.', 'Nulla dolores et rerum vel qui. Vel quo vel ipsum perspiciatis. Reiciendis tempora reprehenderit eius voluptas. Aut nam necessitatibus consequatur earum earum natus. Dolorem nulla ea tenetur et et. Enim vitae aut enim mollitia temporibus voluptas. Harum modi provident similique asperiores et voluptate. Nisi laborum dolorem laboriosam distinctio fugit. Quisquam voluptas veniam repellendus molestiae ex. Voluptates consequatur qui explicabo non. Voluptas est magnam quod officiis placeat sit. Eum dicta aperiam nihil. Quidem rerum aut tenetur animi voluptas.', '2022-12-28 03:27:28', '2022-12-28 03:27:28'),
(3, 'https://via.placeholder.com/640x480.png/00aadd?text=emotion+quia', 'P002', 'Nesciunt dolorem ut sapiente praesentium eaque omnis.', 'Beatae illo dolores quo. Eaque sapiente aliquid ab facere ut. Et sunt necessitatibus sed ex. Magnam ea fugit vero optio. Nisi perferendis illo quisquam mollitia dignissimos. Impedit et at ipsum. Eligendi et non ipsa qui debitis placeat totam. Veritatis qui ratione quia itaque optio nemo ut similique. Numquam quasi totam officiis unde est sunt quo. In ratione rerum doloribus temporibus. Et molestias rerum saepe repellat dolores corrupti illum. Magnam quos molestiae et. Modi dolores atque sit.', '2022-12-28 03:27:28', '2022-12-28 03:27:28'),
(4, 'https://via.placeholder.com/640x480.png/00bbaa?text=emotion+qui', 'P002', 'Facilis iste soluta maxime qui sequi voluptatem quae.', 'Tenetur est a ut eos repellendus aut vitae. Odio odio est nobis esse quia. Fugit soluta atque iure aut. Est possimus ut recusandae. Non ducimus et ipsam dolor ipsam vel sunt amet. Occaecati doloribus molestiae dolorem earum corrupti sint. Alias et vel molestiae minus magni. Repudiandae corrupti repellendus aut harum. Qui alias velit quos voluptatem voluptate eum sint non. Amet nihil ut rerum nemo voluptas. Sit unde minus distinctio. Quam voluptatem consequatur animi.', '2022-12-28 03:27:28', '2022-12-28 03:27:28'),
(5, 'https://unsplash.com/photos/w818vRg6pdY', 'P001', 'Gangguan Mood', 'Ganggguan mood yang terjadi pada seseorang ini umumnya terjadi karena banyaknya tekanan yang menimpa dirinya dan cenderung terlarut dalam tekanan dapat meningkatkan resiko berkembangnya gangguan mood yang kemudian dapat berubah menjadi depresi terutama depresi mayor. Hal ini terbukti pada suatu penelitian yang menemukan bahwa dalam sekitar empat dari lima kasus, depresi mayor diawali oleh peristiwa kehidupan yang penuh tekanan.', NULL, NULL),
(6, 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/10/04084507/Ini-Ciri-Ciri-Depresi-Ringan-yang-Masih-Sering-Diabaikan.jpg', 'P002', 'Depresi Minor / Depresi Ringan', 'Depresi ringan ini di identikkan dengan depresi minor yang merupakan perasaan melankolis yang berlangsung sebentar dan disebabkan oleh sebuah kejadian yang tragis atau mengandung ancaman, atau kehilangan sesuatu yang penting dalam kehidupan si penderita (Meier, 2000: 20-21). Orang dengan depresi ringan ini setidaknya memiliki 2 dari gejala lainnya dan 2-3 dari gejala utama. (Maslim, 2003, 64).', NULL, NULL),
(7, 'https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg', 'P003', 'Depresi Sedang', 'Depresi sedang ini di alami oleh penderita selama kurang 2 minggu, dan orang dengan depresi sedang ini mengalami kesulitan nyata untuk meneruskan kegiatan social, pekerjaan dan urusan rumah tangga. Orang dengan depresi sedang ini setidaknya memiliki 2-3 dari gejala utama dan 3-4 dari gejala lainnya (Maslim,  2003: 64).', NULL, NULL),
(8, 'https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg', 'P004', 'Depresi mayor / Depresi Berat', 'Depresi mayor merupakan salah satu gangguan yang prevalensinya paling tinggi di antara berbagai gangguan (Davidson, 2006: 374). Depresi mayor adalah kemurungan yang dalam dan menyebar luas. Perasaan murung ini mampu menyedot semangat dan energy serta menyelubungi kehidupan si penderita seperti asap yang tebak dan menyesakkan dada. Depresi mayor ini dapat berlangsung cukup lama mulai dari empat belas hari sampai beberapa tahun. Hal ini menyebabkan penderita akan sangat sulit utnuk berfungsi dengan baik di lingkungannya. Orang dengan depresi mayor ini juga terkadang disertai dengan keinginan untuk bunuh diri atau bahkan keinginan untuk mati. Orang yang sangat tertekan, mereka akan mengalami dampak hal-hal yang mengganggu kejiwaan mereka seperti gila, paranoia atau halusinasi pendengaran (Meier, 2000: 25-26).', NULL, NULL);

SELECT setval('mysql_legacy.artikels_v2_id_seq', 8);

-- ============================================================
-- Tabel: diagnosas (from uas_sistem_pakar1.sql)
-- ============================================================
DROP TABLE IF EXISTS mysql_legacy.diagnosas_v2 CASCADE;

CREATE TABLE mysql_legacy.diagnosas_v2 (
  id BIGSERIAL PRIMARY KEY,
  diagnosa_id VARCHAR(50) NOT NULL,
  data_diagnosa JSONB NOT NULL,
  kondisi JSONB NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

INSERT INTO mysql_legacy.diagnosas_v2 (id, diagnosa_id, data_diagnosa, kondisi, created_at, updated_at) VALUES
(1, '63abc5cb869eb', '[{"value": "0.52", "kode_depresi": "P001"}, {"value": "0.8704", "kode_depresi": "P002"}, {"value": "1", "kode_depresi": "P003"}, {"value": "0.99616", "kode_depresi": "P004"}]', '[["G001", "0.6"], ["G002", "0.4"], ["G010", "0.6"], ["G013", "0.4"], ["G015", "0.8"], ["G017", "0"], ["G020", "1"], ["G024", "0"], ["G026", "0.4"]]', '2022-12-28 03:27:55', '2022-12-28 03:27:55');

SELECT setval('mysql_legacy.diagnosas_v2_id_seq', 1);
