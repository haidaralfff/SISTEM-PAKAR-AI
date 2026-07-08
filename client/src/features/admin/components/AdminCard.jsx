import { Box, Typography } from '@mui/material'

const AdminCard = ({ title, icon, children, sx }) => (
  <Box>
    {title && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        {icon && (
          <Box sx={{ color: '#3ba6f1', display: 'flex', '& svg': { fontSize: 20 } }}>
            {icon}
          </Box>
        )}
        <Typography sx={{
          fontSize: 18, fontWeight: 400,
          fontFamily: '"Inter Tight Variable", sans-serif',
          color: '#0c0a09', letterSpacing: '-0.017em',
          lineHeight: 1.2,
        }}>
          {title}
        </Typography>
        <Box sx={{ flex: 1, borderBottom: '1px solid #e8e6e5', ml: 1, alignSelf: 'center' }} />
      </Box>
    )}
    <Box sx={{
      bgcolor: '#ffffff',
      border: '1px solid #e8e6e5',
      borderRadius: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 16px 0px',
      px: 3, py: 2.5,
      ...sx,
    }}>
      {children}
    </Box>
  </Box>
)

export default AdminCard
