import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../features/auth/hooks/useAuth'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Konsultasi', path: '/consultation' },
  { label: 'Riwayat', path: '/history' },
]

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const { mutate: logout } = useLogout()
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar className="max-w-page w-full mx-auto px-6">
          <Typography variant="h6" fontWeight={700} className="text-ink-black mr-6">
            Ruang Pulih
          </Typography>

          <Box className="flex-1 flex gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={location.pathname === item.path ? 'font-bold' : ''}
                sx={{
                  color: location.pathname === item.path ? '#0c0a09' : '#78716c',
                  borderBottom: location.pathname === item.path ? '2px solid #3ba6f1' : '2px solid transparent',
                  borderRadius: 0,
                  textTransform: 'none',
                  '&:hover': { color: '#0c0a09', bgcolor: 'transparent' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar className="bg-cyan-signal">
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>
              <Typography variant="body2" className="text-warm-gray">
                {user?.name}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile') }}>
              Profil
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); logout() }}>
              Keluar
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="flex-1 py-6">
        <Outlet />
      </Container>
    </Box>
  )
}

export default MainLayout
