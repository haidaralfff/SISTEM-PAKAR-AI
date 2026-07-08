import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PsychologyIcon from '@mui/icons-material/Psychology'
import { getHistory } from '../../consultation/api'

const SummaryCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'history'],
    queryFn: () => getHistory({ page: 1, limit: 1 }),
  })

  const total = data?.data?.meta?.total ?? data?.data?.data?.length ?? 0

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            bgcolor: '#3ba6f114',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PsychologyIcon sx={{ fontSize: 24, color: '#3ba6f1' }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontWeight: 600,
              fontSize: 28,
              color: '#0c0a09',
              lineHeight: 1.2,
            }}
          >
            {isLoading ? <Skeleton width={48} /> : total}
          </Typography>
          <Typography sx={{ color: '#78716c', fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>
            Total Konsultasi
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
