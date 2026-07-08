import { Card, CardContent, Typography, Grid, Skeleton, Box, Chip, List, ListItem, ListItemText } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import PsychologyIcon from '@mui/icons-material/Psychology'
import BugReportIcon from '@mui/icons-material/BugReport'
import RuleIcon from '@mui/icons-material/Rule'
import HistoryIcon from '@mui/icons-material/History'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { PieChart } from '@mui/x-charts/PieChart'
import { useQuery } from '@tanstack/react-query'
import { getAdminStats, getAuditLogs, getHighRiskIncidents } from '../api'
import DiagnosisBarChart from './DiagnosisBarChart'

const actionColors = {
  CREATE_RULE: 'success',
  UPDATE_RULE: 'info',
  DELETE_RULE: 'error',
  CREATE_SYMPTOM: 'success',
  UPDATE_SYMPTOM: 'info',
  DELETE_SYMPTOM: 'error',
  CREATE_DISEASE: 'success',
  UPDATE_DISEASE: 'info',
  DELETE_DISEASE: 'error',
}

const actionLabels = {
  CREATE_RULE: 'Tambah Rule',
  UPDATE_RULE: 'Ubah Rule',
  DELETE_RULE: 'Hapus Rule',
  CREATE_SYMPTOM: 'Tambah Gejala',
  UPDATE_SYMPTOM: 'Ubah Gejala',
  DELETE_SYMPTOM: 'Hapus Gejala',
  CREATE_DISEASE: 'Tambah Diagnosis',
  UPDATE_DISEASE: 'Ubah Diagnosis',
  DELETE_DISEASE: 'Hapus Diagnosis',
}

const StatCard = ({ icon, label, value, isLoading }) => (
  <Card sx={{ height: '100%', border: '1px solid #e8e6e5', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px', borderRadius: '10px' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography variant="h4" fontWeight={400} sx={{ fontFamily: '"Inter Tight Variable", sans-serif', color: '#0c0a09' }}>
          {isLoading ? <Skeleton width={40} /> : value}
        </Typography>
        <Typography variant="body2" sx={{ color: '#78716c', fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>{label}</Typography>
      </Box>
    </CardContent>
  </Card>
)

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: getAdminStats,
  })

  const { data: auditData, isLoading: auditLoading } = useQuery({
    queryKey: ['admin', 'audit-latest'],
    queryFn: () => getAuditLogs({ limit: 5 }),
  })

  const { data: highRiskData, isLoading: highRiskLoading } = useQuery({
    queryKey: ['admin', 'high-risk'],
    queryFn: () => getHighRiskIncidents({ limit: 5 }),
  })

  const stats = data?.data || {}
  const latestLogs = auditData?.data?.data || []
  const highRiskIncidents = highRiskData?.data?.data || []

  const diagnosisData = [
    { label: 'Gangguan Mood', value: stats.gangguan_mood ?? 0 },
    { label: 'Ringan', value: stats.ringan ?? 0 },
    { label: 'Sedang', value: stats.sedang ?? 0 },
    { label: 'Berat', value: stats.berat ?? 0 },
  ]

  const severityCounts = [stats.gangguan_mood ?? 0, stats.ringan ?? 0, stats.sedang ?? 0, stats.berat ?? 0]
  const hasDiagnosisData = severityCounts.some((v) => v > 0)

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 400, fontFamily: '"Inter Tight Variable", sans-serif', color: '#0c0a09', mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: 36, color: '#3ba6f1' }} />}
            label="Total Pengguna"
            value={stats.total_users ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PsychologyIcon sx={{ fontSize: 36, color: '#3ba6f1' }} />}
            label="Total Konsultasi"
            value={stats.total_consultations ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<BugReportIcon sx={{ fontSize: 36, color: '#3ba6f1' }} />}
            label="Gejala"
            value={stats.total_symptoms ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<RuleIcon sx={{ fontSize: 36, color: '#3ba6f1' }} />}
            label="Rule Aktif"
            value={stats.total_rules ?? '-'}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: '1px solid #e8e6e5', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px', borderRadius: '10px' }}>
            <CardContent>
              <DiagnosisBarChart data={diagnosisData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: '1px solid #e8e6e5', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px', borderRadius: '10px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"Inter Tight Variable", sans-serif',
                    fontWeight: 400,
                    fontSize: 16,
                    color: '#0c0a09',
                    letterSpacing: '-0.017em',
                  }}
                >
                  Proporsi Diagnosis
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter Variable", sans-serif',
                    fontSize: 12,
                    color: '#a8a29e',
                  }}
                >
                  Persentase per tingkat keparahan
                </Typography>
              </Box>
              {hasDiagnosisData ? (
                <PieChart
                  series={[{
                    data: diagnosisData.map((item) => ({
                      ...item,
                      color: item.label === 'Gangguan Mood' ? '#3ba6f1' : item.label === 'Ringan' ? '#22c55e' : item.label === 'Sedang' ? '#f97316' : '#dc2626',
                    })),
                    arcLabel: (item) => `${((item.value / diagnosisData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%`,
                    innerRadius: 60,
                    cornerRadius: 6,
                    paddingAngle: 4,
                    highlightScope: { fade: 'global', highlight: 'item' },
                  }]}
                  height={260}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      sx: {
                        '& .MuiChartsLegend-label': {
                          fontFamily: '"Inter Variable", sans-serif',
                          fontSize: 12,
                          color: '#78716c',
                        },
                      },
                    },
                  }}
                  margin={{ left: 0, right: 100, top: 20, bottom: 20 }}
                />
              ) : (
                <Typography variant="body2" sx={{ color: '#78716c', py: 4, textAlign: 'center' }}>
                  Belum ada data diagnosis.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ border: '1px solid #e8e6e5', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px', borderRadius: '10px' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 400, fontFamily: '"Inter Tight Variable", sans-serif', color: '#0c0a09', mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontSize: 16, letterSpacing: '-0.017em' }}>
                <HistoryIcon sx={{ color: '#3ba6f1', fontSize: 20 }} /> Aktivitas Terbaru
              </Typography>
              {auditLoading ? (
                <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={36} sx={{ mb: 0.5 }} />)}</Box>
              ) : latestLogs.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#78716c' }}>Belum ada aktivitas.</Typography>
              ) : (
                <List dense disablePadding>
                  {latestLogs.map((log) => (
                    <ListItem key={log.id} disablePadding sx={{ py: 0.75, borderBottom: '1px solid #e8e6e5', '&:last-child': { borderBottom: 'none' } }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={actionLabels[log.action] || log.action}
                              size="small"
                              color={actionColors[log.action] || 'default'}
                              variant="outlined"
                              sx={{ height: 20, '& .MuiChip-label': { fontSize: 10, px: 0.75 } }}
                            />
                            <Typography sx={{ fontSize: 12, color: '#78716c', fontFamily: '"Inter Variable", sans-serif' }}>
                              oleh {log.actor_name || '-'}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 11, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif', mt: 0.25 }}>
                            {new Date(log.created_at).toLocaleString('id-ID')}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ border: '1px solid #e8e6e5', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px', borderRadius: '10px' }}>
            <CardContent>
              <Typography sx={{ fontWeight: 400, fontFamily: '"Inter Tight Variable", sans-serif', color: '#0c0a09', mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontSize: 16, letterSpacing: '-0.017em' }}>
                <WarningAmberOutlinedIcon sx={{ color: '#ef4444', fontSize: 20 }} /> Insiden Risiko Tinggi
              </Typography>
              {highRiskLoading ? (
                <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={36} sx={{ mb: 0.5 }} />)}</Box>
              ) : highRiskIncidents.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#78716c' }}>Belum ada insiden risiko tinggi.</Typography>
              ) : (
                <List dense disablePadding>
                  {highRiskIncidents.map((inc) => (
                    <ListItem key={inc.id} disablePadding sx={{ py: 0.75, borderBottom: '1px solid #e8e6e5', '&:last-child': { borderBottom: 'none' } }}>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: 13, color: '#0c0a09', fontFamily: '"Inter Variable", sans-serif' }}>
                            {inc.disease_name}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 11, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif', mt: 0.25 }}>
                            {new Date(inc.created_at).toLocaleString('id-ID')} &middot; Keyakinan {inc.belief ? (inc.belief * 100).toFixed(2) : '-'}%
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
