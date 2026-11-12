import { useState } from 'react'
import { ecoPorId } from '../data/ecos'
import { espejos, tablero } from '../data/tablero'
import type { Evento } from '../types'
import { IconoEspejo, IconoFlecha, IconoHoja, IconoLibro, IconoOjo } from './Iconos'
import Modal from './Modal'

export default function EventoModal({
  evento,
  habitos,
  peso,
  textoEspejo,
  onEco,
  onEspejo,
  onSalto,
  onCerrar,
}: {
  evento: Evento
  habitos: number
  peso: number
  textoEspejo?: string
  onEco: (id: string) => void
  onEspejo: (casilla: number, texto: string) => void
  onSalto: (hasta: number) => void
  onCerrar: () => void
}) {
  const [texto, setTexto] = useState(textoEspejo ?? '')

  if (evento.tipo === 'eco') {
    const eco = ecoPorId(evento.id)
    return (
      <Modal etiqueta={`Eco: ${eco.libro}`}>
        <div className="space-y-4 pr-8">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-tinta2">
            <IconoLibro size={18} className="text-oro" /> Un eco de otro libro de la clase
          </div>
          <div>
            <h2 className="titulo text-2xl leading-tight">{eco.libro}</h2>
            <p className="text-sm font-bold text-tinta2">{eco.autor}</p>
          </div>
          <span className="etiqueta border-tinta/40 bg-white/60">{eco.temas}</span>
          <p className="leading-relaxed">{eco.historia}</p>
          <div className="rounded-xl border-2 border-oro/50 bg-[#fdf6dd] p-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Cómo resuena con tu viaje</h3>
            <p className="mt-1 leading-relaxed">{eco.conexion}</p>
          </div>
          <p className="rounded-xl border-l-4 border-comarca bg-[#e9f0de] p-3 font-semibold">{eco.pregunta}</p>
          <button
            className="btn-primario w-full"
            onClick={() => {
              onEco(eco.id)
              onCerrar()
            }}
          >
            Seguir el camino <IconoFlecha size={18} />
          </button>
        </div>
      </Modal>
    )
  }

  if (evento.tipo === 'espejo') {
    const e = espejos[evento.casilla]
    return (
      <Modal etiqueta="Espejo de Galadriel">
        <div className="space-y-4 pr-8">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2f5f73]">
            <IconoEspejo size={18} /> Espejo de Galadriel
          </div>
          <h2 className="titulo text-2xl leading-tight">{e.titulo}</h2>
          <p className="text-sm text-tinta2">
            En Lothlórien, la dama Galadriel deja que Frodo mire en un espejo de agua que muestra cosas que fueron, que son o que podrían ser. Ahora el agua te muestra algo de ti.
          </p>
          <label className="block space-y-2">
            <span className="block font-bold leading-snug">{e.pregunta}</span>
            <textarea
              className="min-h-[110px] w-full rounded-xl border-2 border-[#9ec2cf] bg-[#f4fbff] p-3 text-[16px] outline-none focus:border-[#2f5f73]"
              maxLength={280}
              value={texto}
              onChange={(ev) => setTexto(ev.target.value)}
              placeholder="Escribe aquí si quieres (opcional). Aparecerá en tu pergamino final."
              aria-describedby="contador-espejo"
            />
            <span id="contador-espejo" className="block text-right text-xs text-tinta2">
              {texto.length}/280
            </span>
          </label>
          <div className="flex gap-2">
            <button
              className="btn-secundario flex-1"
              onClick={() => {
                onEspejo(evento.casilla, '')
                onCerrar()
              }}
            >
              Prefiero no escribir
            </button>
            <button
              className="btn-primario flex-1"
              disabled={!texto.trim()}
              onClick={() => {
                onEspejo(evento.casilla, texto)
                onCerrar()
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  if (evento.tipo === 'sendero' || evento.tipo === 'sombra') {
    const c = tablero[evento.desde]
    const sendero = evento.tipo === 'sendero'
    const titulo = sendero
      ? evento.activo
        ? 'Tus buenos hábitos te abren un atajo'
        : 'El atajo estaba ahí, pero no tenías el hábito para tomarlo'
      : evento.activo
        ? 'El Anillo te arrastra hacia atrás'
        : 'La sombra pasó cerca, pero no te alcanzó'
    const detalle = sendero
      ? `Hábitos: ${habitos}/10. Necesitas 5 o más para tomar los senderos.`
      : `Peso del Anillo: ${peso}/10. Las sombras solo te alcanzan con 6 o más.`
    const Icono = sendero ? IconoHoja : IconoOjo
    return (
      <Modal etiqueta={titulo}>
        <div className="space-y-4 pr-8">
          <div className={`flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider ${sendero ? 'text-comarca' : 'text-ceniza'}`}>
            <Icono size={18} /> {sendero ? 'Sendero' : 'Sombra'} · {c.nombre}
          </div>
          <h2 className="titulo text-xl leading-tight">{titulo}</h2>
          <p className="leading-relaxed">{c.texto}</p>
          <p className="rounded-xl bg-tinta/5 p-3 text-sm font-semibold">{detalle}</p>
          {evento.activo ? (
            <button
              className={sendero ? 'btn-oro w-full' : 'btn-primario w-full'}
              onClick={() => {
                onCerrar()
                onSalto(evento.hasta)
              }}
            >
              {sendero ? `Subir hasta la casilla ${evento.hasta}` : `Retroceder a la casilla ${evento.hasta}`}
            </button>
          ) : (
            <button className="btn-primario w-full" onClick={onCerrar}>
              Seguir <IconoFlecha size={18} />
            </button>
          )}
        </div>
      </Modal>
    )
  }

  return null
}
