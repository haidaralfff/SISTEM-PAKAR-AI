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
    <Card className="mb-3 !border-0" sx={{ background: 'linear-gradient(135deg, #3ba6f1 0%, #60b5f0 100%)', color: 'white' }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} className="!text-white">
          {getGreeting()}, {user?.name}!
        </Typography>
        <Typography variant="body2" className="!text-white/90 italic mt-1">
          "{quote}"
        </Typography>
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
