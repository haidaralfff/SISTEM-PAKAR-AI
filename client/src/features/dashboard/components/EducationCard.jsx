import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'

const tips = [
  {
    title: 'Istirahat yang Cukup',
    body: 'Tidur 7-9 jam per malam membantu otak memproses emosi dan mengurangi stres. Hindari layar HP 1 jam sebelum tidur.',
    tag: 'Fisik',
  },
  {
    title: 'Bicara dengan Seseorang',
    body: 'Berbagi perasaan dengan teman, keluarga, atau konselor bisa meredakan beban. Kamu tidak sendirian.',
    tag: 'Sosial',
  },
  {
    title: 'Gerakan Kecil, Dampak Besar',
    body: 'Jalan kaki 10 menit atau peregangan ringan bisa meningkatkan suasana hati. Tidak perlu olahraga berat.',
    tag: 'Fisik',
  },
  {
    title: 'Batasi Media Sosial',
    body: 'Perbandingan sosial di media sosial sering memicu kecemasan. Coba kurangi screen time secara bertahap.',
    tag: 'Emosional',
  },
]

const EducationCard = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TipsAndUpdatesOutlinedIcon fontSize="small" color="primary" /> Tips Kesehatan Mental
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {tips.map((tip, i) => (
            <Box key={i}>
              <Typography variant="subtitle2" fontWeight={600}>
                {tip.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {tip.body}
              </Typography>
              <Chip label={tip.tag} size="small" variant="outlined" sx={{ mt: 0.5 }} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default EducationCard
