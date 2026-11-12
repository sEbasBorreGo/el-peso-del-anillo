export type TemaId = 'libertad' | 'habitos' | 'autenticidad' | 'etica'
export type Marco = 'hedonismo' | 'utilitarismo' | 'relativismo' | 'virtud'
export type MedidorId = TemaId | 'peso'

export type Medidores = Record<MedidorId, number>
export type Efectos = Partial<Record<MedidorId, number>>

export interface Accion {
  id: string
  texto: string
  efectos: Efectos
}

export interface Motivo {
  id: string
  texto: string
  marco: Marco
}

export interface Encrucijada {
  id: number
  casilla: number
  lugar: string
  titulo: string
  personaje: string
  /** El primer tema es el principal: es el que sube con un motivo de virtud. */
  temas: TemaId[]
  /** Etiqueta extra opcional (ej. "Liderazgo ético"). */
  subtema?: string
  escena: string
  acciones: Accion[]
  motivos: Motivo[]
  feedbackAcciones: Record<string, string>
  feedbackMotivos: Record<Marco, string>
  quepaso: string
  tuVida: string
}

export interface Eco {
  id: string
  casilla: number
  libro: string
  autor: string
  temas: string
  historia: string
  conexion: string
  pregunta: string
}

export type TipoCasilla =
  | 'salida'
  | 'encrucijada'
  | 'sendero'
  | 'sombra'
  | 'eco'
  | 'espejo'
  | 'meta'
  | 'paisaje'

export interface Casilla {
  n: number
  tipo: TipoCasilla
  nombre: string
  texto?: string
  /** Para senderos y sombras: a qué casilla llevan. */
  hasta?: number
}

export interface Decision {
  encId: number
  accionId: string
  motivoId: string
  marco: Marco
  deltas: Efectos
}

export type Evento =
  | { tipo: 'encrucijada'; id: number }
  | { tipo: 'eco'; id: string }
  | { tipo: 'espejo'; casilla: number }
  | { tipo: 'sendero'; desde: number; hasta: number; activo: boolean }
  | { tipo: 'sombra'; desde: number; hasta: number; activo: boolean }
  | { tipo: 'paisaje'; casilla: number }
  | { tipo: 'meta' }
