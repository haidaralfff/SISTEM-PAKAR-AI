import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const StatCard = ({ icon, value, label, trend, isLoading }) => {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
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
            {icon}
          </Box>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#4caf50' }}>
              <TrendingUpIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 500, fontFamily: '"Inter Variable", sans-serif' }}>
                {trend}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 600,
            fontSize: 28,
            color: '#0c0a09',
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {isLoading ? <Skeleton width={48} /> : value}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 13,
            color: '#78716c',
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatCard
