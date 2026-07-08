import { Typography, Box } from '@mui/material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'

const confidenceLevels = [
  { label: 'Sangat Yakin', value: 1.0, size: 48, color: '#16a34a' },
  { label: 'Yakin', value: 0.8, size: 40, color: '#22c55e' },
  { label: 'Cukup Yakin', value: 0.6, size: 32, color: '#78716c' },
  { label: 'Sedikit Yakin', value: 0.4, size: 40, color: '#9333ea' },
  { label: 'Tidak Yakin', value: 0.0, size: 48, color: '#7e22ce' },
]

const categoryIcons = {
  Kognitif: <PsychologyOutlinedIcon sx={{ fontSize: 18 }} />,
  Emosional: <MoodOutlinedIcon sx={{ fontSize: 18 }} />,
  Fisik: <SpaOutlinedIcon sx={{ fontSize: 18 }} />,
  Sosial: <GroupsOutlinedIcon sx={{ fontSize: 18 }} />,
}

const SymptomSelector = ({ symptoms, selected, onSelectSymptom }) => {
  const grouped = symptoms.reduce((acc, s) => {
    const cat = s.category || 'Lainnya'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <Box>
      {Object.entries(grouped).map(([category, items]) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: '"Inter Tight Variable", sans-serif',
              color: '#0c0a09',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: 14,
              letterSpacing: '-0.017em',
            }}
          >
            <Box sx={{ color: '#3ba6f1', display: 'flex' }}>{categoryIcons[category] || null}</Box>
            {category}
          </Typography>

          {items.map((symptom) => {
            const currentCf = selected[symptom.id]?.cf_user ?? null

            return (
              <Box
                key={symptom.id}
                sx={{
                  bgcolor: '#ffffff',
                  border: currentCf !== null ? '1.5px solid #3ba6f1' : '1px solid #e8e6e5',
                  borderRadius: '14px',
                  p: 2.5,
                  mb: 2,
                  transition: 'border-color 0.2s ease',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Inter Tight Variable", sans-serif',
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#0c0a09',
                    lineHeight: 1.5,
                    mb: 0.5,
                  }}
                >
                  {symptom.name}
                </Typography>

                {symptom.is_high_risk && (
                  <Typography variant="caption" sx={{ color: '#ef4444', fontFamily: '"Inter Variable", sans-serif', mb: 1, display: 'block' }}>
                    gejala sensitif
                  </Typography>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 1.5, sm: 2.5 },
                    mt: 2.5,
                    px: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Inter Variable", sans-serif',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#16a34a',
                      minWidth: 60,
                      textAlign: 'right',
                    }}
                  >
                    Setuju
                  </Typography>

                  {confidenceLevels.map((level) => {
                    const isSelected = currentCf === level.value
                    return (
                      <Box
                        key={level.value}
                        onClick={() => onSelectSymptom(symptom.id, level.value)}
                        sx={{
                          width: level.size,
                          height: level.size,
                          borderRadius: '50%',
                          border: `2.5px solid ${isSelected ? level.color : '#d6d3d1'}`,
                          bgcolor: isSelected ? `${level.color}18` : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            borderColor: level.color,
                            transform: 'scale(1.1)',
                          },
                          ...(isSelected && {
                            boxShadow: `0 0 0 3px ${level.color}20`,
                            borderColor: level.color,
                          }),
                        }}
                      >
                        {isSelected && (
                          <Box
                            sx={{
                              width: level.size * 0.35,
                              height: level.size * 0.35,
                              borderRadius: '50%',
                              bgcolor: level.color,
                            }}
                          />
                        )}
                      </Box>
                    )
                  })}

                  <Typography
                    sx={{
                      fontFamily: '"Inter Variable", sans-serif',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#7e22ce',
                      minWidth: 60,
                    }}
                  >
                    Tidak Yakin
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Inter Variable", sans-serif',
                      fontSize: 11,
                      color: '#a8a29e',
                    }}
                  >
                    {currentCf !== null
                      ? confidenceLevels.find((l) => l.value === currentCf)?.label
                      : 'Pilih tingkat keyakinan'}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      ))}
    </Box>
  )
}

export default SymptomSelector
