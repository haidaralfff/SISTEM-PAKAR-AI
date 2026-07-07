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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminUsers, deleteUser } from '../api'

const maskEmail = (email) => {
  if (!email) return '-'
  const [local, domain] = email.split('@')
  if (!domain) return email
  const visible = local.charAt(0)
  return `${visible}***@${domain}`
}

const UsersManager = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => getAdminUsers(),
  })

  const deleteMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }),
  })

  const users = data?.data?.data || data?.data || []

  return (
    <Box>
      {isLoading ? (
        <Box>{[1, 2, 3].map((i) => <Skeleton key={i} height={50} sx={{ mb: 1 }} />)}</Box>
      ) : error ? (
        <Alert severity="error">Gagal memuat data pengguna</Alert>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Email (disamarkan)</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Jumlah Konsultasi</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>
                  <Chip label={maskEmail(u.email)} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip label={u.role} size="small" color={u.role === 'admin' ? 'secondary' : 'default'} />
                </TableCell>
                <TableCell>{u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '-'}</TableCell>
                <TableCell>{u.consultation_count ?? '-'}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => deleteMut.mutate(u.id)} disabled={u.role === 'admin'}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  )
}

export default UsersManager
