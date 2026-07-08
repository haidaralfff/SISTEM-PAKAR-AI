import { Card, CardContent, Typography, Box } from '@mui/material'
import { useAuthStore } from '../../../store/authStore'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 15) return 'Selamat Siang'
  if (hour < 18) return 'Selamat Sore'
  return 'Selamat Malam'
}

const quotes = [
  'Pemulihan bukan tentang menjadi sempurna, tetapi menjadi lebih baik setiap hari.',
  'Tidak apa-apa untuk tidak baik-baik saja. Yang penting, kamu terus berusaha.',
  'Setiap langkah kecil adalah kemajuan. Kamu lebih kuat dari yang kamu kira.',
  'Kamu tidak sendirian dalam perjalanan ini. Setiap proses layak dihargai.',
  'Istirahat bukan berarti menyerah. Kadang, diam adalah bentuk keberanian.',
]

const HeroCard = () => {
  const user = useAuthStore((s) => s.user)
  const quote = quotes[new Date().getDate() % quotes.length]

  return (
    <Card
      sx={{
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        border: '1px solid #e8e6e5',
        boxShadow: '0 4px 20px rgba(59, 166, 241, 0.08)',
      }}
    >
      <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontWeight: 600,
              fontSize: 24,
              color: '#0c0a09',
              mb: 0.5,
            }}
          >
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: 14,
              color: '#78716c',
              mb: 2,
            }}
          >
            Bagaimana perasaanmu hari ini?
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: 13,
              fontStyle: 'italic',
              color: '#a8a29e',
              borderLeft: '3px solid #3ba6f1',
              pl: 2,
            }}
          >
            &ldquo;{quote}&rdquo;
          </Typography>
        </Box>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '20px',
            bgcolor: '#3ba6f10a',
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <SpaOutlinedIcon sx={{ fontSize: 48, color: '#3ba6f1', opacity: 0.6 }} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default HeroCard
