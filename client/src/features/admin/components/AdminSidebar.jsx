import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'

const AdminSidebar = ({ navItems, sections, active, onChange }) => {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <Box sx={{
      width: 220, minWidth: 220,
      display: 'flex', flexDirection: 'column',
      bgcolor: '#ffffff',
      border: '1px solid #e8e6e5', borderRadius: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
      px: 2, py: 2.5,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 0.5 }}>
        <Box sx={{
          width: 8, height: 8, borderRadius: '50%',
          bgcolor: '#3ba6f1', flexShrink: 0,
        }} />
        <Typography sx={{
          fontSize: 18, fontWeight: 400,
          fontFamily: '"Inter Tight Variable", sans-serif',
          color: '#0c0a09', letterSpacing: '-0.017em',
          lineHeight: 1.2,
        }}>
          Ruang Pulih
        </Typography>
      </Box>

      {sections.map((section) => (
        <Box key={section.label} sx={{ mb: 2.5 }}>
          <Typography sx={{
            fontSize: 10, fontWeight: 500, color: '#a8a29e',
            textTransform: 'uppercase', letterSpacing: '0.025em',
            fontFamily: '"Inter Variable", sans-serif', mb: 1, px: 1.5,
          }}>
            {section.label}
          </Typography>
          {navItems.slice(section.start, section.end).map((item, i) => {
            const idx = section.start + i
            const isActive = active === idx
            return (
              <Box
                key={item.label}
                onClick={() => onChange(idx)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  px: 1.5, py: 0.875, borderRadius: 9999, cursor: 'pointer',
                  fontFamily: '"Inter Variable", sans-serif', fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  bgcolor: isActive ? '#1c1917' : 'transparent',
                  color: isActive ? '#ffffff' : '#78716c',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: isActive ? '#1c1917' : '#f5f5f4',
                    color: isActive ? '#ffffff' : '#0c0a09',
                  },
                  mb: 0.25,
                }}
              >
                <Box sx={{
                  fontSize: 16, display: 'flex',
                  color: isActive ? '#ffffff' : '#a8a29e',
                  '& svg': { fontSize: 16 },
                }}>
                  {item.icon}
                </Box>
                {item.label}
              </Box>
            )
          })}
        </Box>
      ))}

      <Box sx={{ flex: 1 }} />

      <Divider sx={{ borderColor: '#e8e6e5', mb: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 0.5 }}>
        <Avatar sx={{
          width: 30, height: 30, fontSize: 12,
          bgcolor: '#3ba6f1', color: '#ffffff',
          fontWeight: 500, fontFamily: '"Inter Variable", sans-serif',
        }}>
          {user?.name?.charAt(0)?.toUpperCase() || 'A'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{
            fontSize: 13, fontWeight: 500, color: '#0c0a09',
            fontFamily: '"Inter Variable", sans-serif', lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {user?.name || 'Admin'}
          </Typography>
          <Typography sx={{
            fontSize: 11, color: '#a8a29e',
            fontFamily: '"Inter Variable", sans-serif',
          }}>
            {user?.role === 'admin' ? 'Administrator' : user?.role || 'admin'}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={handleLogout}
          sx={{
            color: '#a8a29e',
            transition: 'color 0.15s ease',
            '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' },
          }}
        >
          <LogoutIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default AdminSidebar
