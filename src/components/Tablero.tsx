import { useEffect, useMemo, useRef } from 'react'
import { regiones, tablero } from '../data/tablero'
import { destinoSendero } from '../lib/logica'
import type { TipoCasilla } from '../types'
import { Ficha } from './Iconos'

const W = 360
const FILA = 124
const TOP = 70
const COLS = [50, 134, 226, 310]

/** Coordenadas de cada casilla: camino en zigzag de arriba (Comarca) hacia abajo (Mordor). */
export const puntos = tablero.map((_, i) => {
  const fila = Math.floor(i / 4)
  const col = i % 4
  const x = fila % 2 === 0 ? COLS[col] : COLS[3 - col]
  const y = TOP + fila * FILA + Math.sin(i * 1.7) * 14 + (col === 0 || col === 3 ? 0 : (fila % 2 ? -1 : 1) * 10)
  return { x, y }
})
export const ALTO = TOP + 8 * FILA + 120

function caminoSuave(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
}

function curva(a: { x: number; y: number }, b: { x: number; y: number }, lado: number) {
  const mx = (a.x + b.x) / 2 + lado * 40
  const my = (a.y + b.y) / 2
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

const estilo: Record<TipoCasilla, { fill: string; stroke: string; texto: string }> = {
  salida: { fill: '#4f7a3a', stroke: '#2b1b0d', texto: '#fff' },
  encrucijada: { fill: '#e3b341', stroke: '#6b4a07', texto: '#2b1b0d' },
  sendero: { fill: '#9cc97a', stroke: '#2f5a1e', texto: '#1c3311' },
  sombra: { fill: '#4a4440', stroke: '#1a1715', texto: '#fff' },
  eco: { fill: '#e9d6b0', stroke: '#6b4a07', texto: '#2b1b0d' },
  espejo: { fill: '#cfe3ea', stroke: '#2f5f73', texto: '#173341' },
  meta: { fill: '#a8321e', stroke: '#3a0d05', texto: '#fff' },
  paisaje: { fill: '#f7eedb', stroke: '#8a6a3a', texto: '#3b2614' },
}

const nombreTipo: Record<TipoCasilla, string> = {
  salida: 'Salida',
  encrucijada: 'Encrucijada',
  sendero: 'Sendero (atajo)',
  sombra: 'Sombra',
  eco: 'Eco de otro libro',
  espejo: 'Espejo de Galadriel',
  meta: 'Meta: Monte del Destino',
  paisaje: 'Paisaje',
}

function SimboloCasilla({ tipo }: { tipo: TipoCasilla }) {
  const c = estilo[tipo].texto
  switch (tipo) {
    case 'sendero':
      return <path d="M-5 6 C-5 -2 0 -6 7 -7 C7 1 2 6 -5 6 Z M-5 6 L3 -2" fill="none" stroke={c} strokeWidth="1.6" transform="translate(0,-4) scale(.8)" />
    case 'sombra':
      return (
        <g transform="translate(0,-5) scale(.7)">
          <path d="M-10 0 Q0 -8 10 0 Q0 8 -10 0Z" fill="none" stroke="#f0a35a" strokeWidth="1.8" />
          <ellipse cx="0" cy="0" rx="1.6" ry="4.5" fill="#f0a35a" />
        </g>
      )
    case 'eco':
      return <path d="M-8 -9 q4 -2 8 1 v9 q-4 -3 -8 -1z M8 -9 q-4 -2 -8 1 v9 q4 -3 8 -1z" fill="none" stroke={c} strokeWidth="1.4" />
    case 'espejo':
      return <ellipse cx="0" cy="-5" rx="5" ry="6.5" fill="#f4fbff" stroke={c} strokeWidth="1.4" />
    case 'meta':
      return <path d="M-9 0 L-2 -11 L1 -6 L3 -9 L9 0 Z" fill="#3a0d05" stroke="#ffb27a" strokeWidth="1" />
    case 'salida':
      return <path d="M-7 -1 a7 7 0 0 1 14 0 Z" fill="#e3b341" stroke="#2b1b0d" strokeWidth="1" />
    default:
      return null
  }
}

function Decoracion() {
  return (
    <g aria-hidden opacity=".75">
      {/* Comarca: colinas y árboles */}
      <path d="M0 40 Q60 0 120 32 T240 26 T360 36 V0 H0Z" fill="#a9c47f" opacity=".55" />
      {[[22, 128], [96, 120], [180, 125], [338, 130], [270, 128]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <rect x="-1.5" y="0" width="3" height="8" fill="#6b4a2a" />
          <circle cx="0" cy="-4" r="8" fill="#5f8f45" />
        </g>
      ))}
      <g transform="translate(18,26)">
        <path d="M0 14 a12 12 0 0 1 24 0Z" fill="#7a5a3a" />
        <circle cx="12" cy="9" r="3" fill="#e3b341" />
      </g>
      {/* Montañas nubladas (Moria) */}
      <path d="M0 350 L30 300 L55 335 L85 290 L120 345 Z" fill="#8a8178" opacity=".6" />
      <path d="M260 345 L295 295 L320 330 L345 300 L360 320 V345Z" fill="#8a8178" opacity=".6" />
      {/* El río */}
      <path d="M0 420 C80 440 120 400 200 430 S320 470 360 440" stroke="#7fb3c9" strokeWidth="6" fill="none" opacity=".6" />
      {/* Ciénagas */}
      {[[40, 600], [300, 580], [180, 640]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="22" ry="5" fill="#7d8f6a" opacity=".5" />
      ))}
      {/* Ithilien */}
      {[[30, 700], [330, 690]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="10" fill="#6f9a4f" />
          <circle cx="8" cy="4" r="7" fill="#6f9a4f" />
        </g>
      ))}
      {/* Torre de Cirith Ungol */}
      <path d="M335 800 l6 -40 l6 40z" fill="#4a4440" />
      {/* Mordor: volcán y ojo */}
      <path d="M220 1150 L290 1060 L304 1072 L318 1060 L360 1150 Z" fill="#4a3b36" />
      <path d="M294 1062 q8 -18 20 -4" stroke="#a8321e" strokeWidth="3" fill="none" className="brillo" />
      <g transform="translate(40,1050)">
        <path d="M-6 30 L-3 -10 L3 -10 L6 30Z" fill="#2b2522" />
        <path d="M-14 -16 Q0 -28 14 -16 Q0 -4 -14 -16Z" fill="#f08a3a" className="brillo" />
        <ellipse cx="0" cy="-16" rx="1.6" ry="5" fill="#2b1b0d" />
      </g>
    </g>
  )
}

export default function Tablero({
  pos,
  resueltas,
  medidores,
}: {
  pos: number
  resueltas: number[]
  medidores: { habitos: number; peso: number }
}) {
  const fichaRef = useRef<SVGGElement>(null)
  const d = useMemo(() => caminoSuave(puntos), [])

  useEffect(() => {
    const el = fichaRef.current
    if (!el) return
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect()
      const objetivo = window.scrollY + r.top - window.innerHeight * 0.45
      window.scrollTo({ top: Math.max(0, objetivo), behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(t)
  }, [pos])

  // Las franjas y nombres de región van en el espacio libre entre filas
  const hueco = (casilla: number) => (casilla === 0 ? 0 : TOP + (Math.floor(casilla / 4) - 0.5) * FILA)
  const fondo = regiones.map((r, i) => {
    const y1 = hueco(r.desde)
    const y2 = i === regiones.length - 1 ? ALTO : hueco(regiones[i + 1].desde)
    return { ...r, y1, y2, yTexto: r.desde === 0 ? 20 : y1 + 5 }
  })

  const p = puntos[pos]
  return (
    <svg viewBox={`0 0 ${W} ${ALTO}`} className="block h-auto w-full" role="img" aria-label={`Mapa del viaje. Estás en la casilla ${pos}: ${tablero[pos].nombre}.`}>
      <defs>
        <linearGradient id="mapa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe8c2" />
          <stop offset=".45" stopColor="#e6dcc0" />
          <stop offset=".75" stopColor="#c9bfb2" />
          <stop offset="1" stopColor="#9b8d86" />
        </linearGradient>
        <marker id="flechaVerde" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill="#2f5a1e" />
        </marker>
        <marker id="flechaSombra" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill="#2b2522" />
        </marker>
      </defs>
      <rect width={W} height={ALTO} fill="url(#mapa)" rx="14" />
      {fondo.map((r) => (
        <g key={r.nombre}>
          <rect x="0" y={r.y1} width={W} height={r.y2 - r.y1} fill={r.color} opacity=".35" />
          <text x={W / 2} y={r.yTexto} textAnchor="middle" className="font-titulo" fontSize="12" fontWeight="700" fill="#5c4128" stroke="#f4ead5" strokeWidth="3" paintOrder="stroke" letterSpacing="2">
            {r.nombre.toUpperCase()}
          </text>
        </g>
      ))}
      <Decoracion />

      {/* el camino */}
      <path d={d} fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" opacity=".35" />
      <path d={d} fill="none" stroke="#5c4128" strokeWidth="2" strokeDasharray="5 6" />

      {/* senderos y sombras */}
      {tablero
        .filter((c) => c.tipo === 'sendero' || c.tipo === 'sombra')
        .map((c) => {
          const sendero = c.tipo === 'sendero'
          const hasta = sendero ? destinoSendero(c.n, c.hasta!, resueltas) : c.hasta!
          const activo = sendero ? medidores.habitos >= 5 : medidores.peso >= 6
          return (
            <path
              key={c.n}
              d={curva(puntos[c.n], puntos[hasta], sendero ? -1 : 1)}
              fill="none"
              stroke={sendero ? '#2f5a1e' : '#2b2522'}
              strokeWidth={activo ? 3.5 : 2}
              strokeDasharray={sendero ? '2 5' : '8 5'}
              strokeLinecap="round"
              opacity={activo ? 0.9 : 0.35}
              markerEnd={`url(#${sendero ? 'flechaVerde' : 'flechaSombra'})`}
            />
          )
        })}

      {/* casillas */}
      {tablero.map((c) => {
        const { x, y } = puntos[c.n]
        const e = estilo[c.tipo]
        const actual = c.n === pos
        const titulo = `Casilla ${c.n}: ${nombreTipo[c.tipo]}${c.tipo === 'paisaje' || c.tipo === 'encrucijada' || c.tipo === 'meta' || c.tipo === 'salida' ? ` – ${c.nombre}` : ''}`
        return (
          <g key={c.n} transform={`translate(${x},${y})`} data-casilla={c.n}>
            <title>{titulo}</title>
            {actual && <circle r="27" fill="none" stroke="#b8860b" strokeWidth="3" className="latido" />}
            {c.tipo === 'encrucijada' ? (
              <path d="M0 -24 L24 0 L0 24 L-24 0Z" fill={e.fill} stroke={e.stroke} strokeWidth="2.5" />
            ) : c.tipo === 'meta' ? (
              <circle r="25" fill={e.fill} stroke={e.stroke} strokeWidth="3" />
            ) : (
              <circle r="19" fill={e.fill} stroke={e.stroke} strokeWidth="2" />
            )}
            <SimboloCasilla tipo={c.tipo} />
            <text
              y={c.tipo === 'paisaje' || c.tipo === 'encrucijada' ? 5 : 12}
              textAnchor="middle"
              fontSize={c.tipo === 'paisaje' || c.tipo === 'encrucijada' ? 14 : 10}
              fontWeight="800"
              fill={e.texto}
            >
              {c.n}
            </text>
            {(c.tipo === 'encrucijada' || c.tipo === 'meta') && (
              <text y={c.tipo === 'meta' ? 40 : 38} textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b2614" stroke="#f4ead5" strokeWidth="3" paintOrder="stroke">
                {c.nombre}
              </text>
            )}
          </g>
        )
      })}

      {/* la ficha */}
      <g
        ref={fichaRef}
        style={{ transform: `translate(${p.x}px, ${p.y - 26}px)`, transition: 'transform .26s ease-in-out' }}
        data-testid="ficha"
      >
        <Ficha />
      </g>
    </svg>
  )
}
