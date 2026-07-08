import { useState } from 'react'
import {
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
  ListItemText,
  Checkbox,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import HistoryIcon from '@mui/icons-material/History'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminRules, createRule, updateRule, deleteRule } from '../api'
import { getSymptoms } from '../../symptoms/api'
import { getAdminDiseases } from '../api'

const emptyForm = { disease_id: '', symptom_ids: [], cf_expert: 0.8 }

const RulesManager = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editRule, setEditRule] = useState(null)
  const [form, setForm] = useState(emptyForm)
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

  const createMut = useMutation({ mutationFn: createRule })
  const updateMut = useMutation({ mutationFn: ({ id, ...data }) => updateRule(id, data) })
  const deleteMut = useMutation({ mutationFn: deleteRule })

  const rules = rulesData?.data?.data || []
  const symptoms = symptomsData?.data?.data || []
  const diseases = diseasesData?.data?.data || []

  const refreshRules = () => queryClient.invalidateQueries({ queryKey: ['admin', 'rules'] })

  const handleClose = () => { setOpen(false); setEditRule(null); setForm(emptyForm) }

  const handleOpenCreate = () => {
    setEditRule(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const handleOpenEdit = (rule) => {
    setEditRule(rule)
    setForm({ disease_id: rule.disease_id, symptom_ids: [rule.symptom_id], cf_expert: rule.cf_expert })
    setOpen(true)
  }

  const handleSave = async () => {
    if (editRule) {
      updateMut.mutate(
        { id: editRule.id, cf_expert: parseFloat(form.cf_expert) },
        { onSuccess: () => { refreshRules(); handleClose() } },
      )
    } else {
      try {
        await Promise.all(
          form.symptom_ids.map((sid) =>
            createMut.mutateAsync({ disease_id: form.disease_id, symptom_id: sid, cf_expert: parseFloat(form.cf_expert) })
          )
        )
        refreshRules()
        handleClose()
      } catch (e) {
        // error handled by form-level alert
      }
    }
  }

  const getSymptom = (id) => symptoms.find((s) => s.id === id)
  const getDisease = (id) => diseases.find((d) => d.id === id)
  const getSymptomName = (id) => getSymptom(id)?.name || '(tidak ditemukan)'
  const getDiseaseName = (id) => getDisease(id)?.name || '(tidak ditemukan)'

  const rulesByDisease = {}
  rules.forEach((r) => {
    if (!rulesByDisease[r.disease_id]) rulesByDisease[r.disease_id] = { diseaseName: getDiseaseName(r.disease_id), symptoms: [] }
    const sym = getSymptom(r.symptom_id)
    rulesByDisease[r.disease_id].symptoms.push({
      rule: r,
      name: sym?.name || '(tidak ditemukan)',
      code: sym?.code || '',
      cf: r.cf_expert,
    })
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>Tambah Rule</Button>
      </Box>

      {isLoading || !symptomsData || !diseasesData ? (
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
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', ml: 4, mb: 0.5, gap: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: '"Inter Variable", sans-serif', color: '#0c0a09', flex: 1 }}>
                      {i === group.symptoms.length - 1 ? '└─' : '├─'} {s.code ? `${s.code} — ` : ''}{s.name}
                      <Chip label={`CF ${s.cf}`} size="small" variant="outlined" sx={{ ml: 1, height: 18, '& .MuiChip-label': { fontSize: 10, px: 0.5 } }} />
                    </Typography>
                    <IconButton size="small" onClick={() => handleOpenEdit(s.rule)} title="Edit CF" sx={{ color: '#78716c', '&:hover': { color: '#3ba6f1' } }}>
                      <EditIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => { setSelectedRule(s.rule); setHistoryOpen(true) }} title="Riwayat" sx={{ color: '#78716c', '&:hover': { color: '#3ba6f1' } }}>
                      <HistoryIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteMut.mutate(s.rule.id, { onSuccess: refreshRules })} title="Hapus" sx={{ color: '#78716c', '&:hover': { color: '#ef4444' } }}>
                      <DeleteIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                  </Box>
                ))}
                <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"Inter Tight Variable", sans-serif' }}>
                  THEN <Chip label={group.diseaseName} size="small" color="primary" />
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {(createMut.error || updateMut.error) && (
        <Alert severity="error" sx={{ mt: 2 }}>{createMut.error?.response?.data?.message || updateMut.error?.response?.data?.message}</Alert>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editRule ? 'Edit Rule' : 'Tambah Rule'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" disabled={!!editRule}>
            <InputLabel id="disease-label">Diagnosis</InputLabel>
            <Select
              labelId="disease-label"
              value={form.disease_id}
              label="Diagnosis"
              onChange={(e) => setForm({ ...form, disease_id: e.target.value })}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) return <Typography sx={{ color: '#a8a29e', fontSize: 14 }}>Pilih diagnosis...</Typography>
                const d = diseases.find((d) => d.id === selected)
                return d ? `${d.code} — ${d.name}` : selected
              }}
            >
              {diseases.length === 0 && (
                <MenuItem disabled value="">
                  <Typography sx={{ color: '#a8a29e' }}>Tidak ada diagnosis tersedia</Typography>
                </MenuItem>
              )}
              {diseases.map((d) => (
                <MenuItem key={d.id} value={d.id} sx={{ py: 1 }}>
                  <ListItemText
                    primary={`${d.code} — ${d.name}`}
                    primaryTypographyProps={{ fontSize: 13, fontFamily: '"Inter Variable", sans-serif' }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {!editRule && (
            <>
              <FormControl fullWidth margin="dense">
                <InputLabel id="symptom-label">Gejala (pilih satu atau lebih)</InputLabel>
                <Select
                  labelId="symptom-label"
                  multiple
                  value={form.symptom_ids}
                  label="Gejala (pilih satu atau lebih)"
                  onChange={(e) => setForm({ ...form, symptom_ids: e.target.value })}
                  displayEmpty
                  renderValue={(selected) =>
                    selected.length === 0 ? (
                      <Typography sx={{ color: '#a8a29e', fontSize: 14 }}>Pilih gejala...</Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                          const sym = symptoms.find((s) => s.id === id)
                          return <Chip key={id} label={sym?.name || id} size="small" sx={{ height: 22, fontSize: 11 }} />
                        })}
                      </Box>
                    )
                  }
                >
                  {symptoms.length === 0 && (
                    <MenuItem disabled value="">
                      <Typography sx={{ color: '#a8a29e' }}>Tidak ada gejala tersedia</Typography>
                    </MenuItem>
                  )}
                  {symptoms.map((s) => (
                    <MenuItem key={s.id} value={s.id} sx={{ py: 1 }}>
                      <Checkbox checked={form.symptom_ids.includes(s.id)} size="small" sx={{ '&.Mui-checked': { color: '#3ba6f1' } }} />
                      <ListItemText
                        primary={`${s.code} — ${s.name}`}
                        primaryTypographyProps={{ fontSize: 13, fontFamily: '"Inter Variable", sans-serif' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="caption" sx={{ color: '#a8a29e', mt: 1, display: 'block', fontFamily: '"Inter Variable", sans-serif' }}>
                Setiap gejala akan dibuat sebagai satu baris rule terpisah dengan diagnosis yang sama.
              </Typography>
            </>
          )}

          {editRule && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Mengubah CF Pakar untuk gejala <strong>{getSymptomName(editRule.symptom_id)}</strong> → <strong>{getDiseaseName(editRule.disease_id)}</strong>
            </Typography>
          )}

          <TextField
            label="CF Pakar (0.00 - 1.00)"
            type="number"
            fullWidth
            margin="dense"
            slotProps={{ htmlInput: { min: 0, max: 1, step: 0.1 } }}
            value={form.cf_expert}
            onChange={(e) => setForm({ ...form, cf_expert: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                '& fieldset': { borderColor: '#e8e6e5' },
                '&:hover fieldset': { borderColor: '#d6d3d1' },
                '&.Mui-focused fieldset': { borderColor: '#3ba6f1' },
              },
              '& .MuiInputLabel-root': { fontFamily: '"Inter Variable", sans-serif' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#3ba6f1' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: '9999px',
              textTransform: 'none',
              fontFamily: '"Inter Variable", sans-serif',
              borderColor: '#e8e6e5',
              color: '#0c0a09',
              '&:hover': { borderColor: '#d6d3d1', bgcolor: '#f5f5f4' },
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!form.disease_id || form.symptom_ids.length === 0 || createMut.isPending || updateMut.isPending}
            sx={{
              borderRadius: '9999px',
              textTransform: 'none',
              fontFamily: '"Inter Variable", sans-serif',
              bgcolor: '#3ba6f1',
              color: '#ffffff',
              '&:hover': { bgcolor: '#3398e1' },
            }}
          >
            Simpan
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
              <Typography variant="body2" color="text.secondary">
                Riwayat perubahan dapat dilihat di tab <strong>Audit Log</strong> pada panel admin.
              </Typography>
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
