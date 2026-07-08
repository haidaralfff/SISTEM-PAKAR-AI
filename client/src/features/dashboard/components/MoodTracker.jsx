import { Card, CardContent, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'

const moods = [
  { emoji: '😊', label: 'Senang' },
  { emoji: '😄', label: 'Sangat Senang' },
  { emoji: '🙂', label: 'Lumayan' },
  { emoji: '😐', label: 'Biasa Saja' },
  { emoji: '😔', label: 'Sedih' },
  { emoji: '😢', label: 'Sangat Sedih' },
]

const MoodTracker = () => {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('rp-mood')
    const savedDate = localStorage.getItem('rp-mood-date')
    const today = new Date().toDateString()
    if (saved && savedDate === today) {
      setSelected(Number(saved))
    }
  }, [])

  const handleSelect = (index) => {
    setSelected(index)
    localStorage.setItem('rp-mood', index)
    localStorage.setItem('rp-mood-date', new Date().toDateString())
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
          }}
        >
          Bagaimana perasaanmu hari ini?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'space-between' }}>
          {moods.map((mood, i) => (
            <Box
              key={i}
              onClick={() => handleSelect(i)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                transition: 'all 0.2s',
                p: 1,
                borderRadius: '12px',
                bgcolor: selected === i ? '#3ba6f114' : 'transparent',
                border: selected === i ? '2px solid #3ba6f1' : '2px solid transparent',
                '&:hover': { bgcolor: '#f5f5f4', transform: 'scale(1.1)' },
              }}
            >
              <Typography sx={{ fontSize: 24 }}>{mood.emoji}</Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: selected === i ? '#3ba6f1' : '#a8a29e',
                  fontFamily: '"Inter Variable", sans-serif',
                  fontWeight: selected === i ? 600 : 400,
                }}
              >
                {mood.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default MoodTracker
