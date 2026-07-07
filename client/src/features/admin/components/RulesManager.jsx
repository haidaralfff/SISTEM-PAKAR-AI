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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Skeleton,
  Alert,
  Box,
  IconButton,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Card,
  CardContent,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import HistoryIcon from '@mui/icons-material/History'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminRules, createRule, deleteRule } from '../api'
import { getSymptoms } from '../../symptoms/api'
import { getAdminDiseases } from '../api'

const RulesManager = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ disease_id: '', symptom_ids: [], cf_expert: 0.8 })
  const [historyOpen, setHistoryOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState(null)

  const { data: rulesData, isLoading } = useQuery({
    queryKey: ['admin', 'rules'],
    queryFn: () => getAdminRules(),
  })

  const { data: symptomsData } = useQuery({
    queryKey: ['admin', 'symptoms', 'all'],
    queryFn: () => getSymptoms(),
  })

  const { data: diseasesData } = useQuery({
    queryKey: ['admin', 'diseases', 'all'],
    queryFn: () => getAdminDiseases(),
  })

  const createMut = useMutation({
    mutationFn: createRule,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'rules'] }); handleClose() },
  })

  const deleteMut = useMutation({
    mutationFn: deleteRule,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'rules'] }),
  })

  const rules = rulesData?.data?.data || rulesData?.data || []
  const symptoms = symptomsData?.data?.data || symptomsData?.data || []
  const diseases = diseasesData?.data?.data || diseasesData?.data || []

  const handleClose = () => { setOpen(false); setForm({ disease_id: '', symptom_ids: [], cf_expert: 0.8 }) }

  const handleSave = () => {
    form.symptom_ids.forEach((sid) => {
      createMut.mutate({ disease_id: form.disease_id, symptom_id: sid, cf_expert: parseFloat(form.cf_expert) })
    })
  }

  const getSymptomName = (id) => symptoms.find((s) => s.id === id)?.name || id
  const getDiseaseName = (id) => diseases.find((d) => d.id === id)?.name || id

  const rulesByDisease = {}
  rules.forEach((r) => {
    if (!rulesByDisease[r.disease_id]) rulesByDisease[r.disease_id] = { diseaseName: getDiseaseName(r.disease_id), symptoms: [] }
    rulesByDisease[r.disease_id].symptoms.push(getSymptomName(r.symptom_id))
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Tambah Rule</Button>
      </Box>

      {isLoading ? (
        <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={50} sx={{ mb: 1 }} />)}</Box>
      ) : Object.keys(rulesByDisease).length === 0 ? (
        <Typography variant="body2" color="text.secondary">Belum ada rule. Tambah rule baru untuk memulai.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(rulesByDisease).map(([diseaseId, group]) => (
            <Card key={diseaseId} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountTreeOutlinedIcon fontSize="small" color="primary" />
                  IF
                </Typography>
                {group.symptoms.map((s, i) => (
                  <Typography key={i} variant="body2" sx={{ ml: 4 }}>
                    {i === group.symptoms.length - 1 ? '└─' : '├─'} {s}
                  </Typography>
                ))}
                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  THEN <Chip label={group.diseaseName} size="small" color="primary" />
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Table size="small" sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Gejala</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>CF Pakar</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{getSymptomName(r.symptom_id)}</TableCell>
              <TableCell>{getDiseaseName(r.disease_id)}</TableCell>
              <TableCell><Chip label={r.cf_expert} size="small" color="primary" variant="outlined" /></TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => { setSelectedRule(r); setHistoryOpen(true) }} title="Riwayat Perubahan">
                  <HistoryIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => deleteMut.mutate(r.id)}><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {createMut.error && (
        <Alert severity="error" sx={{ mt: 2 }}>{createMut.error?.response?.data?.message}</Alert>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Tambah Rule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Diagnosis</InputLabel>
            <Select value={form.disease_id} label="Diagnosis" onChange={(e) => setForm({ ...form, disease_id: e.target.value })}>
              {diseases.map((d) => (
                <MenuItem key={d.id} value={d.id}>{d.code} - {d.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Gejala (pilih satu atau lebih)</InputLabel>
            <Select
              multiple
              value={form.symptom_ids}
              label="Gejala (pilih satu atau lebih)"
              onChange={(e) => setForm({ ...form, symptom_ids: e.target.value })}
              input={<OutlinedInput label="Gejala (pilih satu atau lebih)" />}
              renderValue={(selected) => selected.map((id) => symptoms.find((s) => s.id === id)?.name || id).join(', ')}
            >
              {symptoms.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  <Checkbox checked={form.symptom_ids.includes(s.id)} size="small" />
                  <ListItemText primary={`${s.code} - ${s.name}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Setiap gejala akan dibuat sebagai satu baris rule terpisah dengan diagnosis yang sama.
          </Typography>

          <TextField
            label="CF Pakar (0.00 - 1.00)"
            type="number"
            fullWidth
            margin="dense"
            inputProps={{ min: 0, max: 1, step: 0.1 }}
            value={form.cf_expert}
            onChange={(e) => setForm({ ...form, cf_expert: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" onClick={handleSave} disabled={!form.disease_id || form.symptom_ids.length === 0}>
            Simpan {form.symptom_ids.length > 1 ? `${form.symptom_ids.length} Rule` : ''}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Riwayat Perubahan Rule</DialogTitle>
        <DialogContent>
          {selectedRule ? (
            <Box>
              <Typography variant="body2" gutterBottom>
                <strong>Gejala:</strong> {getSymptomName(selectedRule.symptom_id)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Diagnosis:</strong> {getDiseaseName(selectedRule.disease_id)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>CF Pakar Saat Ini:</strong>{' '}
                <Chip label={selectedRule.cf_expert} size="small" color="primary" variant="outlined" />
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Riwayat perubahan versi akan tersedia ketika backend menyediakan endpoint audit log.
              </Typography>
              <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>CF Lama</TableCell>
                    <TableCell>CF Baru</TableCell>
                    <TableCell>Diubah Oleh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="caption" color="text.secondary">
                        {selectedRule.created_at
                          ? `Dibuat: ${new Date(selectedRule.created_at).toLocaleDateString('id-ID')}`
                          : 'Belum ada riwayat perubahan'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">Tidak ada data rule.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RulesManager
