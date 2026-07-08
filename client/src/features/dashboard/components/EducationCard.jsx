import { useState } from 'react'
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getArticles } from '../../articles/api'
import ArticleDetailModal from '../../articles/components/ArticleDetailModal'
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined'
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const fallbackTips = [
  {
    icon: <BedtimeOutlinedIcon sx={{ fontSize: 20, color: '#3ba6f1' }} />,
    title: 'Istirahat yang Cukup',
    body: 'Tidur 7–9 jam per malam membantu otak memproses emosi dan mengurangi stres.',
    tag: 'Fisik',
    tagColor: '#3ba6f114',
    tagText: '#3ba6f1',
  },
  {
    icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: 20, color: '#f97316' }} />,
    title: 'Bicara dengan Seseorang',
    body: 'Berbagi perasaan dengan teman, keluarga, atau konselor bisa meredakan beban.',
    tag: 'Sosial',
    tagColor: '#f9731614',
    tagText: '#f97316',
  },
  {
    icon: <DirectionsWalkOutlinedIcon sx={{ fontSize: 20, color: '#4caf50' }} />,
    title: 'Gerakan Kecil, Dampak Besar',
    body: 'Jalan kaki 10 menit atau peregangan ringan bisa meningkatkan suasana hati.',
    tag: 'Fisik',
    tagColor: '#4caf5014',
    tagText: '#4caf50',
  },
  {
    icon: <PhoneAndroidOutlinedIcon sx={{ fontSize: 20, color: '#a855f7' }} />,
    title: 'Batasi Media Sosial',
    body: 'Perbandingan sosial di media sosial sering memicu kecemasan.',
    tag: 'Emosional',
    tagColor: '#a855f714',
    tagText: '#a855f7',
  },
]

const severityColors = {
  P04: { bg: '#3ba6f114', text: '#3ba6f1' },
  P01: { bg: '#22c55e14', text: '#22c55e' },
  P02: { bg: '#f9731614', text: '#f97316' },
  P03: { bg: '#dc262614', text: '#dc2626' },
}

const severityLabels = {
  P04: 'Gangguan Mood',
  P01: 'Depresi Ringan',
  P02: 'Depresi Sedang',
  P03: 'Depresi Berat',
}

const EducationCard = () => {
  const navigate = useNavigate()
  const [selectedArticle, setSelectedArticle] = useState(null)

  const { data } = useQuery({
    queryKey: ['articles', 'dashboard'],
    queryFn: () => getArticles({ limit: 4 }),
    staleTime: 5 * 60 * 1000,
  })

  const articles = data?.data?.data || []

  if (articles.length > 0) {
    return (
      <>
        <Card sx={{ borderRadius: '16px', height: '100%', border: '1px solid #e8e6e5' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: '"Inter Tight Variable", sans-serif',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#0c0a09',
                }}
              >
                Artikel Edukasi
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/articles')}
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 12,
                  color: '#3ba6f1',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                Lihat Semua
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {articles.slice(0, 4).map((article) => {
                const colors = severityColors[article.disease_code] || { bg: '#78716c14', text: '#78716c' }
                const label = severityLabels[article.disease_code] || article.disease_code
                const firstSentence = article.content.split('.')[0]
                return (
                  <Box
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: '#f5f5f4',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        bgcolor: colors.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ArticleOutlinedIcon sx={{ fontSize: 20, color: colors.text }} />
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter Variable", sans-serif',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#0c0a09',
                          mb: 0.25,
                          lineHeight: 1.3,
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter Variable", sans-serif',
                          fontSize: 12,
                          color: '#78716c',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {firstSentence}.
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </CardContent>
        </Card>

        <ArticleDetailModal
          open={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          article={selectedArticle}
        />
      </>
    )
  }

  return (
    <Card sx={{ borderRadius: '16px', height: '100%', border: '1px solid #e8e6e5' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 600,
            fontSize: 15,
            color: '#0c0a09',
            mb: 2,
          }}
        >
          Tips Kesehatan Mental
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {fallbackTips.map((tip, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.5, borderRadius: '12px' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  bgcolor: tip.tagColor,
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
                    fontSize: 13,
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
                    fontSize: 12,
                    color: '#78716c',
                    lineHeight: 1.4,
                  }}
                >
                  {tip.body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default EducationCard
