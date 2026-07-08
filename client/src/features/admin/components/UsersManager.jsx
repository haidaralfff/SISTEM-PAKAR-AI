import { useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Skeleton,
  Alert,
  Box,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Avatar,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminUsers, deleteUser } from '../api'

const maskEmail = (email) => {
  if (!email) return '-'
  const [local, domain] = email.split('@')
  if (!domain) return email
  return `${local.charAt(0)}***@${domain}`
}

const roleLabel = { admin: 'Admin', user: 'Pengguna' }

const UsersManager = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => getAdminUsers(),
  })

  const deleteMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      setDeleteTarget(null)
    },
  })

  const users = data?.data?.data || []
  const filtered = search
    ? users.filter((u) => u.name?.toLowerCase().includes(search.toLowerCase()))
    : users

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <TextField
          placeholder="Cari pengguna..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ fontSize: 16, color: '#a8a29e' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            minWidth: 240,
            '& .MuiOutlinedInput-root': { borderRadius: 9999, bgcolor: '#f5f5f4' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e8e6e5' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3ba6f1' },
          }}
        />
        <Chip
          label={`${users.length} pengguna`}
          size="small"
          variant="outlined"
          sx={{ height: 24, '& .MuiChip-label': { fontSize: 11 } }}
        />
      </Box>

      {isLoading ? (
        <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>Gagal memuat data pengguna</Alert>
      ) : filtered.length === 0 ? (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6,
          color: '#a8a29e',
        }}>
          <PersonOffOutlinedIcon sx={{ fontSize: 40, mb: 1.5 }} />
          <Typography sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 13, color: '#78716c' }}>
            {search ? 'Tidak ada pengguna yang cocok dengan pencarian.' : 'Belum ada pengguna terdaftar.'}
          </Typography>
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 500, color: '#78716c', fontSize: 11, letterSpacing: '0.025em', textTransform: 'uppercase' }}>Pengguna</TableCell>
              <TableCell sx={{ fontWeight: 500, color: '#78716c', fontSize: 11, letterSpacing: '0.025em', textTransform: 'uppercase' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 500, color: '#78716c', fontSize: 11, letterSpacing: '0.025em', textTransform: 'uppercase' }}>Tanggal Daftar</TableCell>
              <TableCell sx={{ fontWeight: 500, color: '#78716c', fontSize: 11, letterSpacing: '0.025em', textTransform: 'uppercase' }}>Konsultasi</TableCell>
              <TableCell sx={{ fontWeight: 500, color: '#78716c', fontSize: 11, letterSpacing: '0.025em', textTransform: 'uppercase' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((u) => (
              <TableRow
                key={u.id}
                sx={{
                  '&:hover': { bgcolor: '#f5f5f4' },
                  '&:last-child td': { borderBottom: 'none' },
                  transition: 'background-color 0.15s ease',
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{
                      width: 28, height: 28, fontSize: 11,
                      bgcolor: u.role === 'admin' ? '#3ba6f1' : '#d6d3d1',
                      color: u.role === 'admin' ? '#ffffff' : '#78716c',
                      fontWeight: 500,
                    }}>
                      {u.name?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: 13, color: '#0c0a09', fontFamily: '"Inter Variable", sans-serif', fontWeight: 500, lineHeight: 1.3 }}>
                        {u.name}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#a8a29e', fontFamily: '"Inter Variable", sans-serif' }}>
                        {maskEmail(u.email)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={roleLabel[u.role] || u.role}
                    size="small"
                    color={u.role === 'admin' ? 'secondary' : 'default'}
                    variant={u.role === 'admin' ? 'filled' : 'outlined'}
                    sx={{ height: 20, '& .MuiChip-label': { fontSize: 10, px: 0.75 } }}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 12, color: '#78716c', fontFamily: '"Inter Variable", sans-serif' }}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={u.consultation_count ?? 0}
                    size="small"
                    variant="outlined"
                    sx={{ height: 20, minWidth: 28, '& .MuiChip-label': { fontSize: 10, px: 0.5 } }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteTarget(u)}
                    disabled={u.role === 'admin'}
                    sx={{
                      color: '#a8a29e',
                      transition: 'color 0.15s ease',
                      '&:hover:not(:disabled)': { color: '#ef4444', bgcolor: '#fef2f2' },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs">
        <DialogTitle sx={{ fontSize: 16, fontFamily: '"Inter Tight Variable", sans-serif', fontWeight: 400 }}>
          Nonaktifkan Pengguna
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: '"Inter Variable", sans-serif', fontSize: 13 }}>
            Apakah Anda yakin ingin menonaktifkan akun <strong>{deleteTarget?.name}</strong>?
            Pengguna tidak akan bisa login, namun data konsultasi tetap tersimpan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} sx={{ color: '#78716c' }}>Batal</Button>
          <Button
            variant="contained"
            color="error"
            disabled={deleteMut.isPending}
            onClick={() => deleteMut.mutate(deleteTarget.id)}
            sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}
          >
            {deleteMut.isPending ? 'Menonaktifkan...' : 'Nonaktifkan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UsersManager
