import { Card, CardContent, Typography, Box } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const quotes = [
  {
    text: 'Tidak apa-apa berjalan pelan. Selama kamu tidak berhenti.',
    author: 'Lao Tzu',
  },
  {
    text: 'Kesehatan mental bukanlah tujuan, melainkan proses perjalanan.',
    author: 'Anonim',
  },
  {
    text: 'Kamu lebih kuat dari yang kamu kira dan lebih dicintai dari yang kamu sadari.',
    author: 'Anonim',
  },
  {
    text: 'Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dirimu.',
    author: 'Anonim',
  },
]

const QuoteCard = () => {
  const quote = quotes[new Date().getDate() % quotes.length]

  return (
    <Card
      sx={{
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
        border: 'none',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <FormatQuoteIcon sx={{ fontSize: 24, color: '#3ba6f1', opacity: 0.6, mb: 1 }} />
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 14,
            fontStyle: 'italic',
            color: '#fafaf9',
            lineHeight: 1.6,
            mb: 1.5,
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: 12,
            color: '#78716c',
          }}
        >
          — {quote.author}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default QuoteCard
