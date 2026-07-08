import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getHistory } from '../../consultation/api'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

const ProgressSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'progress'],
    queryFn: () => getHistory({ page: 1, limit: 100 }),
  })

  const consultations = data?.data?.data || []
  const total = data?.data?.meta?.total ?? consultations.length

  const progress = Math.min(total * 10, 100)

  const streak = (() => {
    if (consultations.length === 0) return 0
    const dates = consultations
      .map((c) => new Date(c.created_at).toDateString())
      .filter((d, i, arr) => arr.indexOf(d) === i)
    let count = 1
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      if (dates.includes(d.toDateString())) {
        count++
      } else {
        break
      }
    }
    return count
  })()

  return (
    <Card sx={{ borderRadius: '16px' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontWeight: 500,
              fontSize: 14,
              color: '#0c0a09',
            }}
          >
            Recovery Progress
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocalFireDepartmentIcon sx={{ fontSize: 16, color: '#f97316' }} />
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#f97316',
                fontFamily: '"Inter Variable", sans-serif',
              }}
            >
              {streak} hari berturut-turut
            </Typography>
          </Box>
        </Box>

        {isLoading ? (
          <LinearProgress variant="determinate" value={0} sx={{ borderRadius: 9999, height: 8, bgcolor: '#f5f5f4' }} />
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    borderRadius: 9999,
                    height: 8,
                    bgcolor: '#f5f5f4',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 9999,
                      background: 'linear-gradient(90deg, #3ba6f1, #2196f3)',
                    },
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0c0a09',
                  fontFamily: '"Inter Variable", sans-serif',
                  minWidth: 36,
                  textAlign: 'right',
                }}
              >
                {progress}%
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                color: '#a8a29e',
                fontFamily: '"Inter Variable", sans-serif',
              }}
            >
              {total} konsultasi telah dilakukan
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ProgressSection
