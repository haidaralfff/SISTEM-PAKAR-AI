import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../features/auth/hooks/useAuth'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Konsultasi', path: '/consultation', icon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Simulasi', path: '/simulation', icon: <CalculateOutlinedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Artikel', path: '/articles', icon: <ArticleOutlinedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Riwayat', path: '/history', icon: <HistoryOutlinedIcon sx={{ fontSize: 20 }} /> },
]

const getPageTitle = (pathname) => {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/consultation') return 'Konsultasi'
  if (pathname === '/simulation') return 'Simulasi Perhitungan'
  if (pathname === '/articles') return 'Artikel'
  if (pathname.startsWith('/history')) return 'Riwayat'
  if (pathname === '/profile') return 'Profil'
  return 'Dashboard'
}

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const { mutate: logout } = useLogout()
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bgcolor: '#ffffff',
        borderRight: '1px solid #e8e6e5',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          component="img"
          src="/logo.svg"
          alt="Ruang Pulih"
          sx={{ height: 32 }}
        />
        <Typography
          sx={{
            fontFamily: '"Inter Tight Variable", sans-serif',
            fontWeight: 500,
            fontSize: 16,
            color: '#0c0a09',
            letterSpacing: '-0.017em',
          }}
        >
          Ruang Pulih
        </Typography>
        {user?.role === 'admin' && (
          <Chip
            label="Admin"
            size="small"
            onClick={() => navigate('/admin')}
            sx={{
              height: 20,
              fontSize: 10,
              fontWeight: 500,
              fontFamily: '"Inter Variable", sans-serif',
              bgcolor: '#1c1917',
              color: '#ffffff',
              borderRadius: 9999,
              '&:hover': { bgcolor: '#0c0a09' },
            }}
          />
        )}
      </Box>

      {/* Nav Items */}
      <Box sx={{ flex: 1, px: 2, pt: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Box
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.2,
                borderRadius: '10px',
                cursor: 'pointer',
                mb: 0.5,
                bgcolor: isActive ? '#3ba6f114' : 'transparent',
                color: isActive ? '#3ba6f1' : '#78716c',
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: isActive ? '#3ba6f114' : '#f5f5f4',
                  color: isActive ? '#3ba6f1' : '#0c0a09',
                },
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Profile + Logout */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ mb: 1.5, borderColor: '#e8e6e5' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.2,
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            '&:hover': { bgcolor: '#f5f5f4' },
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: '#3ba6f1' }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: '#0c0a09',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 11,
                color: '#a8a29e',
              }}
            >
              {user?.role === 'admin' ? 'Admin' : 'Pengguna'}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          slotProps={{
            paper: {
              sx: { borderRadius: '10px', border: '1px solid #e8e6e5', mt: -1, minWidth: 160 },
            },
          }}
        >
          <MenuItem
            onClick={() => { setAnchorEl(null); navigate('/profile') }}
            sx={{ fontSize: 13, fontFamily: '"Inter Variable", sans-serif', gap: 1 }}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: 18, color: '#78716c' }} /> Profil
          </MenuItem>
          <MenuItem
            onClick={() => { setAnchorEl(null); logout() }}
            sx={{ fontSize: 13, fontFamily: '"Inter Variable", sans-serif', gap: 1, color: '#dc2626' }}
          >
            <LogoutOutlinedIcon sx={{ fontSize: 18 }} /> Keluar
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

const Topbar = () => {
  const location = useLocation()
  const title = getPageTitle(location.pathname)

  return (
    <Box
      sx={{
        height: 72,
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e8e6e5',
        display: 'flex',
        alignItems: 'center',
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Inter Tight Variable", sans-serif',
          fontWeight: 500,
          fontSize: 20,
          color: '#0c0a09',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

const MainLayout = () => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fafaf9' }}>
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafaf9' }}>
      <Sidebar />
      <Box sx={{ flex: 1, ml: '260px', display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
