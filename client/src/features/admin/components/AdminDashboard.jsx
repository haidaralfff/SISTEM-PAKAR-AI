import { Card, CardContent, Typography, Grid, Skeleton, Box } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BugReportIcon from '@mui/icons-material/BugReport'
import RuleIcon from '@mui/icons-material/Rule'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import { useQuery } from '@tanstack/react-query'
import { getAdminStats } from '../api'

const StatCard = ({ icon, label, value, isLoading }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {isLoading ? <Skeleton width={40} /> : value}
        </Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Box>
    </CardContent>
  </Card>
)

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: getAdminStats,
  })

  const stats = data?.data || {}

  const diagnosisData = [
    { label: 'Ringan', value: stats.ringan ?? 0 },
    { label: 'Sedang', value: stats.sedang ?? 0 },
    { label: 'Berat', value: stats.berat ?? 0 },
  ]

  const severityCounts = [stats.ringan ?? 0, stats.sedang ?? 0, stats.berat ?? 0]
  const hasDiagnosisData = severityCounts.some((v) => v > 0)

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            label="Total Pengguna"
            value={stats.total_users ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PsychologyIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            label="Total Konsultasi"
            value={stats.total_consultations ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<BugReportIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
            label="Gejala"
            value={stats.total_symptoms ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<RuleIcon sx={{ fontSize: 40, color: 'info.main' }} />}
            label="Rule Aktif"
            value={stats.total_rules ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

      {hasDiagnosisData && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Distribusi Diagnosis
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
      )}
    </Box>
  )
}

export default AdminDashboard
