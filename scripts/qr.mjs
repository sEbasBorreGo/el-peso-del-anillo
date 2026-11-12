// Genera qr.png (raíz) y public/qr.png apuntando a la URL pública del juego.
// Uso: npm run qr -- https://tu-url.vercel.app
import QRCode from 'qrcode'

const url = process.argv[2]
if (!url) {
  console.error('Falta la URL. Uso: npm run qr -- https://tu-url')
  process.exit(1)
}
const opts = { width: 1024, margin: 2, color: { dark: '#2b1b0d', light: '#ffffff' } }
await QRCode.toFile('qr.png', url, opts)
await QRCode.toFile('public/qr.png', url, opts)
console.log('QR generado para', url)
