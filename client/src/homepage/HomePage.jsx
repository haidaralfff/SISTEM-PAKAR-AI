import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
} from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import ScienceIcon from '@mui/icons-material/Science'
import DevicesIcon from '@mui/icons-material/Devices'
import RecommendationIcon from '@mui/icons-material/LocalHospital'
import BedtimeIcon from '@mui/icons-material/Bedtime'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import PsychologyIcon from '@mui/icons-material/Psychology'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import GroupOffIcon from '@mui/icons-material/GroupOff'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

const NAV_LINKS = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Kontak', href: '#kontak' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Ceritakan Gejala Anda',
    desc: 'Pilih gejala yang paling menggambarkan kondisi Anda saat ini — semuanya dirancang dengan bahasa yang mudah dipahami.',
    icon: <ChatBubbleOutlinedIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
  },
  {
    step: '02',
    title: 'Sistem Memproses',
    desc: 'Kombinasi gejala Anda dicocokkan dengan pengetahuan dari para psikolog untuk menghasilkan analisis yang terpercaya.',
    icon: <AnalyticsIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
  },
  {
    step: '03',
    title: 'Dapatkan Hasilnya',
    desc: 'Lihat tingkat keyakinan hasil analisis beserta langkah-langkah tindak lanjut yang bisa Anda ambil.',
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
  },
]

const FEATURES = [
  {
    icon: <ShieldIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
    title: 'Privasi Terjamin',
    desc: 'Data Anda hanya diproses untuk kepentingan analisis — tidak disimpan permanen dan tidak dibagikan ke siapapun.',
  },
  {
    icon: <ScienceIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
    title: 'Dirancang Pakar',
    desc: 'Pengetahuan di balik sistem ini disusun dan divalidasi oleh psikolog berlisensi, bukan sekadar rumus komputer.',
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
    title: 'Akses dari Mana Saja',
    desc: 'Buka langsung dari browser HP atau laptop Anda — tidak perlu download aplikasi apapun.',
  },
  {
    icon: <RecommendationIcon sx={{ fontSize: 28, color: '#3ba6f1' }} />,
    title: 'Panduan Tindak Lanjut',
    desc: 'Setiap hasil analisis dilengkapi rekomendasi langkah konkret dan rujukan ke layanan kesehatan mental terdekat.',
  },
]

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#fafaf9', minHeight: '100vh', fontFamily: '"Inter Variable", sans-serif' }}>

      {/* ─── NAVBAR ─── */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#fafaf9',
          borderBottom: '1px solid #e8e6e5',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: 3, minHeight: 56 }}>
          <Box
            component="img"
            src="/logo.svg"
            alt="Ruang Pulih"
            onClick={() => navigate('/')}
            sx={{
              height: 80,
              cursor: 'pointer',
              mr: 5,
            }}
          />

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                disableRipple
                sx={{
                  color: '#78716c',
                  borderRadius: 9999,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 13,
                  fontFamily: '"Inter Variable", sans-serif',
                  height: 32,
                  px: 1.5,
                  '&:hover': { color: '#0c0a09', bgcolor: '#f5f5f4' },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 13,
              fontFamily: '"Inter Variable", sans-serif',
              px: 2.5,
              py: 0.8,
              bgcolor: '#3ba6f1',
              color: '#ffffff',
              border: '1px solid #3398e1',
              '&:hover': { bgcolor: '#3398e1' },
            }}
          >
            Mulai Sekarang
          </Button>
        </Toolbar>
      </AppBar>

      {/* ─── HERO ─── */}
      <Box
        component="section"
        sx={{
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 36, md: 52 },
            lineHeight: 1.12,
            letterSpacing: '-1.092px',
            color: '#0c0a09',
            mb: 3,
          }}
        >
          Deteksi Dini Depresi{' '}
          <Box
            component="span"
            sx={{
              color: '#3398e1',
              bgcolor: '#c1e1f7',
              px: 1,
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            Sebelum Terlambat
          </Box>
        </Typography>

        <Typography
          sx={{
            maxWidth: 600,
            mx: 'auto',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 16,
            lineHeight: 1.69,
            color: '#78716c',
            mb: 5,
          }}
        >
          Kenali kondisi mental Anda lebih awal dengan alat skrining mandiri yang dirancang
          oleh psikolog. Cepat, aman, dan sepenuhnya rahasia — langkah pertama sebelum
          memutuskan untuk berkonsultasi dengan profesional.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              fontFamily: '"Inter Variable", sans-serif',
              px: 3.5,
              py: 1,
              bgcolor: '#3ba6f1',
              color: '#ffffff',
              border: '1px solid #3398e1',
              '&:hover': { bgcolor: '#3398e1' },
            }}
          >
            Mulai Konsultasi
          </Button>
          <Button
            variant="outlined"
            disableElevation
            href="#tentang"
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              fontWeight: 400,
              fontSize: 14,
              fontFamily: '"Inter Variable", sans-serif',
              px: 3.5,
              py: 1,
              color: '#0c0a09',
              border: '1px solid #e8e6e5',
              bgcolor: 'transparent',
              '&:hover': { bgcolor: '#f5f5f4', borderColor: '#d6d3d1' },
            }}
          >
            Pelajari Lebih Lanjut
          </Button>
        </Box>

        {/* Stats Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 3, md: 8 },
            mt: 8,
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '100%', label: 'Gratis & Privat' },
            { value: '<5 min', label: 'Durasi Konsultasi' },
            { value: '3 langkah', label: 'Proses Sederhana' },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontFamily: '"Inter Tight Variable", sans-serif',
                  fontSize: 24,
                  color: '#0c0a09',
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 13,
                  color: '#78716c',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ─── APakah INI UNTUK SAYA? ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#0c0a09',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Apakah Anda{' '}
          <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
            Mengalami Ini?
          </Box>
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 6,
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          Jika salah satu dari kondisi ini terasa familiar, Ruang Pulih bisa membantu Anda
          memahami kondisi diri sendiri.
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: 'Sulit tidur atau tidur berlebihan',
              desc: 'Begadang karena pikiran tidak bisa berhenti, atau justru seharian ingin berbaring tanpa semangat.',
              tag: 'Gangguan tidur',
              icon: <BedtimeIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
            {
              title: 'Kehilangan minat pada hal yang dulu disukai',
              desc: 'Hobi yang dulu menyenangkan terasa hampa. Motivasi kuliah dan aktivitas sehari-hari menurun drastis.',
              tag: 'Kehilangan motivasi',
              icon: <SentimentDissatisfiedIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
            {
              title: 'Mudah cemas dan overthinking',
              desc: 'Kepala terasa penuh dengan pikiran negatif yang berputar tanpa henti — sulit fokus dan rileks.',
              tag: 'Kecemasan berlebihan',
              icon: <PsychologyIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
            {
              title: 'Merasa lelah meski tidak banyak aktivitas',
              desc: 'Tubuh terasa berat, energi rendah, dan semuanya terasa melelahkan meski baru bangun tidur.',
              tag: 'Kelelahan kronis',
              icon: <MoodBadIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
            {
              title: 'Mengisolasi diri dari orang sekitar',
              desc: 'Tidak ingin bertemu siapapun, menghindari percakapan, dan memilih menyendiri terus-menerus.',
              tag: 'Penarikan diri sosial',
              icon: <GroupOffIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
            {
              title: 'Merasa tidak berharga atau bersalah',
              desc: 'Perasaan "aku tidak cukup baik" yang terus menghantui — bahkan untuk hal-hal kecil.',
              tag: 'Harga diri rendah',
              icon: <HeartBrokenIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
            },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
              <Box
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e8e6e5',
                  borderRadius: '10px',
                  p: 3,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '4px',
                      bgcolor: '#c1e1f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Chip
                    label={item.tag}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontFamily: '"Inter Variable", sans-serif',
                      bgcolor: '#c1e1f7',
                      color: '#0c0a09',
                      borderRadius: 9999,
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 15,
                    color: '#0c0a09',
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 13,
                    lineHeight: 1.64,
                    color: '#78716c',
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ─── HOW IT WORKS ─── */}
      <Box
        component="section"
        id="cara-kerja"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#0c0a09',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Hanya butuh{' '}
          <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
            3 langkah sederhana
          </Box>
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 6,
          }}
        >
          Prosesnya cepat dan tidak memaksa Anda menjawab pertanyaan yang melelahkan.
        </Typography>

        <Grid container spacing={3}>
          {HOW_IT_WORKS.map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.step}>
              <Box
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e8e6e5',
                  borderRadius: '10px',
                  p: 3.5,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '4px',
                      bgcolor: '#c1e1f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Inter Tight Variable", sans-serif',
                      fontWeight: 600,
                      fontSize: 32,
                      color: '#3ba6f1',
                      opacity: 0.35,
                    }}
                  >
                    {item.step}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 16,
                    color: '#0c0a09',
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 14,
                    lineHeight: 1.64,
                    color: '#78716c',
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ─── FEATURES ─── */}
      <Box
        component="section"
        id="fitur"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#0c0a09',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Mengapa{' '}
          <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
            Ruang Pulih
          </Box>
          ?
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 6,
          }}
        >
          Dibuat khusus untuk mahasiswa Indonesia — gratis, tanpa syarat, dan selalu menjaga kerahasiaan Anda.
        </Typography>

        <Grid container spacing={3}>
          {FEATURES.map((feat) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feat.title}>
              <Box
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e8e6e5',
                  borderRadius: '10px',
                  p: 3,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '4px',
                    bgcolor: '#c1e1f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  {feat.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 15,
                    color: '#0c0a09',
                    mb: 1,
                  }}
                >
                  {feat.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 13,
                    lineHeight: 1.64,
                    color: '#78716c',
                  }}
                >
                  {feat.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ─── TENTANG ─── */}
      <Box
        component="section"
        id="tentang"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: '#ffffff',
            border: '1px solid #e8e6e5',
            borderRadius: '16px',
            p: { xs: 4, md: 8 },
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                fontFamily: '"Inter Tight Variable", sans-serif',
                fontSize: { xs: 22, md: 28 },
                lineHeight: 1.25,
                color: '#0c0a09',
                mb: 2,
              }}
            >
              Tentang{' '}
              <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
                Ruang Pulih
              </Box>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 14,
                lineHeight: 1.69,
                color: '#78716c',
                mb: 2,
              }}
            >
              Ruang Pulih adalah platform skrining kesehatan mental yang membantu Anda
              mengenali gejala depresi sejak dini. Dirancang dengan bahasa yang hangat
              dan tidak menghakimi, sistem ini menjadi jembatan sebelum Anda memutuskan
              untuk berbicara dengan psikolog atau konselor.
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 14,
                lineHeight: 1.69,
                color: '#78716c',
              }}
            >
              Hasil analisis bersifat indikatif — bukan diagnosis medis resmi. Setiap
              hasil selalu disertai panduan tindak lanjut dan rujukan ke layanan
              profesional yang sesuai.
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', md: 320 },
              flexShrink: 0,
              bgcolor: '#fafaf9',
              border: '1px solid #e8e6e5',
              borderRadius: '10px',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Inter Tight Variable", sans-serif',
                fontWeight: 600,
                fontSize: 40,
                color: '#3ba6f1',
                mb: 0.5,
              }}
            >
              100% Gratis
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 14,
                color: '#78716c',
                lineHeight: 1.64,
              }}
            >
              Tidak ada biaya tersembunyi, tidak perlu kartu kredit. Cukup daftar dan
              mulai skrining pertama Anda sekarang juga.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ─── TESTIMONI ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#0c0a09',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Apa Kata{' '}
          <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
            Mereka?
          </Box>
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 6,
          }}
        >
          Pengalaman nyata dari mahasiswa yang telah menggunakan Ruang Pulih.
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              quote: 'Awalnya saya ragu dengan alat online. Tapi setelah coba, saya jadi lebih paham kondisi saya dan akutus untuk konsultasi ke psikolog kampus.',
              name: 'Rina',
              detail: 'Mahasiswi Psikologi, 21 tahun',
              rating: 5,
            },
            {
              quote: 'Prosesnya cuma 3 langkah, sangat singkat. Hasilnya membantu saya menyadari bahwa apa yang saya rasakan selama ini bukan sekadar "lelah biasa".',
              name: 'Andi',
              detail: 'Mahasiswa Teknik Informatika, 22 tahun',
              rating: 5,
            },
            {
              quote: 'Yang saya suka, bahasanya tidak menghakimi. Saya merasa aman mengisi gejala tanpa takut dinilai. Rekomendasinya juga jelas dan bisa langsung ditindaklanjuti.',
              name: 'Sari',
              detail: 'Mahasiswi Manajemen, 20 tahun',
              rating: 5,
            },
          ].map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.name}>
              <Box
                sx={{
                  bgcolor: '#ffffff',
                  border: '1px solid #e8e6e5',
                  borderRadius: '10px',
                  p: 3,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 12,
                    color: '#3ba6f1',
                    mb: 1.5,
                    letterSpacing: '0.05em',
                  }}
                >
                  {'★'.repeat(item.rating)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 14,
                    lineHeight: 1.69,
                    color: '#0c0a09',
                    fontStyle: 'italic',
                    mb: 3,
                    flex: 1,
                  }}
                >
                  "{item.quote}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      bgcolor: '#c1e1f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Inter Tight Variable", sans-serif',
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#3ba6f1',
                    }}
                  >
                    {item.name.charAt(0)}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: 13,
                        color: '#0c0a09',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontSize: 12,
                        color: '#a8a29e',
                      }}
                    >
                      {item.detail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ─── FAQ ─── */}
      <Box
        component="section"
        id="kontak"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 500,
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontSize: { xs: 24, md: 32 },
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#0c0a09',
            textAlign: 'center',
            mb: 1.5,
          }}
        >
          Pertanyaan{' '}
          <Box component="span" sx={{ color: '#3398e1', bgcolor: '#c1e1f7', px: 1, borderRadius: '4px' }}>
            Umum
          </Box>
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            color: '#78716c',
            mb: 6,
          }}
        >
          Masih ragu? Berikut jawaban atas pertanyaan yang paling sering ditanyakan.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            {
              q: 'Apakah data saya aman?',
              a: 'Ya. Data yang Anda masukkan hanya diproses untuk kepentingan analisis saat itu juga — tidak disimpan secara permanen di server kami dan tidak akan dibagikan kepada pihak manapun.',
            },
            {
              q: 'Berapa lama prosesnya?',
              a: 'Cukup 3 langkah sederhana dan kurang dari 5 menit. Anda tidak akan diminta mengisi formulir panjang atau menjawab puluhan pertanyaan.',
            },
            {
              q: 'Apakah ini diagnosis medis resmi?',
              a: 'Tidak. Ruang Pulih adalah alat bantu skrining mandiri, bukan pengganti konsultasi dengan psikolog atau psikiater. Hasil analisis bersifat indikatif dan selalu disertai rujukan ke layanan profesional.',
            },
            {
              q: 'Apakah benar-benar gratis?',
              a: '100% gratis. Tidak ada biaya tersembunyi, tidak perlu kartu kredit, dan tidak ada batasan penggunaan.',
            },
            {
              q: 'Siapa yang membuat Ruang Pulih?',
              a: 'Ruang Pulih dikembangkan oleh tim mahasiswa dengan pendampingan psikolog berlisensi. Pengetahuan di balik sistem ini divalidasi oleh profesional kesehatan mental.',
            },
            {
              q: 'Bagaimana jika hasilnya menunjukkan risiko tinggi?',
              a: 'Sistem akan langsung menampilkan rujukan ke layanan kesehatan mental terdekat dan hotline darurat. Kami sangat menyarankan untuk segera menghubungi profesional.',
            },
          ].map((item) => (
            <Box
              key={item.q}
              sx={{
                bgcolor: '#ffffff',
                border: '1px solid #e8e6e5',
                borderRadius: '10px',
                p: 3,
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 14,
                  color: '#0c0a09',
                  mb: 1,
                }}
              >
                {item.q}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 13,
                  lineHeight: 1.64,
                  color: '#78716c',
                }}
              >
                {item.a}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ─── CTA ─── */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 12 },
          px: 3,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
            bgcolor: '#1c1917',
            borderRadius: '16px',
            px: 4,
            py: { xs: 5, md: 7 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontSize: { xs: 22, md: 28 },
              lineHeight: 1.25,
              color: '#ffffff',
              mb: 2,
            }}
          >
            Mulai Langkah Pertama Anda
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: 14,
              lineHeight: 1.69,
              color: '#a8a29e',
              mb: 4,
            }}
          >
            Cukup email dan password — langsung mulai. Tidak perlu isi formulir panjang,
            tidak perluunggu verifikasi.
          </Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/register')}
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              fontFamily: '"Inter Variable", sans-serif',
              px: 3.5,
              py: 1,
              bgcolor: '#3ba6f1',
              color: '#ffffff',
              border: '1px solid #3398e1',
              '&:hover': { bgcolor: '#3398e1' },
            }}
          >
            Daftar Sekarang
          </Button>
        </Box>
      </Box>

      {/* ─── FOOTER ─── */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid #e8e6e5',
          py: 5,
          px: 3,
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: '"Inter Tight Variable", sans-serif',
                fontWeight: 500,
                fontSize: 16,
                color: '#0c0a09',
                mb: 0.5,
              }}
            >
              Ruang Pulih
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 12,
                color: '#78716c',
              }}
            >
              Platform Skrining Kesehatan Mental Mahasiswa
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: 12,
              color: '#a8a29e',
            }}
          >
            &copy; {new Date().getFullYear()} Ruang Pulih
          </Typography>
        </Box>

        <Chip
          label="Bukan pengganti diagnosis medis"
          size="small"
          sx={{
            mt: 3,
            height: 22,
            fontSize: 11,
            fontFamily: '"Inter Variable", sans-serif',
            bgcolor: '#fafaf9',
            color: '#78716c',
            border: '1px solid #e8e6e5',
            borderRadius: 9999,
          }}
        />
      </Box>
    </Box>
  )
}

export default HomePage
