import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Skeleton,
  Box,
  Alert,
  Divider,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import { useQuery } from '@tanstack/react-query'
import { getConsultationDetail } from '../features/consultation/api'

const HistoryDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const printRef = useRef(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['consultation', id],
    queryFn: () => getConsultationDetail(id),
  })

  const handleExportPdf = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rounded" height={200} />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">Gagal memuat detail konsultasi</Alert>
  }

  const detail = data?.data || {}
  const cfPercent = ((detail.cf_result || 0) * 100).toFixed(2)

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/history')}>
          Kembali
        </Button>
        <Button startIcon={<PictureAsPdfOutlinedIcon />} onClick={handleExportPdf} variant="outlined" sx={{ ml: 'auto' }}>
          Export PDF
        </Button>
      </Box>

      <div ref={printRef}>
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentOutlinedIcon /> Detail Konsultasi
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(detail.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>

        <Card sx={{ mb: 3 }} className="print-card">
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Hasil Diagnosis
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {detail.result || detail.disease_name}
            </Typography>
            <Chip
              label={`Keyakinan: ${cfPercent}%`}
              color={detail.cf_result >= 0.8 ? 'success' : detail.cf_result >= 0.5 ? 'warning' : 'default'}
              sx={{ mt: 1 }}
            />
            {detail.severity_level && (
              <Chip label={detail.severity_level} variant="outlined" sx={{ mt: 1, ml: 1 }} />
            )}
            {detail.has_high_risk_flag && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Konsultasi ini mengandung indikasi risiko tinggi
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SpaOutlinedIcon fontSize="small" color="primary" /> Gejala yang Dipilih
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Gejala</TableCell>
                  <TableCell>Tingkat Keyakinan</TableCell>
                  <TableCell>Nilai CF</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(detail.details || detail.consultation_details || []).map((item) => (
                  <TableRow key={item.id || item.symptom_id}>
                    <TableCell>{item.symptom_name || item.symptom?.name}</TableCell>
                    <TableCell>
                      {item.cf_user >= 0.8
                        ? 'Sangat Yakin'
                        : item.cf_user >= 0.6
                          ? 'Yakin'
                          : item.cf_user >= 0.4
                            ? 'Cukup Yakin'
                            : item.cf_user > 0
                              ? 'Sedikit Yakin'
                              : 'Tidak Yakin'}
                    </TableCell>
                    <TableCell>{item.cf_user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        <Alert severity="info">
          Hasil ini adalah deteksi dini, bukan diagnosis medis resmi.
          Silakan konsultasikan dengan psikolog atau tenaga profesional untuk evaluasi lebih lanjut.
        </Alert>
      </div>
    </Box>
  )
}

export default HistoryDetailPage
