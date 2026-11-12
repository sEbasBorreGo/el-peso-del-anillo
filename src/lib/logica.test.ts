import { describe, expect, it } from 'vitest'
import { encrucijadas } from '../data/encrucijadas'
import { ecos } from '../data/ecos'
import { tablero, META } from '../data/tablero'
import {
  MEDIDORES_INICIALES,
  aplicarEfectos,
  barajar,
  calcularPerfil,
  caraMaxima,
  decidir,
  destinoSendero,
  eventoDeCasilla,
  mover,
  tirarDado,
} from './logica'
import { estadoInicial, reducer, resueltasDe, type Estado } from './estado'
import type { Decision, Marco } from '../types'

const base = (over: Partial<Parameters<typeof eventoDeCasilla>[1]> = {}) => ({
  medidores: { ...MEDIDORES_INICIALES },
  resueltas: [] as number[],
  ecosVistos: [] as string[],
  espejosVistos: [] as number[],
  ...over,
})

describe('datos', () => {
  it('tablero tiene 36 casillas numeradas en orden', () => {
    expect(tablero).toHaveLength(36)
    tablero.forEach((c, i) => expect(c.n).toBe(i))
  })
  it('las 8 encrucijadas están en las casillas acordadas y cada una tiene 3 acciones y 4 motivos (uno por marco)', () => {
    expect(encrucijadas.map((e) => e.casilla)).toEqual([3, 7, 11, 15, 19, 24, 29, 33])
    for (const e of encrucijadas) {
      expect(tablero[e.casilla].tipo).toBe('encrucijada')
      expect(e.acciones).toHaveLength(3)
      expect(e.motivos.map((m) => m.marco).sort()).toEqual(['hedonismo', 'relativismo', 'utilitarismo', 'virtud'])
      for (const a of e.acciones) expect(e.feedbackAcciones[a.id]).toBeTruthy()
    }
  })
  it('ecos en 2, 12, 22, 30', () => {
    expect(ecos.map((e) => e.casilla)).toEqual([2, 12, 22, 30])
    ecos.forEach((e) => expect(tablero[e.casilla].tipo).toBe('eco'))
  })
})

describe('movimiento', () => {
  it('avanza lo que dice el dado si no hay encrucijada en medio', () => {
    expect(mover(3, 3, [1]).destino).toBe(6)
  })
  it('se detiene en la encrucijada pendiente aunque el dado diga más', () => {
    expect(mover(0, 6, []).destino).toBe(3)
    expect(mover(5, 6, [1]).destino).toBe(7)
  })
  it('no se detiene en una encrucijada ya resuelta', () => {
    expect(mover(6, 3, [1, 2]).destino).toBe(9)
  })
  it('nunca pasa de la meta', () => {
    expect(mover(34, 6, [1, 2, 3, 4, 5, 6, 7, 8]).destino).toBe(META)
  })
  it('un sendero nunca se salta una encrucijada pendiente', () => {
    expect(destinoSendero(5, 9, [1])).toBe(7)
    expect(destinoSendero(21, 26, [1, 2, 3, 4, 5])).toBe(24)
    expect(destinoSendero(5, 9, [1, 2])).toBe(9)
  })
})

describe('senderos y sombras condicionales', () => {
  it('sendero activo solo con Hábitos ≥ 5', () => {
    const bajo = eventoDeCasilla(13, base({ resueltas: [1, 2, 3] }))
    expect(bajo).toMatchObject({ tipo: 'sendero', activo: false })
    const alto = eventoDeCasilla(13, base({ resueltas: [1, 2, 3], medidores: { ...MEDIDORES_INICIALES, habitos: 5 } }))
    expect(alto).toMatchObject({ tipo: 'sendero', activo: true, hasta: 15 })
  })
  it('sombra activa solo con Peso ≥ 6', () => {
    expect(eventoDeCasilla(10, base({ resueltas: [1, 2] }))).toMatchObject({ tipo: 'sombra', activo: false })
    expect(
      eventoDeCasilla(10, base({ resueltas: [1, 2], medidores: { ...MEDIDORES_INICIALES, peso: 6 } })),
    ).toMatchObject({ tipo: 'sombra', activo: true, hasta: 6 })
  })
  it('eco y espejo solo se muestran una vez', () => {
    expect(eventoDeCasilla(2, base())).toEqual({ tipo: 'eco', id: 'biles' })
    expect(eventoDeCasilla(2, base({ ecosVistos: ['biles'] }))).toEqual({ tipo: 'paisaje', casilla: 2 })
    expect(eventoDeCasilla(8, base({ espejosVistos: [8] }))).toEqual({ tipo: 'paisaje', casilla: 8 })
  })
})

describe('dado', () => {
  it('saca 1–6 normalmente y 1–3 si el Peso ≥ 8', () => {
    expect(caraMaxima(7)).toBe(6)
    expect(caraMaxima(8)).toBe(3)
    for (let i = 0; i < 500; i++) {
      const n = tirarDado(2)
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(6)
      const l = tirarDado(9)
      expect(l).toBeGreaterThanOrEqual(1)
      expect(l).toBeLessThanOrEqual(3)
    }
  })
})

describe('puntaje', () => {
  it('todo queda entre 0 y 10', () => {
    const { medidores } = aplicarEfectos({ ...MEDIDORES_INICIALES, peso: 10, etica: 0 }, { peso: 3, etica: -2 })
    expect(medidores.peso).toBe(10)
    expect(medidores.etica).toBe(0)
  })
  it('el motivo pesa más que la acción: misma acción, distinto motivo, distinto Peso', () => {
    const v = decidir(MEDIDORES_INICIALES, 1, 'a', 'v').medidores
    const h = decidir(MEDIDORES_INICIALES, 1, 'a', 'h').medidores
    expect(v.peso).toBeLessThan(h.peso)
    expect(v.libertad).toBeGreaterThan(h.libertad)
  })
  it('los motivos se pueden barajar sin perder ninguno', () => {
    const e = encrucijadas[0]
    expect(barajar(e.motivos).map((m) => m.id).sort()).toEqual(['h', 'r', 'u', 'v'])
  })
})

describe('perfil final', () => {
  const dec = (marcos: Marco[]): Decision[] => marcos.map((marco, i) => ({ encId: i + 1, accionId: 'a', motivoId: 'x', marco, deltas: {} }))
  it('Faramir: virtud casi siempre, Ética y Hábitos altos, Peso bajo', () => {
    expect(calcularPerfil({ libertad: 8, habitos: 9, autenticidad: 9, etica: 8, peso: 0 }, dec(Array(8).fill('virtud')))).toBe('faramir')
  })
  it('Sam: bastante virtud y Hábitos alto', () => {
    expect(
      calcularPerfil({ libertad: 5, habitos: 7, autenticidad: 6, etica: 4, peso: 4 }, dec(['virtud', 'virtud', 'virtud', 'virtud', 'hedonismo', 'utilitarismo', 'relativismo', 'hedonismo'])),
    ).toBe('sam')
  })
  it('Boromir: muchos motivos utilitaristas', () => {
    expect(
      calcularPerfil({ libertad: 4, habitos: 3, autenticidad: 3, etica: 1, peso: 8 }, dec(['utilitarismo', 'utilitarismo', 'utilitarismo', 'virtud', 'hedonismo', 'relativismo', 'virtud', 'virtud'])),
    ).toBe('boromir')
  })
  it('Bilbo: muchos motivos hedonistas o relativistas', () => {
    expect(
      calcularPerfil({ libertad: 3, habitos: 1, autenticidad: 1, etica: 3, peso: 9 }, dec(['hedonismo', 'relativismo', 'hedonismo', 'relativismo', 'virtud', 'virtud', 'utilitarismo', 'virtud'])),
    ).toBe('bilbo')
  })
  it('Frodo: mezcla', () => {
    expect(
      calcularPerfil({ libertad: 5, habitos: 4, autenticidad: 4, etica: 4, peso: 5 }, dec(['virtud', 'virtud', 'virtud', 'hedonismo', 'utilitarismo', 'utilitarismo', 'relativismo', 'virtud'])),
    ).toBe('frodo')
  })
})

/* ---------- Simulación de partidas completas usando el mismo reducer del juego ---------- */
function rngSemilla(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

function simular(seed: number, sesgo?: Marco) {
  const rng = rngSemilla(seed)
  let s: Estado = reducer(estadoInicial(), { type: 'IR', pantalla: 'tablero' })
  const visitadasEnc: number[] = []
  let guard = 0
  while (s.pantalla === 'tablero' && guard++ < 1000) {
    if (s.evento) {
      const ev = s.evento
      if (ev.tipo === 'encrucijada') {
        visitadasEnc.push(ev.id)
        const enc = encrucijadas.find((e) => e.id === ev.id)!
        const accion = enc.acciones[Math.floor(rng() * 3)].id
        const motivo = sesgo ? enc.motivos.find((m) => m.marco === sesgo)!.id : enc.motivos[Math.floor(rng() * 4)].id
        s = reducer(s, { type: 'DECIDIR', encId: ev.id, accionId: accion, motivoId: motivo })
        s = reducer(s, { type: 'CERRAR_EVENTO' })
      } else if (ev.tipo === 'eco') {
        s = reducer(reducer(s, { type: 'ECO_VISTO', id: ev.id }), { type: 'CERRAR_EVENTO' })
      } else if (ev.tipo === 'espejo') {
        s = reducer(reducer(s, { type: 'ESPEJO', casilla: ev.casilla, texto: '' }), { type: 'CERRAR_EVENTO' })
      } else if ((ev.tipo === 'sendero' || ev.tipo === 'sombra') && ev.activo) {
        s = reducer(s, { type: 'CERRAR_EVENTO' })
        s = reducer(s, { type: 'LLEGAR', casilla: ev.hasta, tirada: false, encadenado: true })
      } else {
        s = reducer(s, { type: 'CERRAR_EVENTO' })
      }
      continue
    }
    const dado = tirarDado(s.medidores.peso, rng)
    const { destino } = mover(s.pos, dado, resueltasDe(s))
    s = reducer(s, { type: 'LLEGAR', casilla: destino, tirada: true })
  }
  return { s, visitadasEnc }
}

describe('simulación de 200 partidas aleatorias', () => {
  it('todas terminan, pasan por las 8 encrucijadas en orden y duran menos de 60 tiradas', () => {
    let max = 0
    for (let i = 0; i < 200; i++) {
      const sesgo = (['hedonismo', 'utilitarismo', 'relativismo', 'virtud', undefined] as const)[i % 5]
      const { s, visitadasEnc } = simular(i + 1, sesgo)
      expect(s.pantalla).toBe('monte')
      expect(s.pos).toBe(META)
      expect(visitadasEnc).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
      expect(s.decisiones).toHaveLength(8)
      max = Math.max(max, s.tiradas)
      expect(s.tiradas).toBeLessThanOrEqual(60)
      for (const v of Object.values(s.medidores)) {
        expect(v).toBeGreaterThanOrEqual(0)
        expect(v).toBeLessThanOrEqual(10)
      }
    }
    expect(max).toBeGreaterThan(0)
  })
})
