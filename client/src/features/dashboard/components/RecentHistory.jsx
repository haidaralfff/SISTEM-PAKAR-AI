import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Skeleton, Chip } from '@mui/material'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getHistory } from '../../consultation/api'

const RecentHistory = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'recent'],
    queryFn: () => getHistory({ page: 1, limit: 3 }),
  })

  const consultations = data?.data?.data || []

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryOutlinedIcon fontSize="small" /> Riwayat Konsultasi Terbaru
        </Typography>

        {isLoading ? (
          <Box>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={60} sx={{ mb: 1 }} />
            ))}
          </Box>
        ) : consultations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Belum ada konsultasi. Mulai konsultasi sekarang!
          </Typography>
        ) : (
          <List disablePadding>
            {consultations.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                onClick={() => navigate(`/history/${item.id}`)}
              >
                <ListItemText
                  primary={item.result || item.disease_name}
                  secondary={new Date(item.created_at).toLocaleDateString('id-ID')}
                />
                <Chip
                  label={`${((item.cf_result || 0) * 100).toFixed(1)}%`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentHistory
