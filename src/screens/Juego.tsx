import { useCallback, useEffect, useRef, useState, type Dispatch } from 'react'
import Ayuda from '../components/Ayuda'
import Dado from '../components/Dado'
import EncrucijadaModal from '../components/EncrucijadaModal'
import EventoModal from '../components/EventoModal'
import { IconoAyuda, IconoReiniciar, IconoSonido } from '../components/Iconos'
import Medidores from '../components/Medidores'
import Modal from '../components/Modal'
import Tablero from '../components/Tablero'
import { tablero } from '../data/tablero'
import { type Accion, type Estado, resueltasDe } from '../lib/estado'
import { UMBRAL_DADO_LENTO, caraMaxima, mover, tirarDado } from '../lib/logica'
import { sonidos } from '../lib/sonido'

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Juego({ s, dispatch }: { s: Estado; dispatch: Dispatch<Accion> }) {
  const [displayPos, setDisplayPos] = useState(s.pos)
  const [animando, setAnimando] = useState(false)
  const [rodando, setRodando] = useState(false)
  const [cara, setCara] = useState(1)
  const [mensaje, setMensaje] = useState<string>(
    s.pos === 0 ? 'Estás en Bolsón Cerrado. Tira el dado para empezar el viaje.' : `Casilla ${s.pos}: ${tablero[s.pos].nombre}.`,
  )
  const [ayuda, setAyuda] = useState(false)
  const vivo = useRef(true)
  const resueltas = resueltasDe(s)
  const snd = useCallback((f: () => void) => s.sonido && f(), [s.sonido])

  useEffect(() => () => void (vivo.current = false), [])
  useEffect(() => {
    if (!animando) setDisplayPos(s.pos)
  }, [s.pos, animando])

  // Los deltas de los medidores se muestran un rato y luego se limpian
  useEffect(() => {
    if (!s.ultimosDeltas || s.evento) return
    const t = setTimeout(() => dispatch({ type: 'LIMPIAR_DELTAS' }), 2800)
    return () => clearTimeout(t)
  }, [s.ultimosDeltas, s.evento, dispatch])

  // Casillas de paisaje: no interrumpen, solo dejan una línea de ambiente
  useEffect(() => {
    const ev = s.evento
    if (ev?.tipo === 'paisaje') {
      const c = tablero[ev.casilla]
      setMensaje(`Casilla ${c.n} · ${c.nombre}${c.texto ? `: ${c.texto}` : '. Ya pasaste por aquí.'}`)
      dispatch({ type: 'CERRAR_EVENTO' })
    } else if (ev?.tipo === 'meta') {
      setMensaje('¡Llegaste al Monte del Destino!')
      const t = setTimeout(() => dispatch({ type: 'CERRAR_EVENTO' }), 900)
      return () => clearTimeout(t)
    } else if (ev?.tipo === 'encrucijada' || ev?.tipo === 'eco' || ev?.tipo === 'espejo') {
      snd(sonidos.campana)
    } else if (ev?.tipo === 'sendero' && ev.activo) snd(sonidos.sendero)
    else if (ev?.tipo === 'sombra' && ev.activo) snd(sonidos.sombra)
  }, [s.evento, dispatch, snd])

  const tirar = async () => {
    if (animando || s.evento) return
    setAnimando(true)
    setRodando(true)
    snd(sonidos.dado)
    const max = caraMaxima(s.medidores.peso)
    for (let i = 0; i < 7; i++) {
      setCara(1 + Math.floor(Math.random() * max))
      await esperar(70)
    }
    const d = tirarDado(s.medidores.peso)
    setCara(d)
    setRodando(false)
    const { destino, pasos, detenidoEnEncrucijada } = mover(s.pos, d, resueltas)
    setMensaje(
      detenidoEnEncrucijada
        ? `Sacaste ${d}, pero te detienes en la Encrucijada: es parada obligatoria.`
        : `Sacaste ${d}.`,
    )
    await esperar(250)
    for (const p of pasos) {
      if (!vivo.current) return
      setDisplayPos(p)
      snd(sonidos.paso)
      await esperar(280)
    }
    dispatch({ type: 'LLEGAR', casilla: destino, tirada: true })
    setAnimando(false)
  }

  const saltar = async (hasta: number) => {
    setAnimando(true)
    await esperar(150)
    setDisplayPos(hasta)
    await esperar(650)
    dispatch({ type: 'LLEGAR', casilla: hasta, tirada: false, encadenado: true })
    setMensaje(`Ahora estás en la casilla ${hasta}: ${tablero[hasta].nombre}.`)
    setAnimando(false)
  }

  const reiniciar = () => {
    if (window.confirm('¿Reiniciar el viaje? Se borra tu progreso.')) dispatch({ type: 'REINICIAR' })
  }

  const ev = s.evento
  const lento = s.medidores.peso >= UMBRAL_DADO_LENTO
  const decisionActual = ev?.tipo === 'encrucijada' ? s.decisiones.find((d) => d.encId === ev.id) : undefined

  return (
    <div className="mx-auto min-h-dvh max-w-xl">
      <header className="sticky top-0 z-30 border-b border-tinta/15 bg-[#f4ead5]/95 px-3 pb-2 pt-[max(.5rem,env(safe-area-inset-top))] backdrop-blur">
        <div className="mb-1.5 flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="titulo truncate text-[15px] leading-tight">El Peso del Anillo</p>
            <p className="text-[11px] font-semibold text-tinta2">
              Encrucijadas {resueltas.length}/8 · Casilla {displayPos}/35
            </p>
          </div>
          <button className="btn-icono" aria-label={s.sonido ? 'Silenciar sonido' : 'Activar sonido'} onClick={() => dispatch({ type: 'SONIDO' })}>
            <IconoSonido on={s.sonido} size={20} />
          </button>
          <button className="btn-icono" aria-label="Reiniciar viaje" onClick={reiniciar}>
            <IconoReiniciar size={20} />
          </button>
          <button className="btn-icono" aria-label="¿Cómo se juega? Abrir ayuda" onClick={() => setAyuda(true)}>
            <IconoAyuda size={22} />
          </button>
        </div>
        <Medidores m={s.medidores} deltas={ev ? null : s.ultimosDeltas} />
      </header>

      <main className="px-2 pb-44 pt-2">
        <Tablero pos={displayPos} resueltas={resueltas} medidores={s.medidores} />
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 px-2 text-xs text-tinta2" aria-label="Leyenda del mapa">
          <li><span className="mr-1 inline-block h-3 w-3 rotate-45 border border-[#6b4a07] bg-oroclaro align-middle" /> Encrucijada (parada)</li>
          <li><span className="mr-1 inline-block h-3 w-3 rounded-full border border-[#2f5a1e] bg-[#9cc97a] align-middle" /> Sendero (Hábitos ≥ 5)</li>
          <li><span className="mr-1 inline-block h-3 w-3 rounded-full bg-[#4a4440] align-middle" /> Sombra (Peso ≥ 6)</li>
          <li><span className="mr-1 inline-block h-3 w-3 rounded-full border border-[#6b4a07] bg-[#e9d6b0] align-middle" /> Eco de otro libro</li>
          <li><span className="mr-1 inline-block h-3 w-3 rounded-full border border-[#2f5f73] bg-[#cfe3ea] align-middle" /> Espejo de Galadriel</li>
          <li><span className="mr-1 inline-block h-3 w-3 rounded-full bg-brasa align-middle" /> Monte del Destino</li>
        </ul>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-tinta/15 bg-[#f4ead5]/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <button
            className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl bg-white/70 shadow-md transition active:scale-95 disabled:opacity-60"
            onClick={tirar}
            disabled={animando || !!ev}
            aria-label={`Tirar el dado${lento ? ' (solo de 1 a 3 porque el Anillo pesa mucho)' : ''}`}
            data-testid="dado"
          >
            <Dado valor={cara} rodando={rodando} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-snug" aria-live="polite" data-testid="mensaje">
              {mensaje}
            </p>
            {lento && <p className="mt-1 text-xs font-bold text-brasa">El Anillo pesa: tu dado solo saca de 1 a 3.</p>}
            <button className="btn-oro mt-2 min-h-[44px] w-full py-2" onClick={tirar} disabled={animando || !!ev} data-testid="tirar">
              {animando ? 'Caminando…' : 'Tirar el dado'}
            </button>
          </div>
        </div>
      </footer>

      {ev?.tipo === 'encrucijada' && (
        <EncrucijadaModal
          key={ev.id}
          encId={ev.id}
          medidores={s.medidores}
          decision={decisionActual}
          onDecidir={(accionId, motivoId) => dispatch({ type: 'DECIDIR', encId: ev.id, accionId, motivoId })}
          onCerrar={() => {
            dispatch({ type: 'CERRAR_EVENTO' })
            setMensaje('Mira cómo cambiaron tus medidores arriba. Tira el dado para seguir.')
          }}
        />
      )}
      {ev && (ev.tipo === 'eco' || ev.tipo === 'espejo' || ev.tipo === 'sendero' || ev.tipo === 'sombra') && (
        <EventoModal
          key={JSON.stringify(ev)}
          evento={ev}
          habitos={s.medidores.habitos}
          peso={s.medidores.peso}
          textoEspejo={ev.tipo === 'espejo' ? s.espejos[ev.casilla] : undefined}
          onEco={(id) => dispatch({ type: 'ECO_VISTO', id })}
          onEspejo={(casilla, texto) => dispatch({ type: 'ESPEJO', casilla, texto })}
          onSalto={saltar}
          onCerrar={() => {
            dispatch({ type: 'CERRAR_EVENTO' })
            if ((ev.tipo === 'sendero' || ev.tipo === 'sombra') && !ev.activo) setMensaje(ev.tipo === 'sendero' ? 'Sigues por el camino normal.' : 'Sigues adelante.')
          }}
        />
      )}
      {ayuda && (
        <Modal etiqueta="Ayuda: cómo se juega" onCerrar={() => setAyuda(false)}>
          <Ayuda />
          <button className="btn-primario mt-6 w-full" onClick={() => setAyuda(false)}>
            Volver al juego
          </button>
        </Modal>
      )}
    </div>
  )
}
