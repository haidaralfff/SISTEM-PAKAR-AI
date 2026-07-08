import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
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
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="rounded" height={220} sx={{ borderRadius: '12px' }} />
        </CardContent>
      </Card>
    )
  }

  if (consultations.length < 2) return null

  const reversed = [...consultations].reverse()
  const labels = reversed.map((_, i) => `#${i + 1}`)
  const values = reversed.map((c) => parseFloat(((c.belief || 0) * 100).toFixed(1)))

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography
            sx={{
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontWeight: 500,
              fontSize: 14,
              color: '#0c0a09',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 18, color: '#3ba6f1' }} /> Tren Konsultasi
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 11,
            color: '#a8a29e',
            mb: 2,
          }}
        >
          Grafik tingkat keyakinan dari 5 konsultasi terakhir
        </Typography>
        <LineChart
          xAxis={[
            {
              scaleType: 'point',
              data: labels,
              sx: {
                '& .MuiChartsAxis-tickLabel': {
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 11,
                  fill: '#a8a29e',
                },
              },
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 100,
              sx: {
                '& .MuiChartsAxis-tickLabel': {
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 11,
                  fill: '#a8a29e',
                },
              },
            },
          ]}
          series={[
            {
              data: values,
              color: '#3ba6f1',
              showMark: true,
              area: true,
              curve: 'natural',
            },
          ]}
          height={200}
          margin={{ left: 40, right: 16, top: 16, bottom: 32 }}
          grid={{ vertical: false, horizontal: true }}
          sx={{
            '& .MuiChartsGrid-line': { stroke: '#f5f5f4' },
            '& .MuiChartsMark-root': { r: 4, fill: '#3ba6f1' },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default TrendChart
