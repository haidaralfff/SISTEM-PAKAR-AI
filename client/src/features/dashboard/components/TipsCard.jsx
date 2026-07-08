import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined'
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'

const tips = [
  {
    icon: <BedtimeOutlinedIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />,
    title: 'Istirahat yang Cukup',
    desc: 'Tidur 7–9 jam membantu otak memproses emosi.',
    badge: 'Fisik',
    badgeColor: '#3ba6f114',
    badgeText: '#3ba6f1',
  },
  {
    icon: <DirectionsWalkOutlinedIcon sx={{ fontSize: 22, color: '#4caf50' }} />,
    title: 'Gerakan Kecil',
    desc: 'Jalan kaki 10 menit bisa meningkatkan suasana hati.',
    badge: 'Fisik',
    badgeColor: '#4caf5014',
    badgeText: '#4caf50',
  },
  {
    icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: 22, color: '#f97316' }} />,
    title: 'Bicara dengan Seseorang',
    desc: 'Berbagi perasaan bisa meredakan beban.',
    badge: 'Sosial',
    badgeColor: '#f9731614',
    badgeText: '#f97316',
  },
  {
    icon: <PhoneAndroidOutlinedIcon sx={{ fontSize: 22, color: '#a855f7' }} />,
    title: 'Batasi Media Sosial',
    desc: 'Kurangi screen time untuk kurangi kecemasan.',
    badge: 'Emosional',
    badgeColor: '#a855f714',
    badgeText: '#a855f7',
  },
]

const tip = tips[new Date().getDate() % tips.length]

const TipsCard = () => {
  return (
    <Card sx={{ borderRadius: '16px', height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 500,
            fontSize: 14,
            color: '#0c0a09',
            mb: 2,
          }}
        >
          Tips Hari Ini
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              bgcolor: tip.badgeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {tip.icon}
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: '#0c0a09',
                mb: 0.25,
              }}
            >
              {tip.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 13,
                color: '#78716c',
                mb: 1,
              }}
            >
              {tip.desc}
            </Typography>
            <Chip
              label={tip.badge}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                fontFamily: '"Inter Variable", sans-serif',
                bgcolor: tip.badgeColor,
                color: tip.badgeText,
                borderRadius: 9999,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TipsCard
