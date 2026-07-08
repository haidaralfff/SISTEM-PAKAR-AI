import { useState } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getArticles } from '../features/articles/api'
import ArticleList from '../features/articles/components/ArticleList'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'

const filters = [
  { label: 'Semua', value: null },
  { label: 'Gangguan Mood', value: 'P04', color: '#3ba6f1' },
  { label: 'Depresi Ringan', value: 'P01', color: '#22c55e' },
  { label: 'Depresi Sedang', value: 'P02', color: '#f97316' },
  { label: 'Depresi Berat', value: 'P03', color: '#dc2626' },
]

const ArticlesPage = () => {
  const [activeFilter, setActiveFilter] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['articles', activeFilter],
    queryFn: () => getArticles({ disease_code: activeFilter, limit: 20 }),
  })

  const articles = data?.data?.data || []

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: '"Inter Tight Variable", sans-serif',
          fontWeight: 600,
          fontSize: 22,
          color: '#0c0a09',
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PsychologyOutlinedIcon sx={{ color: '#3ba6f1', fontSize: 24 }} />
        Artikel Edukasi
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter Variable", sans-serif',
          fontSize: 14,
          color: '#78716c',
          mb: 3,
        }}
      >
        Pelajari lebih lanjut tentang kondisi kesehatan mental
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <Chip
            key={f.label}
            label={f.label}
            onClick={() => setActiveFilter(f.value)}
            sx={{
              fontFamily: '"Inter Variable", sans-serif',
              fontSize: 13,
              fontWeight: 500,
              height: 34,
              borderRadius: 9999,
              bgcolor: activeFilter === f.value ? (f.color || '#3ba6f1') : '#f5f5f4',
              color: activeFilter === f.value ? '#fff' : '#78716c',
              border: '1px solid',
              borderColor: activeFilter === f.value ? (f.color || '#3ba6f1') : '#e8e6e5',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: activeFilter === f.value ? (f.color || '#3ba6f1') : '#e8e6e5',
              },
            }}
          />
        ))}
      </Box>

      <ArticleList articles={articles} isLoading={isLoading} />
    </Box>
  )
}

export default ArticlesPage
