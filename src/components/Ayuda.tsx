import { instrucciones, juego, marcos, regla, temas } from '../data/textos'
import type { Marco, TemaId } from '../types'
import {
  IconoAnillo,
  IconoDado,
  IconoHoja,
  IconoLibro,
  IconoOjo,
  IconoPergamino,
  IconoRombo,
  colorMedidor,
  iconoMedidor,
} from './Iconos'

const iconos: Record<string, JSX.Element> = {
  dado: <IconoDado />,
  encrucijada: <IconoRombo className="text-oro" />,
  medidores: <IconoHoja className="text-comarca" />,
  anillo: <IconoAnillo />,
  sendero: <IconoHoja className="text-comarca" />,
  sombra: <IconoOjo className="text-ceniza" />,
  eco: <IconoLibro className="text-tinta2" />,
  pergamino: <IconoPergamino />,
}

export default function Ayuda({ conTemas = true }: { conTemas?: boolean }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="titulo text-2xl">¿Cómo se juega?</h2>
        <p className="text-sm text-tinta2">Juegas sola o solo, a tu ritmo. Tiempo: {juego.duracion}. El botón “?” de arriba vuelve a abrir esta ayuda.</p>
      </div>
      <ul className="space-y-3">
        {instrucciones.map((i) => (
          <li key={i.titulo} className="flex gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm">{iconos[i.icono]}</span>
            <span>
              <strong className="block">{i.titulo}</strong>
              <span className="text-[15px] leading-snug">{i.texto}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="rounded-xl border-2 border-oro/60 bg-[#fdf6dd] p-3 text-center font-bold">{regla}</p>
      <div className="rounded-xl bg-tinta/5 p-3 text-sm leading-relaxed">
        <strong>Cómo suman los motivos:</strong> un motivo de virtud da +2 al tema principal de esa encrucijada, +1 en Autenticidad, +1 en Hábitos y quita 1 de Peso. Los otros motivos suben el Peso en 1 y bajan un medidor. Las acciones solo mueven ±1.
      </div>

      {conTemas && (
        <>
          <div>
            <h3 className="titulo mb-2 text-xl">Los 4 temas de la clase</h3>
            <ul className="space-y-3">
              {(Object.keys(temas) as TemaId[]).map((id) => {
                const Icono = iconoMedidor[id]
                return (
                  <li key={id} className="flex gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm" style={{ color: colorMedidor[id] }}>
                      <Icono />
                    </span>
                    <span>
                      <strong className="block" style={{ color: colorMedidor[id] }}>
                        {temas[id].nombre}
                      </strong>
                      <span className="text-[15px] leading-snug">{temas[id].descripcion}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="titulo mb-2 text-xl">Formas de razonar (glosario)</h3>
            <dl className="space-y-2 text-[15px]">
              {(['hedonismo', 'utilitarismo', 'relativismo', 'virtud'] as Marco[]).map((m) => (
                <div key={m}>
                  <dt className="inline font-bold">{marcos[m].nombre}: </dt>
                  <dd className="inline">{marcos[m].idea}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-sm text-tinta2">En el juego los motivos no traen esta etiqueta: la ves después de decidir.</p>
          </div>
        </>
      )}
    </div>
  )
}
