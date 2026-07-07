import { Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import WelcomeCard from '../features/dashboard/components/WelcomeCard'
import SummaryCard from '../features/dashboard/components/SummaryCard'
import RecentHistory from '../features/dashboard/components/RecentHistory'
import TrendChart from '../features/dashboard/components/TrendChart'
import EducationCard from '../features/dashboard/components/EducationCard'

const DashboardPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <WelcomeCard />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            className="!min-h-[120px] !text-lg !font-bold"
            startIcon={<PsychologyOutlinedIcon sx={{ fontSize: 32 }} />}
            onClick={() => navigate('/consultation')}
          >
            Mulai Konsultasi
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RecentHistory />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TrendChart />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <EducationCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardPage
