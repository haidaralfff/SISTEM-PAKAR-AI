import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Alert,
  Skeleton,
  Tooltip,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSymptoms } from '../../symptoms/api'
import { simulateConsultation } from '../../consultation/api'

const cfLevels = [
  { label: 'Sangat Yakin', value: 1.0 },
  { label: 'Yakin', value: 0.8 },
  { label: 'Cukup Yakin', value: 0.6 },
  { label: 'Sedikit Yakin', value: 0.4 },
  { label: 'Tidak Yakin', value: 0.0 },
]

const severityColorMap = {
  gangguan_mood: 'info',
  ringan: 'success',
  sedang: 'warning',
  berat: 'error',
}

const SimulationPage = () => {
  const [selected, setSelected] = useState({})

  const { data: symptomsRes, isLoading } = useQuery({
    queryKey: ['symptoms'],
    queryFn: () => getSymptoms(),
  })

  const { mutate: simulate, isPending, data: result, error } = useMutation({
    mutationFn: simulateConsultation,
  })

  const symptoms = symptomsRes?.data?.data || []

  const handleSelectSymptom = (symptomId, cf_user) => {
    setSelected((prev) => ({
      ...prev,
      [symptomId]: { symptom_id: symptomId, cf_user },
    }))
  }

  const handleRemoveSymptom = (symptomId) => {
    setSelected((prev) => {
      const next = { ...prev }
      delete next[symptomId]
      return next
    })
  }

  const handleSubmit = () => {
    const payload = { symptoms: Object.values(selected) }
    simulate(payload)
  }

  const handleReset = () => {
    setSelected({})
  }

  const selectedCount = Object.keys(selected).length
  const results = result?.data?.results || []

  if (isLoading) {
    return (
      <Box>{[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={80} sx={{ mb: 1 }} />)}</Box>
    )
  }

  return (
    <Box>
      <Typography variant="body2" mb={2} sx={{ fontFamily: '"Inter Variable", sans-serif', color: '#78716c', fontSize: 13 }}>
        Pilih gejala yang Anda rasakan, atur seberapa yakin Anda, lalu lihat bagaimana sistem menghitung hasilnya langkah demi langkah.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'Terjadi kesalahan'}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Kiri: Pilihan Gejala */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ fontFamily: '"Inter Tight Variable", sans-serif' }}>
            Pilih Gejala ({selectedCount} dipilih)
          </Typography>

          <Box sx={{ maxHeight: 500, overflow: 'auto', pr: 1 }}>
            {symptoms.map((symptom) => {
              const currentCf = selected[symptom.id]?.cf_user ?? null
              return (
                <Box
                  key={symptom.id}
                  sx={{
                    p: 1.5,
                    mb: 1,
                    border: currentCf !== null ? '1.5px solid #3ba6f1' : '1px solid #e8e6e5',
                    borderRadius: '8px',
                    bgcolor: currentCf !== null ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { borderColor: '#3ba6f1' },
                  }}
                  onClick={() => handleSelectSymptom(symptom.id, currentCf === null ? 0.8 : currentCf)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500} sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>
                      {symptom.code} — {symptom.name}
                    </Typography>
                    {currentCf !== null && (
                      <Chip
                        label="Hapus"
                        size="small"
                        onClick={(e) => { e.stopPropagation(); handleRemoveSymptom(symptom.id) }}
                        sx={{ height: 20, fontSize: 10, bgcolor: '#fee2e2', color: '#dc2626' }}
                      />
                    )}
                  </Box>

                  {currentCf !== null && (
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                      {cfLevels.map((level) => (
                        <Box
                          key={level.value}
                          onClick={(e) => { e.stopPropagation(); handleSelectSymptom(symptom.id, level.value) }}
                          sx={{
                            px: 1, py: 0.5, borderRadius: 1, fontSize: 11,
                            fontFamily: '"Inter Variable", sans-serif',
                            bgcolor: currentCf === level.value ? '#3ba6f1' : '#f5f5f4',
                            color: currentCf === level.value ? '#ffffff' : '#78716c',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            '&:hover': { bgcolor: currentCf === level.value ? '#3398e1' : '#e8e6e5' },
                          }}
                        >
                          {level.label}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              )
            })}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleSubmit}
              disabled={selectedCount === 0 || isPending}
              fullWidth
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: '"Inter Variable", sans-serif',
                bgcolor: '#3ba6f1',
                '&:hover': { bgcolor: '#3398e1' },
              }}
            >
              {isPending ? 'Menghitung...' : 'Jalankan Simulasi'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={selectedCount === 0}
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                fontFamily: '"Inter Variable", sans-serif',
                borderColor: '#e8e6e5',
                color: '#0c0a09',
                '&:hover': { borderColor: '#d6d3d1', bgcolor: 'transparent' },
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Kanan: Hasil Simulasi */}
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ fontFamily: '"Inter Tight Variable", sans-serif' }}>
            Hasil Perhitungan
          </Typography>

          {isPending && (
            <Box sx={{ mb: 2 }}><LinearProgress /></Box>
          )}

          {!result && !isPending && (
            <Card sx={{ border: '1px solid #e8e6e5', bgcolor: '#fafaf9' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                  Pilih gejala lalu klik "Jalankan Simulasi" untuk melihat hasilnya.
                </Typography>
              </CardContent>
            </Card>
          )}

          {results.length === 0 && result && !isPending && (
            <Alert severity="info">Tidak ada kandidat diagnosis yang cocok dengan gejala yang dipilih.</Alert>
          )}

          {results.map((r, idx) => (
            <Card key={r.disease_id} sx={{ mb: 2, border: '1px solid', borderColor: idx === 0 ? '#3ba6f1' : '#e8e6e5' }}>
              <CardContent>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: '"Inter Tight Variable", sans-serif' }}>
                    {idx + 1}. {r.disease_code} — {r.disease_name}
                  </Typography>
                  <Chip
                    label={`Keyakinan: ${(r.belief * 100).toFixed(2)}%`}
                    color={idx === 0 ? (severityColorMap[r.disease_code] || 'primary') : 'default'}
                    size="small"
                  />
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: '"Inter Variable", sans-serif' }}>
                  {r.matched_count} gejala ditemukan cocok
                  {r.total_conflict > 0 && ` | Ada pertentangan bukti sebesar ${(r.total_conflict * 100).toFixed(2)}%`}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                {/* Ringkasan Hasil */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, mb: 1.5 }}>
                  <Box sx={{ p: 1, bgcolor: '#eff6ff', borderRadius: '6px', textAlign: 'center' }}>
                    <Tooltip title="Seberapa yakin sistem bahwa diagnosis ini benar berdasarkan bukti yang ada">
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        Tingkat Keyakinan <InfoOutlinedIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#1d4ed8' }}>
                      {(r.belief * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, bgcolor: '#f0fdf4', borderRadius: '6px', textAlign: 'center' }}>
                    <Tooltip title="Kemungkinan terbesar diagnosis ini benar (termasuk bagian yang masih ragu)">
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        Kemungkinan Maksimal <InfoOutlinedIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#15803d' }}>
                      {(r.plausibility * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, bgcolor: '#fefce8', borderRadius: '6px', textAlign: 'center' }}>
                    <Tooltip title="Bagian bukti yang belum cukup untuk memastikan diagnosis ini benar atau salah">
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        Masih Ragu <InfoOutlinedIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#a16207' }}>
                      {(r.uncertainty * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                </Box>

                {/* Penjelasan singkat */}
                <Alert severity="info" sx={{ mb: 1.5, py: 0 }}>
                  <Typography variant="caption" sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 11 }}>
                    {idx === 0
                      ? `Sistem cukup yakin ${(r.belief * 100).toFixed(0)}% bahwa Anda mengalami ${r.disease_name}.`
                      : `Kemungkinan Anda mengalami ${r.disease_name} adalah ${(r.plausibility * 100).toFixed(0)}%.`}
                  </Typography>
                </Alert>

                {/* Detail Langkah Perhitungan */}
                <Typography variant="caption" fontWeight={600} sx={{ fontFamily: '"Inter Variable", sans-serif', color: '#78716c' }}>
                  Langkah Perhitungan:
                </Typography>

                <Box sx={{ mt: 1 }}>
                  {r.steps.map((step, i) => (
                    <Box key={i} sx={{ mb: 1, p: 1, bgcolor: '#f5f5f4', borderRadius: '6px', fontSize: 12 }}>
                      <Typography variant="caption" fontWeight={500} sx={{ fontFamily: '"Inter Variable", sans-serif', display: 'block', mb: 0.5 }}>
                        Gejala {i + 1}: {step.symptom_code} — {step.symptom_name}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', fontFamily: '"Inter Variable", sans-serif', fontSize: 11, color: '#78716c', mb: 0.5 }}>
                        <Tooltip title="Seberapa yakin Anda mengalami gejala ini">
                          <span>Keyakinan Anda: <strong>{step.cf_user}</strong></span>
                        </Tooltip>
                        <Tooltip title="Seberapa kuat gejala ini menunjukkan diagnosis menurut pakar">
                          <span>Bobot Pakar: <strong>{step.cf_expert}</strong></span>
                        </Tooltip>
                      </Box>

                      <Box sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 11, color: '#78716c' }}>
                        <span>Bobot bukti = {step.cf_user} × {step.cf_expert} = <strong>{step.bba_disease.toFixed(4)}</strong></span>
                        <Tooltip title="Bagian yang belum bisa dipastikan benar atau salah">
                          <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 1, color: '#a16207' }}>
                            (ragu: {step.bba_theta.toFixed(4)})
                            <InfoOutlinedIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                          </span>
                        </Tooltip>
                      </Box>

                      {i > 0 && (
                        <Box sx={{ mt: 0.5, fontFamily: '"Inter Variable", sans-serif', fontSize: 11, color: '#57534e', bgcolor: '#ffffff', px: 1, py: 0.5, borderRadius: '4px' }}>
                          <span>Setelah digabungkan dengan bukti sebelumnya → </span>
                          <span>keyakinan: <strong>{step.after_mass.toFixed(4)}</strong></span>
                          <span>, ragu: <strong>{step.after_theta.toFixed(4)}</strong></span>
                          {step.conflict > 0 && <span style={{ color: '#dc2626' }}> (ada bukti bertentangan: {(step.conflict * 100).toFixed(2)}%)</span>}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>

                {idx === 0 && (
                  <Box sx={{ mt: 1, p: 1, bgcolor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                    <Typography variant="caption" fontWeight={600} sx={{ fontFamily: '"Inter Variable", sans-serif' }}>
                      Kesimpulan: Sistem menunjukkan {r.disease_name} dengan tingkat keyakinan {(r.belief * 100).toFixed(2)}% dan kemungkinan maksimal {(r.plausibility * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SimulationPage
