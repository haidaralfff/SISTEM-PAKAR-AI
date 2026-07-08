-- Seed articles with improved content for students
-- Using disease_code instead of UUID foreign key for flexibility

INSERT INTO articles (disease_code, title, content, image_url, is_published) VALUES

  ('P04', 'Gangguan Mood', 'Gangguan mood adalah kondisi di mana seseorang mengalami perubahan suasana hati yang ekstrem, mulai dari perasaan sangat senang (mania) hingga sangat sedih (depresi). Kondisi ini sering kali tidak disadari karena dianggap sebagai bagian dari "naik-turunnya" kehidupan sehari-hari.

Gangguan mood pada mahasiswa sering kali dipicu oleh tekanan akademik, masalah keuangan, konflik dalam hubungan sosial, atau perubahan besar dalam kehidupan. Ketika seseorang terlalu lama terlarut dalam tekanan tanpa mengelolanya dengan baik, risiko berkembangnya gangguan mood menjadi lebih tinggi.

Ciri-ciri gangguan mood yang perlu diwaspadai antara lain: suasana hati yang berubah drastis tanpa alasan jelas, kesulitan mengontrol emosi, mudah marah atau menangis, serta perubahan pola tidur dan nafsu makan yang signifikan. Kondisi ini juga dapat memengaruhi kemampuan konsentrasi dan motivasi dalam belajar.

Jika tidak ditangani, gangguan mood dapat berkembang menjadi kondisi yang lebih serius seperti depresi. Oleh karena itu, penting untuk mengenali tanda-tanda awal dan mencari bantuan tepat waktu. Langkah sederhana seperti berolahraga secara teratur, menjaga pola tidur, dan berbicara dengan orang terdekat dapat membantu mengelola suasana hati.', 'https://plus.unsplash.com/premium_photo-1668062843172-0129f25a1276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', true),

  ('P01', 'Depresi Ringan', 'Depresi ringan (minor) adalah kondisi di mana seseorang merasakan kesedihan atau kehilangan minat yang berlangsung dalam tingkat yang lebih ringan dibandingkan depresi berat. Kondisi ini sering kali terjadi setelah mengalami kejadian yang mengecewakan atau menyedihkan, seperti nilai jelek, putus hubungan, atau konflik dengan teman.

Yang membedakan depresi ringan dari kesedihan biasa adalah durasi dan dampaknya. Kesedihan biasa umumnya mereda dalam beberapa hari, sedangkan depresi ringan dapat berlangsung berminggu-minggu dan mengganggu aktivitas sehari-hari. Seseorang dengan depresi ringan mungkin masih bisa menjalani rutinitas, tetapi dengan energi dan semangat yang berkurang.

Ciri-ciri depresi ringan yang perlu diwaspadai antara lain: merasa sedih atau kosong hampir setiap hari, kehilangan minat pada aktivitas yang biasanya menyenangkan, sulit berkonsentrasi, mudah lelah, perubahan pola tidur (terlalu banyak atau terlalu sedikit), dan merasa tidak berharga.

Langkah awal yang bisa dilakukan antara lain: menjaga rutinitas harian, berolahraga minimal 30 menit sehari, berbicara dengan teman atau keluarga tentang perasaan yang dialami, membatasi paparan media sosial, serta mencoba teknik relaksasi seperti meditasi atau pernapasan dalam. Jika gejala berlangsung lebih dari 2 minggu, sebaiknya berkonsultasi dengan konselor atau psikolog.', 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/10/04084507/Ini-Ciri-Ciri-Depresi-Ringan-yang-Masih-Sering-Diabaikan.jpg', true),

  ('P02', 'Depresi Sedang', 'Depresi sedang adalah kondisi di mana seseorang mengalami gejala depresi yang lebih intens dibandingkan depresi ringan, dengan durasi minimal 2 minggu. Pada tahap ini, seseorang mulai mengalami kesulitan nyata dalam menjalani aktivitas sehari-hari, baik di kampus, tempat kerja, maupun dalam kehidupan sosial.

Dampak depresi sedang terhadap kehidupan mahasiswa sangat signifikan. Penurunan motivasi belajar, kesulitan mengikuti perkuliahan, absensi yang meningkat, dan penurunan prestasi akademik merupakan konsekuensi yang sering terjadi. Selain itu, hubungan dengan teman dan keluarga juga dapat terganggu karena seseorang cenderung menarik diri dari lingkungan sosial.

Ciri-ciri depresi sedang yang perlu diperhatikan: merasa sedih atau putus asa hampir setiap hari, kehilangan minat pada hampir semua aktivitas, gangguan tidur yang signifikan, perubahan nafsu makan yang drastis, sulit berkonsentrasi dalam mengambil keputusan, merasa lelah tanpa energi, serta muncul pikiran tentang kematian atau bunuh diri (meskipun tidak memiliki rencana spesifik).

Teman dan keluarga memiliki peran penting dalam membantu seseorang dengan depresi sedang. Tanda-tanda yang perlu diwaspadai antara lain: perubahan perilaku yang drastis, penarikan diri dari aktivitas sosial, penurunan performa akademik, dan perubahan fisik seperti penurunan berat badan yang signifikan.

Penanganan depresi sedang biasanya memerlukan campur tangan profesional, seperti psikoterapi (terapi bicara) atau konseling rutin. Dalam beberapa kasus, dokter mungkin juga mempertimbangkan terapi obat-obatan. Segera hubungi layanan kesehatan mental kampus atau hotline kesehatan mental jika mengalami gejala-gejala tersebut.', 'https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg', true),

  ('P03', 'Depresi Berat', 'Depresi mayor (berat) adalah kondisi gangguan mood yang paling serius dan memerlukan penanganan medis segera. Kondisi ini ditandai dengan perasaan sedih yang mendalam dan meluas, kehilangan minat atau kesenangan pada hampir semua aktivitas, serta gangguan fungsi tubuh yang signifikan.

Depresi mayor dapat berlangsung cukup lama, mulai dari 2 minggu hingga bertahun-tahun jika tidak ditangani. Pada kondisi ini, seseorang akan sangat sulit untuk berfungsi dengan baik dalam kehidupan sehari-hari. Aktivitas sederhana seperti bangun dari tempat tidur, mandi, atau makan menjadi sebuah tantangan besar.

Ciri-ciri depresi mayor yang harus segera mendapat perhatian: merasa sedih, kosong, atau putus asa hampir setiap hari sepanjang hari, kehilangan minat atau kesenangan pada semua aktivitas, perubahan berat badan yang signifikan (naik atau turun), gangguan tidur yang parah (insomnia atau hipersomnia), kehilangan energi hingga merasa selalu lelah, perasaan tidak berharga atau bersalah secara berlebihan, kesulitan berkonsentrasi atau mengambil keputusan, serta pikiran berulang tentang kematian atau bunuh diri.

Bahaya depresi mayor jika tidak ditangani: risiko bunuh diri yang tinggi, penurunan fungsi kognitif yang permanen, gangguan pada sistem imun, serta peningkatan risiko penyakit fisik lainnya. Dalam beberapa kasus yang sangat berat, seseorang dapat mengalami gejala psikotik seperti halusinasi atau delusi.

Langkah darurat yang harus dilakukan: segera hubungi layanan darurat kesehatan mental, jangan biarkan penderita sendirian, dan bantu mereka untuk mendapatkan bantuan profesional sesegera mungkin. Banyak universitas memiliki pusat konseling yang menyediakan layanan gratis bagi mahasiswa.', 'https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/09/22173906/mental-illness-and-disorders.jpg', true);
