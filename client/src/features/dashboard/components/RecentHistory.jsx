import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getHistory } from '../../consultation/api'

const RecentHistory = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'recent'],
    queryFn: () => getHistory({ page: 1, limit: 3 }),
  })

  const consultations = data?.data?.data || []

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Hari ini'
    if (diff === 1) return 'Kemarin'
    if (diff < 7) return `${diff} hari lalu`
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
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <HistoryOutlinedIcon sx={{ fontSize: 18, color: '#3ba6f1' }} /> Riwayat Terbaru
        </Typography>

        {isLoading ? (
          <Box>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={48} sx={{ mb: 1, borderRadius: '8px' }} />
            ))}
          </Box>
        ) : consultations.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <HistoryOutlinedIcon sx={{ fontSize: 32, color: '#d6d3d1', mb: 1 }} />
            <Typography sx={{ fontSize: 13, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif' }}>
              Belum ada riwayat konsultasi
            </Typography>
          </Box>
        ) : (
          <Box>
            {consultations.map((item) => (
              <Box
                key={item.id}
                onClick={() => navigate(`/history/${item.id}`)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  px: 1.5,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  '&:hover': { bgcolor: '#f5f5f4' },
                }}
              >
                <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#3ba6f1', flexShrink: 0 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#0c0a09',
                      fontFamily: '"Inter Variable", sans-serif',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.result || item.disease_name || 'Konsultasi'}
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
                    flexShrink: 0,
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

export default RecentHistory
