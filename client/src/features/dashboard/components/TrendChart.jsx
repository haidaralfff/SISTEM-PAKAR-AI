import { Card, CardContent, Typography, Skeleton } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import { useQuery } from '@tanstack/react-query'
import { getHistory } from '../../consultation/api'

const TrendChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'trend'],
    queryFn: () => getHistory({ page: 1, limit: 5 }),
  })

  const consultations = data?.data?.data || []

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="rounded" height={250} />
        </CardContent>
      </Card>
    )
  }

  if (consultations.length < 2) return null

  const reversed = [...consultations].reverse()
  const labels = reversed.map((_, i) => `#${i + 1}`)
  const values = reversed.map((c) => parseFloat(((c.cf_result || 0) * 100).toFixed(1)))

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimelineOutlinedIcon fontSize="small" /> Tren Konsultasi Terakhir
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Grafik ini menunjukkan tren tingkat keyakinan, bukan diagnosis klinis.
        </Typography>
        <LineChart
          xAxis={[{ scaleType: 'point', data: labels, label: 'Konsultasi ke-' }]}
          yAxis={[{ label: 'CF (%)', min: 0, max: 100 }]}
          series={[{ data: values, label: 'Tingkat Keyakinan', color: '#1976d2' }]}
          height={250}
        />
      </CardContent>
    </Card>
  )
}

export default TrendChart
