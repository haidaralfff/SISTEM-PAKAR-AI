import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'

const ConsentDialog = ({ open, onConsent }) => {
  const [checked, setChecked] = useState(false)

  const handleAccept = () => {
    localStorage.setItem('consultation_consent', 'true')
    onConsent()
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth hideBackdrop={false}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GavelOutlinedIcon color="primary" />
        Persetujuan Sebelum Konsultasi
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div" sx={{ mb: 2 }}>
          <Typography variant="body2" paragraph>
            Sistem Pakar Deteksi Dini Depresi <strong>"Ruang Pulih"</strong> adalah alat bantu
            <strong> deteksi dini (self-screening)</strong>, bukan pengganti diagnosis klinis oleh
            psikolog atau psikiater.
          </Typography>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Dengan menggunakan sistem ini, Anda menyetujui:
          </Typography>

          <Box component="ul" sx={{ pl: 2, '& li': { mb: 0.5 } }}>
            <li>Data gejala dan tingkat keyakinan yang Anda pilih akan <strong>disimpan</strong> untuk keperluan riwayat konsultasi pribadi Anda.</li>
            <li>Data Anda digunakan dalam bentuk <strong>agregat dan anonim</strong> untuk keperluan evaluasi sistem dan riset (tanpa bisa ditelusuri ke identitas Anda).</li>
            <li>Anda berhak <strong>menghapus</strong> riwayat konsultasi kapan saja melalui halaman Riwayat.</li>
            <li>Hasil yang diberikan <strong>bukan diagnosis medis resmi</strong> — konsultasikan dengan profesional untuk evaluasi lebih lanjut.</li>
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
            Jika Anda memiliki pikiran untuk menyakiti diri sendiri:
          </Typography>
          <Typography variant="body2" color="error">
            Segera hubungi layanan darurat atau hotline kesehatan mental terdekat.
            Jangan hanya mengandalkan sistem ini.
          </Typography>
        </DialogContentText>

        <FormControlLabel
          control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
          label="Saya telah membaca, memahami, dan menyetujui ketentuan di atas"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" disabled={!checked} onClick={handleAccept} fullWidth size="large">
          Setuju & Mulai Konsultasi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConsentDialog
