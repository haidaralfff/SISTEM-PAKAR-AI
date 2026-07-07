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
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PsychologyIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {isLoading ? <Skeleton width={40} /> : total}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Konsultasi yang telah dilakukan
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
