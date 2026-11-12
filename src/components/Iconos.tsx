import type { SVGProps } from 'react'
import type { MedidorId } from '../types'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
})

export const IconoAnillo = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <ellipse cx="12" cy="13" rx="8" ry="6.5" stroke="#b8860b" strokeWidth="3" />
    <ellipse cx="12" cy="13" rx="8" ry="6.5" stroke="#fff3c4" strokeWidth=".8" strokeDasharray="1.5 2.5" />
  </svg>
)
export const IconoPaloma = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 13c3 0 5-1 7-4 1 3 4 5 8 5l3-2-1 4c-2 3-6 4-10 3l-4 2 1-3c-2-1-3-3-4-5z" />
    <path d="M10 9c-1-2-1-4 0-6 2 1 3 3 3 6" />
  </svg>
)
export const IconoBrote = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21v-9" />
    <path d="M12 12c0-4 3-7 8-7 0 5-3 7-8 7z" />
    <path d="M12 14c0-3-2-6-7-6 0 4 3 6 7 6z" />
    <path d="M7 21h10" />
  </svg>
)
export const IconoEspejo = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <ellipse cx="12" cy="9.5" rx="6" ry="7.5" />
    <path d="M9 7c1-2 3-2.5 4-2.5" />
    <path d="M12 17v4M9 21h6" />
  </svg>
)
export const IconoBalanza = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v18M7 21h10M4 7h16" />
    <path d="M4 7l-2.5 6a3 3 0 005 0zM20 7l-2.5 6a3 3 0 005 0z" />
  </svg>
)
export const IconoHoja = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z" />
    <path d="M5 19L14 10" />
  </svg>
)
export const IconoOjo = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <ellipse cx="12" cy="12" rx="1.6" ry="4.5" fill="currentColor" />
  </svg>
)
export const IconoLibro = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 5c3-1 6-1 9 1v14c-3-2-6-2-9-1z" />
    <path d="M21 5c-3-1-6-1-9 1v14c3-2 6-2 9-1z" />
  </svg>
)
export const IconoRombo = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2l9 10-9 10-9-10z" />
    <path d="M12 7v5l3 3" />
  </svg>
)
export const IconoMontana = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2 21l8-14 3 5 2-3 7 12z" />
    <path d="M9 5c0-2 2-2 2-4M12 5c1-1 2-1 2-3" stroke="#a8321e" />
  </svg>
)
export const IconoDado = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="8" cy="8" r="1.3" fill="currentColor" />
    <circle cx="16" cy="16" r="1.3" fill="currentColor" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
  </svg>
)
export const IconoPergamino = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 3h11a2 2 0 012 2v12" />
    <path d="M6 3a2 2 0 00-2 2v1h4V5a2 2 0 00-2-2zM8 5v14a2 2 0 002 2h10a2 2 0 002-2v-2H10v2a2 2 0 01-2 2" />
    <path d="M11 8h5M11 11h5M11 14h3" />
  </svg>
)
export const IconoAyuda = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.5" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </svg>
)
export const IconoSonido = ({ on, size, ...p }: P & { on: boolean }) => (
  <svg {...base(size)} {...p}>
    <path d="M4 9h4l5-4v14l-5-4H4z" />
    {on ? <path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11" /> : <path d="M17 9l5 6M22 9l-5 6" />}
  </svg>
)
export const IconoReiniciar = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4v6h6" />
    <path d="M5 15a8 8 0 102-8.5L4 10" />
  </svg>
)
export const IconoFlecha = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconoCerrar = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const IconoQR = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
  </svg>
)
export const IconoDescargar = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
  </svg>
)
export const IconoCopiar = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" />
  </svg>
)

export const iconoMedidor: Record<MedidorId, (p: P) => JSX.Element> = {
  libertad: IconoPaloma,
  habitos: IconoBrote,
  autenticidad: IconoEspejo,
  etica: IconoBalanza,
  peso: IconoAnillo,
}

export const colorMedidor: Record<MedidorId, string> = {
  libertad: '#2f6690',
  habitos: '#4f7a3a',
  autenticidad: '#7a4b8c',
  etica: '#9a5b14',
  peso: '#b8860b',
}

/** La ficha del jugador: un hobbit pequeñito con capa y el anillo. */
export const Ficha = () => (
  <g aria-hidden>
    <ellipse cx="0" cy="17" rx="12" ry="3.5" fill="rgba(0,0,0,.25)" />
    <path d="M-9 15 Q-10 -2 0 -4 Q10 -2 9 15 Z" fill="#4f7a3a" stroke="#2b1b0d" strokeWidth="1.5" />
    <circle cx="0" cy="-9" r="7" fill="#f2cfa0" stroke="#2b1b0d" strokeWidth="1.5" />
    <path d="M-7 -11 Q-6 -18 0 -17 Q7 -18 7 -10 Q4 -14 0 -13 Q-4 -14 -7 -11Z" fill="#6b3e1d" />
    <circle cx="-2.4" cy="-8.5" r=".9" fill="#2b1b0d" />
    <circle cx="2.4" cy="-8.5" r=".9" fill="#2b1b0d" />
    <path d="M-5 -2 Q0 4 5 -2" fill="none" stroke="#7a5a10" strokeWidth=".9" />
    <circle cx="0" cy="3" r="3" fill="none" stroke="#e3b341" strokeWidth="2" />
  </g>
)
