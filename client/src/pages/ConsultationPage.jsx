import { useState, useMemo } from 'react'
import {
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
  LinearProgress,
} from '@mui/material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useQuery } from '@tanstack/react-query'
import { getSymptoms } from '../features/symptoms/api'
import { useSubmitConsultation } from '../features/consultation/hooks/useConsultation'
import SymptomSelector from '../features/consultation/components/SymptomSelector'
import DiagnosisResult from '../features/consultation/components/DiagnosisResult'
import ConsentDialog from '../features/consultation/components/ConsentDialog'

const ITEMS_PER_SESSION = 4

const ConsultationPage = () => {
  const { data: symptomsRes, isLoading } = useQuery({
    queryKey: ['symptoms'],
    queryFn: () => getSymptoms(),
  })

  const { mutate: submit, isPending, data: result, error, reset } = useSubmitConsultation()

  const [selected, setSelected] = useState({})
  const [consentOpen, setConsentOpen] = useState(!localStorage.getItem('consultation_consent'))
  const [currentStep, setCurrentStep] = useState(0)

  const symptoms = symptomsRes?.data?.data || []

  const sessions = useMemo(() => {
    const result = []
    for (let i = 0; i < symptoms.length; i += ITEMS_PER_SESSION) {
      result.push(symptoms.slice(i, i + ITEMS_PER_SESSION))
    }
    return result
  }, [symptoms])

  const totalSessions = sessions.length
  const currentSession = sessions[currentStep] || []
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSessions - 1

  const handleSelectSymptom = (symptomId, cf_user) => {
    setSelected((prev) => ({
      ...prev,
      [symptomId]: { symptom_id: symptomId, cf_user },
    }))
  }

  const handleSubmit = () => {
    const payload = { symptoms: Object.values(selected) }
    submit(payload)
  }

  const handleReset = () => {
    setSelected({})
    setCurrentStep(0)
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
        <Typography
          sx={{
            fontWeight: 400,
            fontFamily: '"Inter Tight Variable", sans-serif',
            color: '#0c0a09',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: 20,
            letterSpacing: '-0.017em',
          }}
        >
          <PsychologyOutlinedIcon sx={{ color: '#3ba6f1', fontSize: 22 }} /> Hasil Konsultasi
        </Typography>
        <DiagnosisResult result={responseData} alternativeCandidates={alternativeCandidates} />
        <Button
          variant="outlined"
          startIcon={<PsychologyOutlinedIcon />}
          onClick={handleReset}
          sx={{ mt: 2, borderColor: '#e8e6e5', color: '#0c0a09', '&:hover': { borderColor: '#d6d3d1', bgcolor: 'transparent' } }}
        >
          Konsultasi Ulang
        </Button>
      </Box>
    )
  }

  const selectedCount = Object.keys(selected).length

  return (
    <Box>
      <ConsentDialog open={consentOpen} onConsent={() => setConsentOpen(false)} />

      <Typography
        sx={{
          fontWeight: 400,
          fontFamily: '"Inter Tight Variable", sans-serif',
          color: '#0c0a09',
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: 20,
          letterSpacing: '-0.017em',
        }}
      >
        <PsychologyOutlinedIcon sx={{ color: '#3ba6f1', fontSize: 22 }} /> Konsultasi
      </Typography>
      <Typography variant="body2" mb={2} sx={{ fontFamily: '"Inter Variable", sans-serif', color: '#78716c', fontSize: 13 }}>
        Pilih gejala yang Anda rasakan beserta tingkat keyakinan Anda.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 13, color: '#78716c' }}>
          Sesi {currentStep + 1} dari {totalSessions}
        </Typography>
        <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 13, color: '#78716c' }}>
          {selectedCount} gejala dipilih
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={((currentStep + 1) / totalSessions) * 100}
        sx={{
          mb: 3,
          height: 4,
          borderRadius: 2,
          bgcolor: '#e8e6e5',
          '& .MuiLinearProgress-bar': { bgcolor: '#3ba6f1', borderRadius: 2 },
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi'}
        </Alert>
      )}

      <SymptomSelector
        symptoms={currentSession}
        selected={selected}
        onSelectSymptom={handleSelectSymptom}
      />

      <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
        {!isFirstStep && (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentStep((s) => s - 1)}
            sx={{
              flex: 1,
              borderColor: '#e8e6e5',
              color: '#0c0a09',
              fontFamily: '"Inter Variable", sans-serif',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { borderColor: '#d6d3d1', bgcolor: 'transparent' },
            }}
          >
            Sebelumnya
          </Button>
        )}
        {isLastStep ? (
          <Button
            variant="contained"
            fullWidth={isFirstStep}
            size="large"
            disabled={selectedCount === 0 || isPending}
            startIcon={!isPending ? <PsychologyOutlinedIcon /> : undefined}
            onClick={handleSubmit}
            sx={{
              flex: isFirstStep ? undefined : 1,
              border: '1px solid #3398e1',
              fontFamily: '"Inter Variable", sans-serif',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            {isPending ? 'Memproses...' : 'Proses Diagnosa'}
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => setCurrentStep((s) => s + 1)}
            sx={{
              flex: 1,
              border: '1px solid #3398e1',
              fontFamily: '"Inter Variable", sans-serif',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Selanjutnya
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default ConsultationPage
