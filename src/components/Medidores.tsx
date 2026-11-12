import { temas } from '../data/textos'
import type { Efectos, Medidores as M, MedidorId } from '../types'
import { colorMedidor, iconoMedidor } from './Iconos'

const orden: MedidorId[] = ['libertad', 'habitos', 'autenticidad', 'etica']

function Barra({ id, valor, delta }: { id: MedidorId; valor: number; delta?: number }) {
  const Icono = iconoMedidor[id]
  const nombre = id === 'peso' ? 'Peso del Anillo' : temas[id as keyof typeof temas].corto
  return (
    <div
      className="relative flex min-w-0 flex-1 flex-col items-center gap-0.5"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={10}
      aria-valuenow={valor}
      aria-label={`${nombre}: ${valor} de 10`}
      data-medidor={id}
    >
      <div className="flex items-center gap-1" style={{ color: colorMedidor[id] }}>
        <Icono size={18} />
        <span className="text-sm font-extrabold tabular-nums text-tinta">{valor}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-tinta/15">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${valor * 10}%`, background: colorMedidor[id] }} />
      </div>
      <span className="w-full truncate text-center text-[10px] font-semibold leading-tight text-tinta2">{id === 'peso' ? 'Peso' : nombre}</span>
      {delta ? (
        <span
          className={`delta pointer-events-none absolute -top-1 right-0 rounded px-1 text-xs font-extrabold ${delta > 0 ? 'text-[#2d6a1f]' : 'text-brasa'}`}
          aria-hidden
        >
          {delta > 0 ? `+${delta}` : delta}
        </span>
      ) : null}
    </div>
  )
}

function Peso({ valor, delta }: { valor: number; delta?: number }) {
  const intensidad = valor / 10
  return (
    <div
      className="relative flex w-[68px] shrink-0 flex-col items-center"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={10}
      aria-valuenow={valor}
      aria-label={`Peso del Anillo: ${valor} de 10`}
      data-medidor="peso"
    >
      <svg width="40" height="30" viewBox="0 0 40 30" aria-hidden>
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#ffd75e" stopOpacity={0.2 + intensidad * 0.8} />
            <stop offset="100%" stopColor="#ffd75e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="15" rx={10 + intensidad * 10} ry={8 + intensidad * 7} fill="url(#glow)" className={valor >= 6 ? 'brillo' : ''} />
        <ellipse cx="20" cy="15" rx="10" ry="7.5" fill="none" stroke="#b8860b" strokeWidth="4" />
        <ellipse cx="20" cy="15" rx="10" ry="7.5" fill="none" stroke="#fff3c4" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
      <span className="-mt-0.5 text-[10px] font-bold leading-tight">
        Peso <span className="text-sm font-extrabold tabular-nums">{valor}</span>/10
      </span>
      {delta ? (
        <span className={`delta pointer-events-none absolute -top-1 right-0 text-xs font-extrabold ${delta > 0 ? 'text-brasa' : 'text-[#2d6a1f]'}`} aria-hidden>
          {delta > 0 ? `+${delta}` : delta}
        </span>
      ) : null}
    </div>
  )
}

export default function Medidores({ m, deltas }: { m: M; deltas: Efectos | null }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex min-w-0 flex-1 gap-2">
        {orden.map((id) => (
          <Barra key={id} id={id} valor={m[id]} delta={deltas?.[id]} />
        ))}
      </div>
      <div className="h-10 w-px bg-tinta/20" />
      <Peso valor={m.peso} delta={deltas?.peso} />
    </div>
  )
}
