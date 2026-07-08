import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getHistory } from '../../consultation/api'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'

const ActivityTimeline = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'timeline'],
    queryFn: () => getHistory({ page: 1, limit: 5 }),
  })

  const consultations = data?.data?.data || []

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Hari ini'
    if (diff === 1) return 'Kemarin'
    if (diff < 7) return `${diff} Hari Lalu`
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 500,
            fontSize: 14,
            color: '#0c0a09',
            mb: 2.5,
          }}
        >
          Aktivitas Terbaru
        </Typography>

        {isLoading ? (
          <Box>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={48} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : consultations.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <HistoryOutlinedIcon sx={{ fontSize: 32, color: '#d6d3d1', mb: 1 }} />
            <Typography sx={{ fontSize: 13, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif' }}>
              Belum ada aktivitas
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: 9,
                top: 4,
                bottom: 4,
                width: 2,
                bgcolor: '#e8e6e5',
                borderRadius: 1,
              }}
            />
            {consultations.map((item, i) => (
              <Box
                key={item.id}
                onClick={() => navigate(`/history/${item.id}`)}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: i < consultations.length - 1 ? 2 : 0,
                  cursor: 'pointer',
                  '&:hover .activity-title': { color: '#3ba6f1' },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: '#3ba6f114',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: '#3ba6f1' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    className="activity-title"
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#0c0a09',
                      fontFamily: '"Inter Variable", sans-serif',
                      transition: 'color 0.15s',
                    }}
                  >
                    Konsultasi AI — {item.result || 'Selesai'}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#a8a29e',
                      fontFamily: '"Inter Variable", sans-serif',
                    }}
                  >
                    {formatDate(item.created_at)}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#3ba6f1',
                    fontFamily: '"Inter Variable", sans-serif',
                  }}
                >
                  Keyakinan: {((item.belief || 0) * 100).toFixed(0)}%
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
