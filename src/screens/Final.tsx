import { useEffect, useRef, useState, type Dispatch } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'
import { EtiquetaTema } from '../components/EncrucijadaModal'
import { IconoCopiar, IconoDescargar, IconoFlecha, IconoMontana, IconoReiniciar, colorMedidor, iconoMedidor } from '../components/Iconos'
import { encrucijadaPorId } from '../data/encrucijadas'
import { ecos } from '../data/ecos'
import { espejos } from '../data/tablero'
import { creditos, epilogo, marcos, montaña, perfiles, temas, vidaLograda } from '../data/textos'
import type { Accion, Estado } from '../lib/estado'
import { calcularPerfil } from '../lib/logica'
import type { MedidorId, TemaId } from '../types'

const MIN_REFLEXION = 20

export function Monte({ s, dispatch }: { s: Estado; dispatch: Dispatch<Accion> }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 px-5 py-8 text-center">
      <div className="aparecer space-y-5">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#3a0d05] text-[#ffb27a]">
          <IconoMontana size={46} />
        </div>
        <h1 className="titulo text-3xl">{montaña.titulo}</h1>
        <p className="text-[17px] leading-relaxed">{montaña.texto}</p>
        <p className="text-sm text-tinta2">
          Llegaste con el Anillo pesando {s.medidores.peso}/10, después de {s.tiradas} tiradas.
        </p>
        <button className="btn-primario w-full" onClick={() => dispatch({ type: 'IR', pantalla: 'epilogo' })} data-testid="a-epilogo">
          Volver a casa <IconoFlecha size={18} />
        </button>
      </div>
    </main>
  )
}

export function Epilogo({ dispatch }: { dispatch: Dispatch<Accion> }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 px-5 py-8">
      <div className="papel aparecer space-y-4 p-6">
        <p className="text-xs font-extrabold uppercase tracking-wider text-comarca">Epílogo · La Comarca</p>
        <h1 className="titulo text-3xl">De vuelta a casa</h1>
        {epilogo.map((p, i) => (
          <p key={i} className={`text-[17px] leading-relaxed ${i === epilogo.length - 1 ? 'font-bold' : ''}`}>
            {p}
          </p>
        ))}
      </div>
      <button className="btn-oro w-full text-lg" onClick={() => dispatch({ type: 'IR', pantalla: 'pergamino' })} data-testid="a-pergamino">
        Ver mi Pergamino de la vida lograda <IconoFlecha />
      </button>
    </main>
  )
}

const ordenMedidores: MedidorId[] = ['libertad', 'habitos', 'autenticidad', 'etica', 'peso']

function textoPlano(s: Estado) {
  const p = perfiles[calcularPerfil(s.medidores, s.decisiones)]
  const lineas = [
    `PERGAMINO DE ${s.nombre ? s.nombre.toUpperCase() : 'LA VIDA LOGRADA'}`,
    'El Peso del Anillo — un viaje de decisiones',
    '',
    `Libertad ${s.medidores.libertad}/10 · Hábitos ${s.medidores.habitos}/10 · Autenticidad ${s.medidores.autenticidad}/10 · Ética ${s.medidores.etica}/10 · Peso del Anillo ${s.medidores.peso}/10`,
    '',
    `Tu camino se pareció al de ${p.nombre}: ${p.frase}`,
    '',
    'Mis decisiones:',
    ...s.decisiones.map((d) => {
      const e = encrucijadaPorId(d.encId)
      const a = e.acciones.find((x) => x.id === d.accionId)!
      const m = e.motivos.find((x) => x.id === d.motivoId)!
      return `${d.encId}. ${e.titulo}: ${a.texto.replace(/[“”]/g, '')} — porque ${m.texto.replace(/^Porque /, '').toLowerCase()} (${marcos[d.marco].nombre} → ${e.temas.map((t) => temas[t].corto).join(', ')})`
    }),
    '',
    ...Object.entries(s.espejos).flatMap(([c, t]) => [`Espejo: ${espejos[Number(c)].pregunta}`, `→ ${t}`, '']),
    `${vidaLograda.titulo}`,
    vidaLograda.texto,
    '',
    `Mi respuesta: ${s.reflexion.trim()}`,
  ]
  return lineas.join('\n')
}

async function copiar(texto: string) {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = texto
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

export function Pergamino({ s, dispatch }: { s: Estado; dispatch: Dispatch<Accion> }) {
  const [listo, setListo] = useState(false)
  const [aviso, setAviso] = useState('')
  const [generando, setGenerando] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const perfilId = calcularPerfil(s.medidores, s.decisiones)
  const perfil = perfiles[perfilId]
  const largo = s.reflexion.trim().length
  const ecosFaltantes = ecos.filter((e) => !s.ecosVistos.includes(e.id))

  useEffect(() => {
    if (listo) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [listo])

  const descargar = async () => {
    if (!ref.current) return
    setGenerando(true)
    setAviso('')
    try {
      const opciones = { pixelRatio: 2, backgroundColor: '#f7eedb', cacheBust: true }
      let url: string
      try {
        url = await toPng(ref.current, opciones)
      } catch {
        url = await toPng(ref.current, { ...opciones, skipFonts: true })
      }
      const a = document.createElement('a')
      a.href = url
      a.download = `pergamino-${(s.nombre || 'vida-lograda').toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-')}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setAviso('Listo: tu pergamino se descargó como imagen.')
    } catch {
      setAviso('No se pudo crear la imagen en este navegador. Usa “Copiar texto” o toma un pantallazo.')
    } finally {
      setGenerando(false)
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      {!listo && (
        <section className="papel aparecer space-y-4 p-5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-oro">Último paso</p>
          <h1 className="titulo text-2xl leading-tight">{vidaLograda.titulo}</h1>
          <p className="leading-relaxed">{vidaLograda.texto}</p>
          <label className="block space-y-2">
            <span className="block font-bold leading-snug">{vidaLograda.preguntaFinal}</span>
            <textarea
              className="min-h-[140px] w-full rounded-xl border-2 border-[#c9ad7a] bg-[#fbf5e8] p-3 text-[16px] outline-none focus:border-tinta"
              value={s.reflexion}
              onChange={(e) => dispatch({ type: 'REFLEXION', texto: e.target.value })}
              placeholder="Escribe con tus palabras. Esto queda impreso en tu pergamino."
              maxLength={1200}
              data-testid="reflexion"
              aria-describedby="min-reflexion"
            />
            <span id="min-reflexion" className={`block text-xs ${largo >= MIN_REFLEXION ? 'text-comarca' : 'text-tinta2'}`}>
              {largo >= MIN_REFLEXION ? 'Listo, ya puedes generar tu pergamino.' : `Escribe al menos ${MIN_REFLEXION} caracteres (llevas ${largo}).`}
            </span>
          </label>
          <button className="btn-oro w-full text-lg" disabled={largo < MIN_REFLEXION} onClick={() => setListo(true)} data-testid="generar">
            Generar mi pergamino
          </button>
        </section>
      )}

      {listo && (
        <>
          <div ref={ref} className="papel space-y-5 p-5 sm:p-7" data-testid="pergamino">
            <header className="border-b-2 border-double border-tinta/40 pb-3 text-center">
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-tinta2">El Peso del Anillo</p>
              <h1 className="titulo text-2xl leading-tight sm:text-3xl">Pergamino de {s.nombre || 'la vida lograda'}</h1>
            </header>

            <section className="space-y-2">
              {ordenMedidores.map((id) => {
                const Icono = iconoMedidor[id]
                const nombre = id === 'peso' ? 'Peso del Anillo' : temas[id as TemaId].corto
                return (
                  <div key={id} className="flex items-center gap-2">
                    <span style={{ color: colorMedidor[id] }}>
                      <Icono size={20} />
                    </span>
                    <span className="w-28 shrink-0 text-sm font-bold">{nombre}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-tinta/15">
                      <div className="h-full rounded-full" style={{ width: `${s.medidores[id] * 10}%`, background: colorMedidor[id] }} />
                    </div>
                    <span className="w-10 text-right text-sm font-extrabold tabular-nums">{s.medidores[id]}/10</span>
                  </div>
                )
              })}
            </section>

            <section className="rounded-xl border-2 border-oro/60 bg-[#fdf6dd] p-4" data-perfil={perfilId}>
              <p className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Tu camino se pareció al de…</p>
              <h2 className="titulo text-2xl">{perfil.nombre}</h2>
              <p className="font-bold">{perfil.frase}</p>
              <p className="mt-2 text-sm"><strong>Luz:</strong> {perfil.luz}</p>
              <p className="text-sm"><strong>Sombra:</strong> {perfil.sombra}</p>
            </section>

            <section className="space-y-2">
              <h2 className="titulo text-lg">Tus 8 decisiones</h2>
              <ol className="space-y-2.5">
                {s.decisiones.map((d) => {
                  const e = encrucijadaPorId(d.encId)
                  const a = e.acciones.find((x) => x.id === d.accionId)!
                  const m = e.motivos.find((x) => x.id === d.motivoId)!
                  return (
                    <li key={d.encId} className="text-sm leading-snug">
                      <strong>{d.encId}. {e.titulo}{/[?.!]$/.test(e.titulo) ? '' : '.'}</strong> Elegiste «{a.texto.replace(/[“”]/g, '').replace(/\.$/, '')}» porque{' '}
                      «{m.texto.replace(/^Porque /, '').replace(/\.$/, '')}» → <span className="font-bold">{marcos[d.marco].nombre}</span>, y eso tiene que ver con{' '}
                      {e.temas.map((t) => temas[t].corto).join(', ')}.
                    </li>
                  )
                })}
              </ol>
            </section>

            {Object.keys(s.espejos).length > 0 && (
              <section className="space-y-2">
                <h2 className="titulo text-lg">Lo que viste en el Espejo</h2>
                {Object.entries(s.espejos).map(([c, t]) => (
                  <div key={c} className="rounded-xl bg-[#eaf4f8] p-3 text-sm">
                    <p className="font-bold text-[#2f5f73]">{espejos[Number(c)].pregunta}</p>
                    <p className="mt-1 italic">“{t}”</p>
                  </div>
                ))}
              </section>
            )}

            <section className="space-y-2">
              <h2 className="titulo text-lg">{vidaLograda.titulo}</h2>
              <p className="text-sm leading-relaxed">{vidaLograda.texto}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(temas) as TemaId[]).map((t) => (
                  <EtiquetaTema key={t} id={t} />
                ))}
              </div>
            </section>

            <section className="rounded-xl border-l-4 border-tinta bg-tinta/5 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Mi respuesta</p>
              <p className="mt-1 whitespace-pre-wrap text-[15px] font-semibold leading-relaxed">{s.reflexion.trim()}</p>
            </section>

            <footer className="text-center text-[11px] text-tinta2">
              {creditos.proyecto} · {creditos.universidad}
            </footer>
          </div>

          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-oro" onClick={descargar} disabled={generando} data-testid="descargar">
                <IconoDescargar size={20} /> {generando ? 'Creando…' : 'Descargar'}
              </button>
              <button
                className="btn-secundario"
                onClick={async () => setAviso((await copiar(textoPlano(s))) ? 'Texto copiado.' : 'No se pudo copiar en este navegador.')}
              >
                <IconoCopiar size={20} /> Copiar texto
              </button>
            </div>
            <p className="min-h-[1.25rem] text-center text-sm font-semibold" aria-live="polite">
              {aviso}
            </p>
            <button className="btn-secundario w-full" onClick={() => setListo(false)}>
              Editar mi respuesta
            </button>
            <button
              className="btn-primario w-full"
              onClick={() => {
                dispatch({ type: 'REINICIAR' })
                dispatch({ type: 'IR', pantalla: 'tablero' })
              }}
            >
              <IconoReiniciar size={20} /> Jugar otra vez
            </button>
            <p className="text-center text-sm text-tinta2">Prueba con otros motivos y mira cómo cambia tu camino.</p>
          </div>

          {ecosFaltantes.length > 0 && (
            <section className="mt-6 space-y-3">
              <h2 className="titulo text-xl">Ecos que no escuchaste en el camino</h2>
              {ecosFaltantes.map((e) => (
                <article key={e.id} className="papel space-y-2 p-4">
                  <h3 className="titulo text-lg leading-tight">
                    {e.libro} <span className="font-texto text-sm font-bold text-tinta2">· {e.autor}</span>
                  </h3>
                  <p className="text-sm leading-relaxed">{e.historia}</p>
                  <p className="text-sm leading-relaxed"><strong>Eco:</strong> {e.conexion}</p>
                  <p className="text-sm font-semibold text-comarca">{e.pregunta}</p>
                </article>
              ))}
            </section>
          )}

          <div className="mt-6 text-center">
            <button className="btn underline" onClick={() => dispatch({ type: 'IR', pantalla: 'creditos' })}>
              Créditos y QR del juego
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export function useQR(texto: string, tam = 512) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    QRCode.toDataURL(texto, { width: tam, margin: 2, color: { dark: '#2b1b0d', light: '#ffffff' } })
      .then(setUrl)
      .catch(() => setUrl(''))
  }, [texto, tam])
  return url
}

export const urlDelJuego = () => `${window.location.origin}${window.location.pathname}`

export function Creditos({ dispatch }: { dispatch: Dispatch<Accion> }) {
  const qr = useQR(urlDelJuego(), 360)
  return (
    <main className="mx-auto max-w-md space-y-5 px-5 py-8">
      <div className="papel space-y-3 p-6">
        <h1 className="titulo text-3xl">Créditos</h1>
        <p className="font-bold">{creditos.proyecto}</p>
        <p>{creditos.universidad}</p>
        <p><strong>Libro:</strong> {creditos.libro}</p>
        <p>{creditos.ecos}</p>
        <p><strong>Equipo:</strong> {creditos.equipo}</p>
        <p className="text-sm text-tinta2">{creditos.aviso}</p>
      </div>
      <div className="papel flex flex-col items-center gap-3 p-6">
        <h2 className="titulo text-xl">Juega desde tu celular</h2>
        {qr && <img src={qr} alt={`Código QR que abre el juego: ${urlDelJuego()}`} width={240} height={240} className="rounded-lg" />}
        <p className="break-all text-center text-sm">{urlDelJuego()}</p>
        <a className="btn-secundario" href="#/qr">Ver QR en grande</a>
      </div>
      <button className="btn-primario w-full" onClick={() => dispatch({ type: 'IR', pantalla: 'portada' })}>
        Volver al inicio
      </button>
    </main>
  )
}

export function PantallaQR() {
  const url = urlDelJuego()
  const qr = useQR(url, 900)
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white p-6 text-center">
      <h1 className="titulo text-3xl sm:text-5xl">El Peso del Anillo</h1>
      <p className="titulo text-lg text-tinta2 sm:text-2xl">un viaje de decisiones</p>
      {qr && <img src={qr} alt={`Código QR que abre el juego: ${url}`} className="aspect-square w-full max-w-[min(80vw,70vh)]" />}
      <p className="break-all text-lg font-bold">{url}</p>
      <p className="text-sm text-tinta2">Escanea con la cámara del celular · 10 a 15 minutos</p>
      <a className="btn-secundario" href="#/">Ir al juego</a>
    </main>
  )
}
