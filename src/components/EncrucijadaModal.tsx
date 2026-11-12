import { useMemo, useState } from 'react'
import { encrucijadaPorId } from '../data/encrucijadas'
import { marcos, montaña, temas } from '../data/textos'
import { barajar, efectosDelMotivo } from '../lib/logica'
import type { Decision, Efectos, Medidores, MedidorId, TemaId } from '../types'
import { IconoFlecha, IconoRombo, colorMedidor } from './Iconos'
import Modal from './Modal'

type Paso = 'escena' | 'accion' | 'motivo' | 'feedback'

const nombreMedidor = (k: MedidorId) => (k === 'peso' ? 'Peso del Anillo' : temas[k as TemaId].corto)

export function EtiquetaTema({ id, extra }: { id?: TemaId; extra?: string }) {
  const texto = id ? temas[id].nombre : extra
  const color = id ? colorMedidor[id] : '#5c4128'
  return (
    <span className="etiqueta bg-white/60" style={{ borderColor: color, color }}>
      {texto}
    </span>
  )
}

function Chips({ titulo, ef }: { titulo: string; ef: Efectos }) {
  const items = (Object.entries(ef) as [MedidorId, number][]).filter(([, v]) => v !== 0)
  if (!items.length) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span className="font-bold text-tinta2">{titulo}</span>
      {items.map(([k, v]) => {
        const bueno = k === 'peso' ? v < 0 : v > 0
        return (
          <span key={k} className={`rounded-full px-2 py-0.5 font-bold ${bueno ? 'bg-[#dcebd0] text-[#24521a]' : 'bg-[#f3d6cf] text-[#8a2414]'}`}>
            {nombreMedidor(k)} {v > 0 ? `+${v}` : v}
          </span>
        )
      })}
    </div>
  )
}

export default function EncrucijadaModal({
  encId,
  medidores,
  decision,
  onDecidir,
  onCerrar,
}: {
  encId: number
  medidores: Medidores
  decision?: Decision
  onDecidir: (accionId: string, motivoId: string) => void
  onCerrar: () => void
}) {
  const enc = encrucijadaPorId(encId)
  const [paso, setPaso] = useState<Paso>(decision ? 'feedback' : 'escena')
  const [accionId, setAccionId] = useState<string | null>(decision?.accionId ?? null)
  const motivos = useMemo(() => barajar(enc.motivos), [enc])
  // El peso con el que LLEGASTE a la encrucijada (antes de decidir)
  const [pesoLlegada] = useState(medidores.peso)

  const accion = enc.acciones.find((a) => a.id === (decision?.accionId ?? accionId))
  const motivo = decision ? enc.motivos.find((m) => m.id === decision.motivoId) : undefined

  return (
    <Modal etiqueta={`Encrucijada ${enc.id}: ${enc.titulo}`}>
      <div className="mb-3 flex items-center gap-2 pr-12 text-xs font-bold uppercase tracking-wider text-tinta2">
        <IconoRombo size={16} className="text-oro" />
        Encrucijada {enc.id} de 8 · {enc.lugar}
      </div>

      {paso === 'escena' && (
        <div className="aparecer space-y-4">
          <h2 className="titulo text-2xl leading-tight">{enc.titulo}</h2>
          <div className="flex flex-wrap gap-1.5">
            {enc.temas.map((t) => (
              <EtiquetaTema key={t} id={t} />
            ))}
            {enc.subtema && <EtiquetaTema extra={enc.subtema} />}
          </div>
          <p className="text-sm font-bold text-tinta2">Decides como: {enc.personaje}</p>
          {enc.id === 8 && pesoLlegada >= 7 && (
            <p className="rounded-xl border-l-4 border-brasa bg-[#f6ddd2] p-3 text-sm font-bold">{montaña.pesoAlto}</p>
          )}
          {enc.id === 8 && pesoLlegada <= 3 && (
            <p className="rounded-xl border-l-4 border-comarca bg-[#e2edd5] p-3 text-sm font-bold">{montaña.pesoBajo}</p>
          )}
          <p className="text-[16px] leading-relaxed">{enc.escena}</p>
          <button className="btn-primario w-full" onClick={() => setPaso('accion')}>
            ¿Qué haces? <IconoFlecha size={18} />
          </button>
        </div>
      )}

      {paso === 'accion' && (
        <div className="aparecer space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-oro">Paso 1 de 2</p>
          <h2 className="titulo text-xl">¿Qué haces?</h2>
          <div className="space-y-2.5" role="list">
            {enc.acciones.map((a, i) => (
              <button
                key={a.id}
                role="listitem"
                className="opcion"
                onClick={() => {
                  setAccionId(a.id)
                  setPaso('motivo')
                }}
              >
                <span className="mr-2 font-titulo font-bold text-oro">{String.fromCharCode(65 + i)}.</span>
                {a.texto}
              </button>
            ))}
          </div>
          <button className="btn w-full text-sm text-tinta2 underline" onClick={() => setPaso('escena')}>
            Volver a leer la escena
          </button>
        </div>
      )}

      {paso === 'motivo' && accion && (
        <div className="aparecer space-y-3">
          <p className="rounded-xl bg-tinta/5 p-3 text-sm italic">Elegiste: {accion.texto}</p>
          <p className="text-xs font-extrabold uppercase tracking-wider text-oro">Paso 2 de 2</p>
          <h2 className="titulo text-xl">¿Por qué lo haces?</h2>
          <p className="text-sm text-tinta2">
            Ninguno es “el correcto”. Escoge el que de verdad se parezca a lo que pensarías tú. Esto es lo que más mueve tus medidores.
          </p>
          <div className="space-y-2.5" role="list">
            {motivos.map((m) => (
              <button
                key={m.id}
                role="listitem"
                className="opcion"
                data-marco={m.marco}
                onClick={() => {
                  onDecidir(accion.id, m.id)
                  setPaso('feedback')
                }}
              >
                “{m.texto}”
              </button>
            ))}
          </div>
          <button className="btn w-full text-sm text-tinta2 underline" onClick={() => setPaso('accion')}>
            Cambiar mi acción
          </button>
        </div>
      )}

      {paso === 'feedback' && decision && accion && motivo && (
        <div className="aparecer space-y-4">
          <h2 className="titulo text-2xl">Lo que tu decisión revela</h2>
          <div className="flex flex-wrap gap-1.5">
            {enc.temas.map((t) => (
              <EtiquetaTema key={t} id={t} />
            ))}
            {enc.subtema && <EtiquetaTema extra={enc.subtema} />}
          </div>

          <section className="space-y-1.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Lo que hiciste</h3>
            <p className="text-sm italic">{accion.texto}</p>
            <p className="leading-relaxed">{enc.feedbackAcciones[accion.id]}</p>
          </section>

          <section className="space-y-1.5 rounded-xl border-2 border-oro/50 bg-[#fdf6dd] p-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Por qué lo hiciste</h3>
            <p className="text-sm italic">“{motivo.texto}”</p>
            <p>
              <span className="etiqueta mr-1 border-tinta bg-tinta text-crema">Tu motivo: {marcos[motivo.marco].nombre}</span>
            </p>
            <p className="text-sm text-tinta2">{marcos[motivo.marco].idea}</p>
            <p className="leading-relaxed">{enc.feedbackMotivos[motivo.marco]}</p>
          </section>

          <div className="space-y-1.5 rounded-xl bg-tinta/5 p-3">
            <Chips titulo="Por tu acción:" ef={accion.efectos} />
            <Chips titulo="Por tu motivo:" ef={efectosDelMotivo(enc, motivo.marco)} />
            <p className="text-xs text-tinta2">La misma acción con otro motivo te habría dejado distinto.</p>
          </div>

          <section className="space-y-1">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Qué pasó en el libro</h3>
            <p className="leading-relaxed">{enc.quepaso}</p>
          </section>

          <section className="rounded-xl border-l-4 border-comarca bg-[#e9f0de] p-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-comarca">Llévalo a tu vida</h3>
            <p className="mt-1 font-semibold">{enc.tuVida}</p>
          </section>

          <button className="btn-primario w-full" onClick={onCerrar}>
            Seguir el camino <IconoFlecha size={18} />
          </button>
        </div>
      )}
    </Modal>
  )
}
