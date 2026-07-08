import { useState } from 'react'
import { Card, CardContent, Typography, Box, Chip, Skeleton } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ArticleDetailModal from './ArticleDetailModal'

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

const ArticleCard = ({ article, onClick }) => {
  const colors = severityColors[article.disease_code] || { bg: '#78716c14', text: '#78716c' }
  const label = severityLabels[article.disease_code] || article.disease_code

  const firstParagraph = article.content.split('\n\n')[0]

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e8e6e5',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          borderColor: '#3ba6f1',
        },
      }}
    >
      {article.image_url && (
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${article.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Chip
          label={label}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            height: 22,
            fontSize: 11,
            fontWeight: 500,
            fontFamily: '"Inter Variable", sans-serif',
            bgcolor: colors.bg,
            color: colors.text,
            borderRadius: 9999,
            mb: 1.5,
          }}
        />
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 600,
            fontSize: 15,
            color: '#0c0a09',
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {article.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 13,
            color: '#78716c',
            lineHeight: 1.6,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {firstParagraph}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 12,
            color: '#3ba6f1',
            fontWeight: 500,
            mt: 1.5,
          }}
        >
          Baca selengkapnya →
        </Typography>
      </CardContent>
    </Card>
  )
}

const ArticleListSkeleton = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
    {[1, 2, 3].map((i) => (
      <Card key={i} sx={{ borderRadius: '16px', border: '1px solid #e8e6e5' }}>
        <Skeleton variant="rectangular" height={160} />
        <CardContent>
          <Skeleton variant="rounded" width={80} height={22} sx={{ mb: 1.5, borderRadius: 9999 }} />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width={100} height={20} sx={{ mt: 1.5 }} />
        </CardContent>
      </Card>
    ))}
  </Box>
)

const ArticleList = ({ articles = [], isLoading = false }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  if (isLoading) return <ArticleListSkeleton />

  if (articles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <ArticleOutlinedIcon sx={{ fontSize: 48, color: '#d6d3d1', mb: 2 }} />
        <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', color: '#a8a29e', fontSize: 14 }}>
          Belum ada artikel tersedia
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </Box>

      <ArticleDetailModal
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </>
  )
}

export default ArticleList
