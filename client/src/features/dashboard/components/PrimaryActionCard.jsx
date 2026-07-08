import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const PrimaryActionCard = () => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #3ba6f1 0%, #2196f3 100%)',
        border: 'none',
        boxShadow: '0 4px 20px rgba(59, 166, 241, 0.3)',
      }}
    >
      <CardContent
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PsychologyOutlinedIcon sx={{ fontSize: 26, color: '#ffffff' }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Inter Tight Variable", sans-serif',
                fontWeight: 600,
                fontSize: 18,
                color: '#ffffff',
                mb: 0.25,
              }}
            >
              Mulai Konsultasi
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 13,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              AI siap mendengarkan dan membantu memahami kondisi emosimu.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/consultation')}
          disableElevation
          sx={{
            borderRadius: 9999,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 14,
            fontFamily: '"Inter Variable", sans-serif',
            bgcolor: '#ffffff',
            color: '#3ba6f1',
            px: 3,
            py: 1.2,
            flexShrink: 0,
            '&:hover': {
              bgcolor: '#f5f5f4',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Mulai
        </Button>
      </CardContent>
    </Card>
  )
}

export default PrimaryActionCard
