import {
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  Button,
  LinearProgress,
} from '@mui/material'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'

const severityConfig = {
  gangguan_mood: { color: '#3b82f6', bg: '#eff6ff', label: 'Gangguan Mood' },
  ringan: { color: '#22c55e', bg: '#f0fdf4', label: 'Depresi Ringan' },
  sedang: { color: '#f59e0b', bg: '#fefce8', label: 'Depresi Sedang' },
  berat: { color: '#ef4444', bg: '#fef2f2', label: 'Depresi Berat' },
}

const TraitBar = ({ label, value, color, leftLabel, rightLabel }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
      <Typography variant="caption" sx={{ color: '#78716c', fontSize: 12, fontFamily: '"Inter Variable", sans-serif' }}>
        {leftLabel}
      </Typography>
      <Typography variant="body2" fontWeight={600} sx={{ color, fontFamily: '"Inter Tight Variable", sans-serif' }}>
        {value}%
      </Typography>
      <Typography variant="caption" sx={{ color: '#78716c', fontSize: 12, fontFamily: '"Inter Variable", sans-serif' }}>
        {rightLabel}
      </Typography>
    </Box>
    <Box sx={{ position: 'relative', height: 8, bgcolor: '#f5f5f4', borderRadius: 4 }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${value}%`,
          bgcolor: color,
          borderRadius: 4,
          transition: 'width 0.6s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: `${value}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          bgcolor: '#ffffff',
          border: `2px solid ${color}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      />
    </Box>
  </Box>
)

const DiagnosisResult = ({ result, alternativeCandidates = [] }) => {
  if (!result) return null

  const beliefPercent = parseFloat((result.belief * 100).toFixed(1))
  const plausibilityPercent = result.plausibility ? parseFloat((result.plausibility * 100).toFixed(1)) : null
  const uncertaintyPercent = result.uncertainty ? parseFloat((result.uncertainty * 100).toFixed(1)) : null
  const sev = severityConfig[result.severity_level] || severityConfig.ringan

  return (
    <Box>
      {result.high_risk && (
        <Alert
          severity="error"
          icon={<WarningAmberOutlinedIcon />}
          sx={{ mb: 3, borderRadius: '12px' }}
        >
          <Typography fontWeight={700}>Perhatian!</Typography>
          <Typography variant="body2">
            Sistem mendeteksi indikasi yang memerlukan perhatian segera. Hubungi layanan darurat atau hotline kesehatan mental terdekat.
          </Typography>
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Kiri: Hasil Diagnosis */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #e8e6e5', overflow: 'hidden' }}>
          <Box sx={{ bgcolor: sev.bg, px: 3, pt: 3, pb: 5 }}>
            <Typography variant="overline" sx={{ color: '#78716c', fontFamily: '"Inter Variable", sans-serif', fontSize: 11 }}>
              Hasil Diagnosis Anda
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 1, fontFamily: '"Inter Tight Variable", sans-serif', color: '#1c1917' }}>
              {result.disease_name}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PsychologyOutlinedIcon sx={{ color: sev.color, fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: sev.color, fontWeight: 600, fontFamily: '"Inter Variable", sans-serif' }}>
                {sev.label}
              </Typography>
            </Box>
          </Box>
          <CardContent sx={{ px: 3, py: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#57534e', lineHeight: 1.7, fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>
              {result.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Kanan: Analisis Bukti */}
        <Card sx={{ borderRadius: '16px', border: '1px solid #e8e6e5' }}>
          <CardContent sx={{ px: 3, py: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: '"Inter Tight Variable", sans-serif', mb: 3 }}>
              Analisis Bukti
            </Typography>

            <TraitBar
              label="Keyakinan"
              value={beliefPercent}
              color="#3b82f6"
              leftLabel="Tidak Yakin"
              rightLabel="Sangat Yakin"
            />

            {plausibilityPercent !== null && (
              <TraitBar
                label="Kemungkinan Maks"
                value={plausibilityPercent}
                color="#22c55e"
                leftLabel="Kecil"
                rightLabel="Besar"
              />
            )}

            {uncertaintyPercent !== null && (
              <TraitBar
                label="Masih Ragu"
                value={uncertaintyPercent}
                color="#f59e0b"
                leftLabel="Pasti"
                rightLabel="Ragu"
              />
            )}

            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f4', borderRadius: '10px' }}>
              <Typography variant="caption" sx={{ color: '#78716c', fontFamily: '"Inter Variable", sans-serif', fontSize: 11, lineHeight: 1.6 }}>
                {beliefPercent >= 70
                  ? `Sistem cukup yakin bahwa Anda mengalami ${result.disease_name}. Disarankan untuk segera mengambil langkah yang direkomendasikan.`
                  : beliefPercent >= 40
                    ? `Terdapat indikasi ${result.disease_name}, namun masih perlu pemeriksaan lebih lanjut.`
                    : `Indikasi ${result.disease_name} masih lemah. Pertimbangkan untuk berkonsultasi untuk kepastian.`}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Rekomendasi */}
      <Card sx={{ mb: 3, borderRadius: '16px', border: '1px solid #e8e6e5' }}>
        <CardContent sx={{ px: 3, py: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ fontFamily: '"Inter Tight Variable", sans-serif' }}>
            Rekomendasi
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#57534e', lineHeight: 1.8, fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>
            {result.solution}
          </Typography>
        </CardContent>
      </Card>

      {/* Kemungkinan Lain */}
      {alternativeCandidates.length > 0 && (
        <Card sx={{ mb: 3, borderRadius: '16px', border: '1px solid #e8e6e5' }}>
          <CardContent sx={{ px: 3, py: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ fontFamily: '"Inter Tight Variable", sans-serif' }}>
              Kemungkinan Lain
            </Typography>
            {alternativeCandidates.map((alt, idx) => {
              const altBelief = (alt.belief * 100).toFixed(1)
              const altPl = alt.plausibility ? (alt.plausibility * 100).toFixed(1) : null
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    borderBottom: idx < alternativeCandidates.length - 1 ? '1px solid #f5f5f4' : 'none',
                  }}
                >
                  <Typography variant="body2" sx={{ fontFamily: '"Inter Variable", sans-serif', fontWeight: 500 }}>
                    {alt.disease_name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#78716c', fontFamily: '"Inter Variable", sans-serif' }}>
                      Keyakinan: {altBelief}%
                    </Typography>
                    {altPl && (
                      <Typography variant="caption" sx={{ color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif' }}>
                        | Kemungkinan: {altPl}%
                      </Typography>
                    )}
                  </Box>
                </Box>
              )
            })}
          </CardContent>
        </Card>
      )}

      <Alert severity="info" sx={{ mb: 2, borderRadius: '12px' }}>
        Hasil ini adalah deteksi dini, bukan diagnosis medis resmi. Silakan konsultasikan dengan psikolog atau tenaga profesional untuk evaluasi lebih lanjut.
      </Alert>

      <Button
        variant="outlined"
        color="primary"
        href="https://www.into-the-light.org/hotline-kesehatan-mental/"
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
        sx={{ borderRadius: '12px', textTransform: 'none', fontFamily: '"Inter Variable", sans-serif' }}
      >
        Hotline Kesehatan Mental
      </Button>
    </Box>
  )
}

export default DiagnosisResult
