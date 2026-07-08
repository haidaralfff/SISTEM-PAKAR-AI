import { Grid, Box } from '@mui/material'
import PsychologyIcon from '@mui/icons-material/Psychology'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HistoryIcon from '@mui/icons-material/History'
import StarsIcon from '@mui/icons-material/Stars'
import HeroCard from '../features/dashboard/components/HeroCard'
import StatCard from '../features/dashboard/components/StatCard'
import PrimaryActionCard from '../features/dashboard/components/PrimaryActionCard'
import MoodTracker from '../features/dashboard/components/MoodTracker'
import ProgressSection from '../features/dashboard/components/ProgressSection'
import TrendChart from '../features/dashboard/components/TrendChart'
import ActivityTimeline from '../features/dashboard/components/ActivityTimeline'
import QuoteCard from '../features/dashboard/components/QuoteCard'
import TipsCard from '../features/dashboard/components/TipsCard'
import EducationCard from '../features/dashboard/components/EducationCard'

const DashboardPage = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Hero */}
        <Grid size={{ xs: 12 }}>
          <HeroCard />
        </Grid>

        {/* Stats Row */}
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<PsychologyIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />}
            value="—"
            label="Total Konsultasi"
            trend="+2 minggu ini"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<TrendingUpIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />}
            value="—"
            label="Mood Minggu Ini"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<StarsIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />}
            value="—"
            label="Recovery Progress"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            icon={<HistoryIcon sx={{ fontSize: 22, color: '#3ba6f1' }} />}
            value="—"
            label="Streak Hari Positif"
          />
        </Grid>

        {/* CTA */}
        <Grid size={{ xs: 12 }}>
          <PrimaryActionCard />
        </Grid>

        {/* Mood + Progress + Quote */}
        <Grid size={{ xs: 12, md: 5 }}>
          <MoodTracker />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <ProgressSection />
        </Grid>

        {/* Chart + Quote */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuoteCard />
        </Grid>

        {/* Activity + Education */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ActivityTimeline />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EducationCard />
        </Grid>

        {/* Tips */}
        <Grid size={{ xs: 12 }}>
          <TipsCard />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
