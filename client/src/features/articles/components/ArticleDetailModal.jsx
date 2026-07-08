import { Dialog, DialogContent, Typography, Box, IconButton, Chip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const severityColors = {
  P04: { bg: '#3ba6f114', text: '#3ba6f1' },
  P01: { bg: '#22c55e14', text: '#22c55e' },
  P02: { bg: '#f9731614', text: '#f97316' },
  P03: { bg: '#dc262614', text: '#dc2626' },
}

const severityLabels = {
  P04: 'Gangguan Mood',
  P01: 'Depresi Ringan',
  P02: 'Depresi Sedang',
  P03: 'Depresi Berat',
}

const ArticleDetailModal = ({ open, onClose, article }) => {
  if (!article) return null

  const colors = severityColors[article.disease_code] || { bg: '#78716c14', text: '#78716c' }
  const label = severityLabels[article.disease_code] || article.disease_code

  const paragraphs = article.content.split('\n\n').filter((p) => p.trim())

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '85vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {article.image_url && (
          <Box
            sx={{
              height: 220,
              backgroundImage: `url(${article.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
              },
            }}
          />
        )}

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Chip
              label={label}
              size="small"
              sx={{
                height: 24,
                fontSize: 12,
                fontWeight: 500,
                fontFamily: '"Inter Variable", sans-serif',
                bgcolor: colors.bg,
                color: colors.text,
                borderRadius: 9999,
              }}
            />
            <IconButton onClick={onClose} size="small" sx={{ color: '#78716c' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Inter Tight Variable", sans-serif',
              fontWeight: 700,
              fontSize: 24,
              color: '#0c0a09',
              mb: 3,
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontFamily: '"Inter Variable", sans-serif',
                  fontSize: 15,
                  color: '#44403c',
                  lineHeight: 1.8,
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ArticleDetailModal
