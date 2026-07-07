import {
  Card,
  CardContent,
  Typography,
  Alert,
  Chip,
  Box,
  Button,
  Divider,
} from '@mui/material'

const DiagnosisResult = ({ result, alternativeCandidates = [] }) => {
  if (!result) return null

  const cfPercent = (result.cf_result * 100).toFixed(2)

  return (
    <Box>
      {result.high_risk && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight={700}>Perhatian!</Typography>
          <Typography variant="body2">
            Sistem mendeteksi indikasi yang memerlukan perhatian segera. Hubungi layanan darurat atau hotline kesehatan mental terdekat.
          </Typography>
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Hasil Diagnosa
          </Typography>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {result.disease_name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip
              label={`Keyakinan: ${cfPercent}%`}
              color={result.cf_result >= 0.8 ? 'success' : result.cf_result >= 0.5 ? 'warning' : 'default'}
            />
            {result.severity_level && (
              <Chip label={result.severity_level} variant="outlined" />
            )}
          </Box>

          <Typography variant="body2" paragraph>
            {result.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Rekomendasi:
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {result.solution}
          </Typography>
        </CardContent>
      </Card>

      {alternativeCandidates.length > 0 && (
        <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
          <CardContent>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Kemungkinan Lain
            </Typography>
            {alternativeCandidates.map((alt, idx) => {
              const altCf = (alt.cf_result * 100).toFixed(2)
              return (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                  <Typography variant="body2">{alt.disease_name}</Typography>
                  <Chip label={`${altCf}%`} size="small" variant="outlined" color="default" />
                </Box>
              )
            })}
          </CardContent>
        </Card>
      )}

      <Alert severity="info" sx={{ mb: 2 }}>
        Hasil ini adalah deteksi dini, bukan diagnosis medis resmi. Silakan konsultasikan dengan psikolog atau tenaga profesional untuk evaluasi lebih lanjut.
      </Alert>

      <Button
        variant="outlined"
        color="primary"
        href="https://www.into-the-light.org/hotline-kesehatan-mental/"
        target="_blank"
        rel="noopener noreferrer"
        fullWidth
      >
        Hotline Kesehatan Mental
      </Button>
    </Box>
  )
}

export default DiagnosisResult
