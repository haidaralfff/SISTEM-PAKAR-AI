import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from '@mui/material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'

const confidenceOptions = [
  { label: 'Tidak Yakin', value: 0.0 },
  { label: 'Sedikit Yakin', value: 0.4 },
  { label: 'Cukup Yakin', value: 0.6 },
  { label: 'Yakin', value: 0.8 },
  { label: 'Sangat Yakin', value: 1.0 },
]

const categoryIcons = {
  Kognitif: <PsychologyOutlinedIcon fontSize="small" />,
  Emosional: <MoodOutlinedIcon fontSize="small" />,
  Fisik: <SpaOutlinedIcon fontSize="small" />,
  Sosial: <GroupsOutlinedIcon fontSize="small" />,
}

const SymptomSelector = ({ symptoms, selected, onToggle, onConfidenceChange }) => {
  const grouped = symptoms.reduce((acc, s) => {
    const cat = s.category || 'Lainnya'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 24 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: 'primary.main', display: 'flex' }}>{categoryIcons[category] || null}</Box>
            {category}
          </Typography>
          {items.map((symptom) => {
            const isChecked = !!selected[symptom.id]
            return (
              <div
                key={symptom.id}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(symptom)}
                  />
                  <Typography variant="body2">{symptom.name}</Typography>
                  {symptom.is_high_risk && (
                    <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                      (sensitif)
                    </Typography>
                  )}
                </label>

                {isChecked && (
                  <FormControl component="fieldset" sx={{ ml: 4, mt: 1 }}>
                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                      Tingkat Keyakinan
                    </FormLabel>
                    <RadioGroup
                      row
                      value={selected[symptom.id]?.cf_user ?? ''}
                      onChange={(e) => onConfidenceChange(symptom.id, parseFloat(e.target.value))}
                    >
                      {confidenceOptions.map((opt) => (
                        <FormControlLabel
                          key={opt.value}
                          value={opt.value}
                          control={<Radio size="small" />}
                          label={opt.label}
                          slotProps={{ typography: { variant: 'caption' } }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default SymptomSelector
