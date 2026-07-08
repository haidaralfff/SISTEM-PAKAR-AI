import { Card, CardContent, Typography } from '@mui/material'
import { useAuthStore } from '../../../store/authStore'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 15) return 'Selamat Siang'
  if (hour < 18) return 'Selamat Sore'
  return 'Selamat Malam'
}

const quotes = [
  'Kesehatan mental bukanlah tujuan, melainkan proses perjalanan.',
  'Tidak apa-apa untuk tidak baik-baik saja.',
  'Setiap langkah kecil adalah kemajuan.',
  'Kamu tidak sendirian dalam perjalanan ini.',
]

const WelcomeCard = () => {
  const user = useAuthStore((s) => s.user)
  const quote = quotes[new Date().getDate() % quotes.length]

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          sx={{ fontWeight: 400, color: '#0c0a09', fontFamily: '"Inter Tight Variable", sans-serif', mb: 0.5 }}
        >
          {getGreeting()}, {user?.name}!
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic', color: '#78716c', fontFamily: '"Inter Variable", sans-serif' }}
        >
          &ldquo;{quote}&rdquo;
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
