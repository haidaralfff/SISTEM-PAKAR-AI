import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHistory, deleteConsultation } from '../features/consultation/api'

const HistoryPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ from: '', to: '', severity: '' })

  const queryParams = { page: 1, limit: 50 }
  if (filters.from) queryParams.from = filters.from
  if (filters.to) queryParams.to = filters.to
  if (filters.severity) queryParams.severity = filters.severity

  const { data, isLoading } = useQuery({
    queryKey: ['consultations', 'history', queryParams],
    queryFn: () => getHistory(queryParams),
  })

  const { mutate: remove } = useMutation({
    mutationFn: deleteConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] })
      setDeleteId(null)
    },
  })

  const consultations = data?.data?.data || []

  const clearFilters = () => {
    setFilters({ from: '', to: '', severity: '' })
    setShowFilters(false)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReceiptLongOutlinedIcon /> Riwayat Konsultasi
        <Button size="small" startIcon={<FilterListIcon />} onClick={() => setShowFilters(!showFilters)} sx={{ ml: 'auto' }}>
          Filter
        </Button>
      </Typography>

      {showFilters && (
        <Card sx={{ mb: 3, p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Dari Tanggal"
                type="date"
                fullWidth
                size="small"
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Sampai Tanggal"
                type="date"
                fullWidth
                size="small"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Tingkat Keparahan</InputLabel>
                <Select
                  value={filters.severity}
                  label="Tingkat Keparahan"
                  onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                >
                  <MenuItem value="">Semua</MenuItem>
                  <MenuItem value="ringan">Ringan</MenuItem>
                  <MenuItem value="sedang">Sedang</MenuItem>
                  <MenuItem value="berat">Berat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button size="small" onClick={clearFilters}>Hapus Filter</Button>
            </Grid>
          </Grid>
        </Card>
      )}

      {isLoading ? (
        <Box>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={80} sx={{ mb: 1 }} />
          ))}
        </Box>
      ) : consultations.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Belum ada riwayat konsultasi.
        </Typography>
      ) : (
        <Card>
          <List disablePadding>
            {consultations.map((item, idx) => (
              <ListItem
                key={item.id}
                divider={idx < consultations.length - 1}
                secondaryAction={
                  <IconButton edge="end" onClick={() => setDeleteId(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => navigate(`/history/${item.id}`)}
              >
                <ListItemText
                  primary={item.result || item.disease_name}
                  secondary={new Date(item.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                />
                <Chip
                  label={`${((item.cf_result || 0) * 100).toFixed(1)}%`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 5 }}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      )}

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Hapus Riwayat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus riwayat konsultasi ini? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Batal</Button>
          <Button color="error" onClick={() => remove(deleteId)}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default HistoryPage
