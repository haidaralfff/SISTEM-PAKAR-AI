import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Typography } from '@mui/material'

const severityColors = {
  'Gangguan Mood': '#3ba6f1',
  'Ringan': '#22c55e',
  'Sedang': '#f97316',
  'Berat': '#dc2626',
}

const DiagnosisBarChart = ({ data, height = 280 }) => {
  const labels = data.map((d) => d.label)
  const values = data.map((d) => d.value)
  const total = values.reduce((a, b) => a + b, 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2.5 }}>
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 400,
            fontSize: 16,
            color: '#0c0a09',
            letterSpacing: '-0.017em',
          }}
        >
          Distribusi Diagnosis
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 12,
            color: '#a8a29e',
          }}
        >
          {total} total konsultasi
        </Typography>
      </Box>

      {total === 0 ? (
        <Typography variant="body2" sx={{ color: '#78716c', py: 4, textAlign: 'center' }}>
          Belum ada data diagnosis.
        </Typography>
      ) : (
        <>
          <BarChart
            xAxis={[{
              scaleType: 'band',
              data: labels,
              tickLabelStyle: {
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 12,
                fill: '#78716c',
              },
            }]}
            yAxis={[{
              tickLabelStyle: {
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 11,
                fill: '#a8a29e',
              },
              min: 0,
            }]}
            series={[{
              data: values,
              color: '#3ba6f1',
              borderRadius: 6,
              barThickness: 40,
            }]}
            height={height}
            margin={{ left: 40, right: 16, top: 20, bottom: 32 }}
            slotProps={{
              bar: {
                rx: 6,
                ry: 6,
              },
            }}
          />

          <Box sx={{ display: 'flex', gap: 3, mt: 2, justifyContent: 'center' }}>
            {data.map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: severityColors[item.label] || '#d6d3d1' }} />
                <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 12, color: '#78716c' }}>
                  {item.label}
                </Typography>
                <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 12, color: '#0c0a09', fontWeight: 500 }}>
                  {item.value}
                </Typography>
                {total > 0 && (
                  <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 11, color: '#a8a29e' }}>
                    ({((item.value / total) * 100).toFixed(0)}%)
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

export default DiagnosisBarChart
