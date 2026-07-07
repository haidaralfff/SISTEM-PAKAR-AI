import { useState } from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import AdminDashboard from '../features/admin/components/AdminDashboard'
import SymptomsManager from '../features/admin/components/SymptomsManager'
import DiseasesManager from '../features/admin/components/DiseasesManager'
import RulesManager from '../features/admin/components/RulesManager'
import UsersManager from '../features/admin/components/UsersManager'
import AdminConsultations from '../features/admin/components/AdminConsultations'

const tabs = [
  { label: 'Dashboard', icon: <DashboardIcon />, component: <AdminDashboard /> },
  { label: 'Gejala', icon: <BugReportOutlinedIcon />, component: <SymptomsManager /> },
  { label: 'Diagnosis', icon: <LocalHospitalOutlinedIcon />, component: <DiseasesManager /> },
  { label: 'Rule & CF', icon: <AccountTreeOutlinedIcon />, component: <RulesManager /> },
  { label: 'Pengguna', icon: <PeopleOutlinedIcon />, component: <UsersManager /> },
  { label: 'Konsultasi', icon: <AssessmentOutlinedIcon />, component: <AdminConsultations /> },
]

const AdminPage = () => {
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <DashboardIcon /> Panel Admin
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {tabs.map((t) => (
          <Tab key={t.label} icon={t.icon} label={t.label} iconPosition="start" />
        ))}
      </Tabs>

      {tabs[tab].component}
    </Box>
  )
}

export default AdminPage
