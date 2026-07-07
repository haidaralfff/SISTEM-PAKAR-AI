import { Container, Paper, Typography } from '@mui/material'

const AuthLayout = ({ title, children }) => {
  return (
    <Container maxWidth="xs">
      <div className="min-h-screen flex flex-col justify-center items-center py-6">
        <Typography variant="h4" fontWeight={700} className="text-ink-black mb-1">
          Ruang Pulih
        </Typography>
        <Typography variant="body2" className="text-warm-gray mb-4">
          Sistem Pakar Deteksi Dini Depresi
        </Typography>
        <Paper className="w-full !p-6 !shadow-md !border !border-stone-border">
          <Typography variant="h5" fontWeight={600} className="text-ink-black mb-3">
            {title}
          </Typography>
          {children}
        </Paper>
      </div>
    </Container>
  )
}

export default AuthLayout
