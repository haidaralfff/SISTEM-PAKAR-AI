import { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import AdminSidebar from '../features/admin/components/AdminSidebar'
import AdminCard from '../features/admin/components/AdminCard'
import AdminDashboard from '../features/admin/components/AdminDashboard'
import SymptomsManager from '../features/admin/components/SymptomsManager'
import DiseasesManager from '../features/admin/components/DiseasesManager'
import RulesManager from '../features/admin/components/RulesManager'
import UsersManager from '../features/admin/components/UsersManager'
import SimulationPage from '../features/admin/components/SimulationPage'

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, component: <AdminDashboard />, title: 'Dashboard', titleIcon: <DashboardIcon /> },
  { label: 'Gejala', icon: <BugReportOutlinedIcon />, component: <SymptomsManager />, title: 'Kelola Gejala', titleIcon: <BugReportOutlinedIcon /> },
  { label: 'Diagnosis', icon: <LocalHospitalOutlinedIcon />, component: <DiseasesManager />, title: 'Kelola Diagnosis', titleIcon: <LocalHospitalOutlinedIcon /> },
  { label: 'Rule & CF', icon: <AccountTreeOutlinedIcon />, component: <RulesManager />, title: 'Rule & Certainty Factor', titleIcon: <AccountTreeOutlinedIcon /> },
  { label: 'Simulasi', icon: <CalculateOutlinedIcon />, component: <SimulationPage />, title: 'Simulasi Perhitungan', titleIcon: <CalculateOutlinedIcon /> },
  { label: 'Pengguna', icon: <PeopleOutlinedIcon />, component: <UsersManager />, title: 'Kelola Pengguna', titleIcon: <PeopleOutlinedIcon /> },
]

const SECTIONS = [
  { label: 'ANALYTICS', start: 0, end: 1 },
  { label: 'MASTER DATA', start: 1, end: 4 },
  { label: 'TOOLS', start: 4, end: 5 },
  { label: 'MONITORING', start: 5, end: 6 },
]

const AdminPage = () => {
  const [active, setActive] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const current = navItems[active]

  const renderContent = () => {
    if (active === 0) {
      return current.component
    }
    return (
      <AdminCard title={current.title} icon={current.titleIcon}>
        {current.component}
      </AdminCard>
    )
  }

  if (isMobile) {
    return (
      <Box>
        <Box sx={{ display: 'flex', gap: 1, overflow: 'auto', pb: 2, mb: 2 }}>
          {navItems.map((item, i) => (
            <Box
              key={item.label}
              onClick={() => setActive(i)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                px: 1.5, py: 0.75, borderRadius: 9999, cursor: 'pointer',
                whiteSpace: 'nowrap', fontSize: 13,
                bgcolor: active === i ? '#1c1917' : '#f5f5f4',
                color: active === i ? '#ffffff' : '#78716c',
                fontFamily: '"Inter Variable", sans-serif',
              }}
            >
              {item.icon}{item.label}
            </Box>
          ))}
        </Box>
        {renderContent()}
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 80px)' }}>
      <AdminSidebar navItems={navItems} sections={SECTIONS} active={active} onChange={setActive} />
      <Box sx={{
        flex: 1, minWidth: 0,
        bgcolor: '#fafaf9',
        border: '1px solid #e8e6e5', borderRadius: '0 10px 10px 0',
        borderLeft: 'none',
        p: 3,
      }}>
        {renderContent()}
      </Box>
    </Box>
  )
}

export default AdminPage
