import { useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Alert,
  Box,
  IconButton,
  Chip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminDiseases, createDisease, updateDisease, deleteDisease } from '../api'

const emptyForm = { code: '', name: '', severity_level: 'ringan', description: '', solution: '' }

const DiseasesManager = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'diseases'],
    queryFn: () => getAdminDiseases(),
  })

  const createMut = useMutation({
    mutationFn: createDisease,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'diseases'] }); handleClose() },
  })

  const updateMut = useMutation({
    mutationFn: ({ id, ...d }) => updateDisease(id, d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'diseases'] }); handleClose() },
  })

  const deleteMut = useMutation({
    mutationFn: deleteDisease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'diseases'] }),
  })

  const diseases = data?.data?.data || []

  const handleOpen = (item) => {
    if (item) {
      setEditing(item.id)
      setForm({ code: item.code, name: item.name, severity_level: item.severity_level, description: item.description || '', solution: item.solution || '' })
    } else {
      setEditing(null)
      setForm(emptyForm)
    }
    setOpen(true)
  }

  const handleClose = () => { setOpen(false); setEditing(null); setForm(emptyForm) }

  const handleSave = () => {
    if (editing) updateMut.mutate({ id: editing, ...form })
    else createMut.mutate(form)
  }

  const severityColor = (level) => {
    if (level === 'berat') return 'error'
    if (level === 'sedang') return 'warning'
    if (level === 'ringan') return 'success'
    return 'info'
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Tambah Diagnosis</Button>
      </Box>

      {isLoading ? (
        <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={50} sx={{ mb: 1 }} />)}</Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Kode</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Tingkat</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diseases.map((d) => (
              <TableRow key={d.id}>
                <TableCell><Chip label={d.code} size="small" /></TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell><Chip label={d.severity_level} size="small" color={severityColor(d.severity_level)} /></TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpen(d)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => deleteMut.mutate(d.id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {(createMut.error || updateMut.error) && (
        <Alert severity="error" sx={{ mt: 2 }}>{createMut.error?.response?.data?.message || updateMut.error?.response?.data?.message}</Alert>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit Diagnosis' : 'Tambah Diagnosis'}</DialogTitle>
        <DialogContent>
          <TextField label="Kode" fullWidth margin="dense" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <TextField label="Nama" fullWidth margin="dense" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Tingkat Keparahan</InputLabel>
            <Select value={form.severity_level} label="Tingkat Keparahan" onChange={(e) => setForm({ ...form, severity_level: e.target.value })}>
              {['gangguan_mood', 'ringan', 'sedang', 'berat'].map((l) => (
                <MenuItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1).replace('_', ' ')}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Deskripsi" fullWidth margin="dense" multiline rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField label="Solusi / Rekomendasi" fullWidth margin="dense" multiline rows={3} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" onClick={handleSave} disabled={createMut.isPending || updateMut.isPending}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DiseasesManager
