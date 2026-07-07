import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

const options = [
  { label: 'Tidak Yakin', value: 0.0 },
  { label: 'Sedikit Yakin', value: 0.4 },
  { label: 'Cukup Yakin', value: 0.6 },
  { label: 'Yakin', value: 0.8 },
  { label: 'Sangat Yakin', value: 1.0 },
]

const ConfidenceSlider = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" sx={{ fontSize: 13 }}>
        Tingkat Keyakinan
      </FormLabel>
      <RadioGroup row value={value ?? ''} onChange={(e) => onChange(parseFloat(e.target.value))}>
        {options.map((opt) => (
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
  )
}

export default ConfidenceSlider
