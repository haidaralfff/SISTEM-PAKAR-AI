import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton,
  Box,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import { useQuery } from '@tanstack/react-query'
import { getAdminStats } from '../api'

const AdminConsultations = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [params, setParams] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'consultations', params],
    queryFn: () => getAdminStats(),
  })

  const stats = data?.data || {}

  const diagnosisData = [
    { label: 'Ringan', value: stats.ringan ?? 0 },
    { label: 'Sedang', value: stats.sedang ?? 0 },
    { label: 'Berat', value: stats.berat ?? 0 },
  ]

  const severityCounts = [stats.ringan ?? 0, stats.sedang ?? 0, stats.berat ?? 0]
  const hasData = severityCounts.some((v) => v > 0)

  const applyFilter = () => {
    const p = {}
    if (from) p.from = from
    if (to) p.to = to
    setParams(p)
  }

  return (
    <Box>
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Dari Tanggal"
              type="date"
              fullWidth
              size="small"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Sampai Tanggal"
              type="date"
              fullWidth
              size="small"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button variant="contained" onClick={applyFilter} fullWidth>
              Terapkan Filter
            </Button>
          </Grid>
        </Grid>
      </Card>

      {isLoading ? (
        <Skeleton variant="rounded" height={300} />
      ) : !hasData ? (
        <Typography variant="body2" color="text.secondary">
          Belum ada data konsultasi pada periode ini.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PsychologyOutlinedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h4" fontWeight={700}>{stats.total_consultations ?? 0}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Konsultasi</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 40, color: 'success.main' }} />
                  <Box>
                    <Typography variant="h4" fontWeight={700}>{stats.total_users ?? 0}</Typography>
                    <Typography variant="body2" color="text.secondary">Pengguna Aktif</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Distribusi Diagnosis (Anonim)
                  </Typography>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Ringan', 'Sedang', 'Berat'] }]}
                    series={[{ data: severityCounts, color: '#1976d2' }]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Proporsi Diagnosis
                  </Typography>
                  <PieChart
                    series={[{ data: diagnosisData, arcLabel: (item) => `${item.value}` }]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Ringkasan per Tingkat Keparahan
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tingkat</TableCell>
                    <TableCell>Jumlah</TableCell>
                    <TableCell>Persentase</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diagnosisData.map((d) => {
                    const total = severityCounts.reduce((a, b) => a + b, 0)
                    const pct = total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0'
                    return (
                      <TableRow key={d.label}>
                        <TableCell>
                          <Chip
                            label={d.label}
                            size="small"
                            color={d.label === 'Berat' ? 'error' : d.label === 'Sedang' ? 'warning' : 'success'}
                          />
                        </TableCell>
                        <TableCell>{d.value}</TableCell>
                        <TableCell>{pct}%</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  )
}

export default AdminConsultations
