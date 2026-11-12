import { encrucijadas, encrucijadaPorCasilla, encrucijadaPorId } from '../data/encrucijadas'
import { ecoPorCasilla } from '../data/ecos'
import { META, tablero } from '../data/tablero'
import type { Decision, Efectos, Encrucijada, Evento, Marco, Medidores, MedidorId } from '../types'

export const MEDIDORES_INICIALES: Medidores = { libertad: 3, habitos: 3, autenticidad: 3, etica: 3, peso: 2 }
export const UMBRAL_SENDERO = 5 // Hábitos ≥ 5
export const UMBRAL_SOMBRA = 6 // Peso ≥ 6
export const UMBRAL_DADO_LENTO = 8 // Peso ≥ 8 → dado 1–3

export const clamp = (v: number, min = 0, max = 10) => Math.max(min, Math.min(max, v))

/** Casillas de encrucijada que todavía no se han resuelto, en orden. */
export function encrucijadaPendienteDespues(pos: number, resueltas: number[]): number | null {
  const e = encrucijadas.find((x) => x.casilla > pos && !resueltas.includes(x.id))
  return e ? e.casilla : null
}

export function caraMaxima(peso: number) {
  return peso >= UMBRAL_DADO_LENTO ? 3 : 6
}

export function tirarDado(peso: number, rng: () => number = Math.random) {
  return 1 + Math.floor(rng() * caraMaxima(peso))
}

/**
 * Mueve la ficha: avanza `dado` casillas, pero se detiene en la próxima
 * Encrucijada pendiente (puesto de control) y nunca pasa de la meta.
 */
export function mover(pos: number, dado: number, resueltas: number[]) {
  let destino = Math.min(pos + dado, META)
  const parada = encrucijadaPendienteDespues(pos, resueltas)
  if (parada !== null && parada <= destino) destino = parada
  const pasos: number[] = []
  for (let i = pos + 1; i <= destino; i++) pasos.push(i)
  return { destino, pasos, detenidoEnEncrucijada: parada === destino && destino < pos + dado }
}

/** A dónde lleva de verdad un sendero: nunca se salta una Encrucijada pendiente. */
export function destinoSendero(desde: number, hasta: number, resueltas: number[]) {
  const parada = encrucijadaPendienteDespues(desde, resueltas)
  if (parada !== null && parada <= hasta) return parada
  return hasta
}

export interface EstadoCasilla {
  medidores: Medidores
  resueltas: number[]
  ecosVistos: string[]
  espejosVistos: number[]
}

/** Qué pasa al caer en una casilla. `encadenado` = se llegó por un sendero o una sombra. */
export function eventoDeCasilla(casilla: number, e: EstadoCasilla, encadenado = false): Evento | null {
  const c = tablero[casilla]
  switch (c.tipo) {
    case 'meta':
      return { tipo: 'meta' }
    case 'encrucijada': {
      const enc = encrucijadaPorCasilla(casilla)!
      if (!e.resueltas.includes(enc.id)) return { tipo: 'encrucijada', id: enc.id }
      return encadenado ? null : { tipo: 'paisaje', casilla }
    }
    case 'eco': {
      const eco = ecoPorCasilla(casilla)!
      if (!e.ecosVistos.includes(eco.id)) return { tipo: 'eco', id: eco.id }
      return encadenado ? null : { tipo: 'paisaje', casilla }
    }
    case 'espejo':
      if (!e.espejosVistos.includes(casilla)) return { tipo: 'espejo', casilla }
      return encadenado ? null : { tipo: 'paisaje', casilla }
    case 'sendero': {
      const hasta = destinoSendero(casilla, c.hasta!, e.resueltas)
      return { tipo: 'sendero', desde: casilla, hasta, activo: e.medidores.habitos >= UMBRAL_SENDERO }
    }
    case 'sombra':
      return { tipo: 'sombra', desde: casilla, hasta: c.hasta!, activo: e.medidores.peso >= UMBRAL_SOMBRA }
    default:
      return encadenado ? null : { tipo: 'paisaje', casilla }
  }
}

/** Puntos que da el MOTIVO (lo que más pesa en el juego). */
export function efectosDelMotivo(enc: Encrucijada, marco: Marco): Efectos {
  const principal = enc.temas[0]
  switch (marco) {
    case 'virtud': {
      const ef: Efectos = { [principal]: 2, peso: -1 }
      // +1 Autenticidad (fiel a quien quieres ser) y +1 Hábitos (lo que repites te forma)
      ef.autenticidad = (ef.autenticidad ?? 0) + 1
      ef.habitos = (ef.habitos ?? 0) + 1
      return ef
    }
    case 'hedonismo':
      return { peso: 1, habitos: -1 }
    case 'utilitarismo':
      return { peso: 1, etica: -1 }
    case 'relativismo':
      return { peso: 1, autenticidad: -1 }
  }
}

export function sumarEfectos(...lista: Efectos[]): Efectos {
  const total: Efectos = {}
  for (const ef of lista) {
    for (const [k, v] of Object.entries(ef) as [MedidorId, number][]) total[k] = (total[k] ?? 0) + v
  }
  return total
}

export function aplicarEfectos(m: Medidores, ef: Efectos): { medidores: Medidores; deltas: Efectos } {
  const nuevo = { ...m }
  const deltas: Efectos = {}
  for (const [k, v] of Object.entries(ef) as [MedidorId, number][]) {
    const antes = nuevo[k]
    nuevo[k] = clamp(antes + v)
    if (nuevo[k] !== antes) deltas[k] = nuevo[k] - antes
  }
  return { medidores: nuevo, deltas }
}

export function decidir(m: Medidores, encId: number, accionId: string, motivoId: string) {
  const enc = encrucijadaPorId(encId)
  const accion = enc.acciones.find((a) => a.id === accionId)!
  const motivo = enc.motivos.find((x) => x.id === motivoId)!
  const { medidores, deltas } = aplicarEfectos(m, sumarEfectos(accion.efectos, efectosDelMotivo(enc, motivo.marco)))
  const decision: Decision = { encId, accionId, motivoId, marco: motivo.marco, deltas }
  return { medidores, decision }
}

export type PerfilId = 'sam' | 'faramir' | 'frodo' | 'boromir' | 'bilbo'

export function contarMarcos(decisiones: Decision[]): Record<Marco, number> {
  const c: Record<Marco, number> = { hedonismo: 0, utilitarismo: 0, relativismo: 0, virtud: 0 }
  for (const d of decisiones) c[d.marco]++
  return c
}

/** A qué personaje se pareció tu camino. */
export function calcularPerfil(m: Medidores, decisiones: Decision[]): PerfilId {
  const c = contarMarcos(decisiones)
  if (c.virtud >= 6 && m.etica >= 7 && m.habitos >= 7 && m.peso <= 2) return 'faramir'
  if (c.virtud >= 4 && m.habitos >= 6) return 'sam'
  if (c.utilitarismo >= 3 && c.utilitarismo >= c.hedonismo && c.utilitarismo >= c.relativismo) return 'boromir'
  if (c.hedonismo + c.relativismo >= 4) return 'bilbo'
  return 'frodo'
}

/** Baraja (Fisher–Yates) para mostrar los motivos en orden aleatorio. */
export function barajar<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
