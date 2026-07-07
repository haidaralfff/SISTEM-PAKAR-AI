import { useState } from 'react'
import {
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import { useQuery } from '@tanstack/react-query'
import { getSymptoms } from '../features/symptoms/api'
import { useSubmitConsultation } from '../features/consultation/hooks/useConsultation'
import SymptomSelector from '../features/consultation/components/SymptomSelector'
import DiagnosisResult from '../features/consultation/components/DiagnosisResult'
import ConsentDialog from '../features/consultation/components/ConsentDialog'

const ConsultationPage = () => {
  const { data: symptomsRes, isLoading } = useQuery({
    queryKey: ['symptoms'],
    queryFn: () => getSymptoms(),
  })

  const { mutate: submit, isPending, data: result, error, reset } = useSubmitConsultation()

  const [selected, setSelected] = useState({})
  const [consentOpen, setConsentOpen] = useState(!localStorage.getItem('consultation_consent'))

  const symptoms = symptomsRes?.data?.data || symptomsRes?.data || []

  const handleToggle = (symptom) => {
    setSelected((prev) => {
      const next = { ...prev }
      if (next[symptom.id]) {
        delete next[symptom.id]
      } else {
        next[symptom.id] = { symptom_id: symptom.id, cf_user: 0.6 }
      }
      return next
    })
  }

  const handleConfidenceChange = (symptomId, cf_user) => {
    setSelected((prev) => ({
      ...prev,
      [symptomId]: { ...prev[symptomId], cf_user },
    }))
  }

  const handleSubmit = () => {
    const payload = { symptoms: Object.values(selected) }
    submit(payload)
  }

  const handleReset = () => {
    setSelected({})
    reset()
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (result) {
    const responseData = result.data?.result || result.data
    const alternativeCandidates = result.data?.alternative_candidates || []
    return (
      <Box>
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PsychologyOutlinedIcon /> Hasil Konsultasi
        </Typography>
        <DiagnosisResult result={responseData} alternativeCandidates={alternativeCandidates} />
        <Button variant="text" startIcon={<PsychologyOutlinedIcon />} onClick={handleReset} sx={{ mt: 2 }}>
          Konsultasi Ulang
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <ConsentDialog open={consentOpen} onConsent={() => setConsentOpen(false)} />

      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PsychologyOutlinedIcon /> Konsultasi
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Pilih gejala yang Anda rasakan beserta tingkat keyakinan Anda terhadap setiap gejala.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi'}
        </Alert>
      )}

      <SymptomSelector
        symptoms={symptoms}
        selected={selected}
        onToggle={handleToggle}
        onConfidenceChange={handleConfidenceChange}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={Object.keys(selected).length === 0 || isPending}
        startIcon={!isPending ? <PsychologyOutlinedIcon /> : undefined}
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {isPending ? 'Memproses...' : 'Proses Diagnosa'}
      </Button>
    </Box>
  )
}

export default ConsultationPage
