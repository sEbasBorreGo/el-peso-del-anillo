import type { Decision, Efectos, Evento, Medidores } from '../types'
import { MEDIDORES_INICIALES, decidir, eventoDeCasilla } from './logica'

export type Pantalla =
  | 'portada'
  | 'contexto'
  | 'ayuda'
  | 'tablero'
  | 'monte'
  | 'epilogo'
  | 'pergamino'
  | 'creditos'

export interface Estado {
  version: 1
  pantalla: Pantalla
  nombre: string
  pos: number
  medidores: Medidores
  decisiones: Decision[]
  ecosVistos: string[]
  espejos: Record<number, string>
  espejosVistos: number[]
  tiradas: number
  evento: Evento | null
  ultimosDeltas: Efectos | null
  reflexion: string
  sonido: boolean
  inicio: number | null
}

export const estadoInicial = (): Estado => ({
  version: 1,
  pantalla: 'portada',
  nombre: '',
  pos: 0,
  medidores: { ...MEDIDORES_INICIALES },
  decisiones: [],
  ecosVistos: [],
  espejos: {},
  espejosVistos: [],
  tiradas: 0,
  evento: null,
  ultimosDeltas: null,
  reflexion: '',
  sonido: false,
  inicio: null,
})

export type Accion =
  | { type: 'IR'; pantalla: Pantalla }
  | { type: 'NOMBRE'; nombre: string }
  | { type: 'LLEGAR'; casilla: number; tirada: boolean; encadenado?: boolean }
  | { type: 'DECIDIR'; encId: number; accionId: string; motivoId: string }
  | { type: 'CERRAR_EVENTO' }
  | { type: 'ECO_VISTO'; id: string }
  | { type: 'ESPEJO'; casilla: number; texto: string }
  | { type: 'LIMPIAR_DELTAS' }
  | { type: 'REFLEXION'; texto: string }
  | { type: 'SONIDO' }
  | { type: 'REINICIAR' }

export const resueltasDe = (s: Estado) => s.decisiones.map((d) => d.encId)

export function reducer(s: Estado, a: Accion): Estado {
  switch (a.type) {
    case 'IR':
      return {
        ...s,
        pantalla: a.pantalla,
        inicio: a.pantalla === 'tablero' && s.inicio === null ? Date.now() : s.inicio,
      }
    case 'NOMBRE':
      return { ...s, nombre: a.nombre.slice(0, 40) }
    case 'LLEGAR': {
      const ev = eventoDeCasilla(
        a.casilla,
        { medidores: s.medidores, resueltas: resueltasDe(s), ecosVistos: s.ecosVistos, espejosVistos: s.espejosVistos },
        a.encadenado,
      )
      return { ...s, pos: a.casilla, tiradas: s.tiradas + (a.tirada ? 1 : 0), evento: ev }
    }
    case 'DECIDIR': {
      if (s.decisiones.some((d) => d.encId === a.encId)) return s
      const { medidores, decision } = decidir(s.medidores, a.encId, a.accionId, a.motivoId)
      return { ...s, medidores, decisiones: [...s.decisiones, decision], ultimosDeltas: decision.deltas }
    }
    case 'CERRAR_EVENTO':
      return { ...s, evento: null, pantalla: s.evento?.tipo === 'meta' ? 'monte' : s.pantalla }
    case 'ECO_VISTO':
      return s.ecosVistos.includes(a.id) ? s : { ...s, ecosVistos: [...s.ecosVistos, a.id] }
    case 'ESPEJO': {
      const espejos = { ...s.espejos }
      const t = a.texto.trim().slice(0, 280)
      if (t) espejos[a.casilla] = t
      else delete espejos[a.casilla]
      return {
        ...s,
        espejos,
        espejosVistos: s.espejosVistos.includes(a.casilla) ? s.espejosVistos : [...s.espejosVistos, a.casilla],
      }
    }
    case 'LIMPIAR_DELTAS':
      return { ...s, ultimosDeltas: null }
    case 'REFLEXION':
      return { ...s, reflexion: a.texto.slice(0, 1200) }
    case 'SONIDO':
      return { ...s, sonido: !s.sonido }
    case 'REINICIAR':
      return { ...estadoInicial(), nombre: s.nombre, sonido: s.sonido }
  }
}

/* ---------- Guardado (si falla, el juego sigue sin guardar) ---------- */
const CLAVE = 'peso-del-anillo:v1'

export function cargar(): Estado {
  try {
    const raw = window.localStorage.getItem(CLAVE)
    if (!raw) return estadoInicial()
    const s = JSON.parse(raw) as Estado
    if (s.version !== 1 || typeof s.pos !== 'number') return estadoInicial()
    return { ...estadoInicial(), ...s, ultimosDeltas: null }
  } catch {
    return estadoInicial()
  }
}

export function guardar(s: Estado) {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(s))
  } catch {
    /* sin guardado: no pasa nada */
  }
}
