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
  Switch,
  FormControlLabel,
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
import { getAdminSymptoms, createSymptom, updateSymptom, deleteSymptom } from '../api'

const emptyForm = { code: '', name: '', description: '', category: 'Emosional', is_high_risk: false }

const SymptomsManager = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'symptoms'],
    queryFn: () => getAdminSymptoms(),
  })

  const createMut = useMutation({
    mutationFn: createSymptom,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] }); handleClose() },
  })

  const updateMut = useMutation({
    mutationFn: ({ id, ...d }) => updateSymptom(id, d),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] }); handleClose() },
  })

  const deleteMut = useMutation({
    mutationFn: deleteSymptom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] }),
  })

  const symptoms = data?.data?.data || []

  const handleOpen = (item) => {
    if (item) {
      setEditing(item.id)
      setForm({ code: item.code, name: item.name, description: item.description || '', category: item.category, is_high_risk: item.is_high_risk })
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Tambah Gejala
        </Button>
      </Box>

      {isLoading ? (
        <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={50} sx={{ mb: 1 }} />)}</Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Kode</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Risiko Tinggi</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {symptoms.map((s) => (
              <TableRow key={s.id}>
                <TableCell><Chip label={s.code} size="small" /></TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell>{s.is_high_risk ? 'Ya' : 'Tidak'}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpen(s)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => deleteMut.mutate(s.id)}><DeleteIcon fontSize="small" /></IconButton>
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
        <DialogTitle>{editing ? 'Edit Gejala' : 'Tambah Gejala'}</DialogTitle>
        <DialogContent>
          <TextField label="Kode" fullWidth margin="dense" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <TextField label="Nama" fullWidth margin="dense" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Deskripsi" fullWidth margin="dense" multiline rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Kategori</InputLabel>
            <Select value={form.category} label="Kategori" onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {['Kognitif', 'Emosional', 'Fisik', 'Sosial'].map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel control={<Switch checked={form.is_high_risk} onChange={(e) => setForm({ ...form, is_high_risk: e.target.checked })} />} label="Risiko Tinggi" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" onClick={handleSave} disabled={createMut.isPending || updateMut.isPending}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SymptomsManager
