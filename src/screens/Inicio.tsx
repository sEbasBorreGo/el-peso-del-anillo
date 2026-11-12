import { useState, type Dispatch } from 'react'
import Ayuda from '../components/Ayuda'
import { IconoFlecha, IconoMontana, IconoQR } from '../components/Iconos'
import { contexto, creditos, juego } from '../data/textos'
import type { Accion, Estado } from '../lib/estado'

function Portada3D() {
  return (
    <svg viewBox="0 0 320 170" className="mx-auto w-full max-w-sm" aria-hidden>
      <defs>
        <radialGradient id="pg" cx="50%" cy="45%" r="50%">
          <stop offset="0" stopColor="#ffe08a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M0 150 Q60 110 120 135 T220 120 T320 140 V170 H0Z" fill="#a9c47f" />
      <path d="M190 150 L250 50 L262 62 L276 48 L320 150Z" fill="#5a4a44" />
      <path d="M256 55 q8 -22 22 -6" stroke="#a8321e" strokeWidth="4" fill="none" className="brillo" />
      <path d="M20 160 C80 150 110 120 160 118 S240 90 262 62" fill="none" stroke="#5c4128" strokeWidth="2" strokeDasharray="5 6" />
      <circle cx="120" cy="70" r="55" fill="url(#pg)" className="brillo" />
      <ellipse cx="120" cy="72" rx="34" ry="26" fill="none" stroke="#b8860b" strokeWidth="10" />
      <ellipse cx="120" cy="72" rx="34" ry="26" fill="none" stroke="#fff3c4" strokeWidth="1.6" strokeDasharray="4 6" />
      <g transform="translate(30,140)">
        <path d="M0 14 a14 14 0 0 1 28 0Z" fill="#7a5a3a" />
        <circle cx="14" cy="8" r="3.5" fill="#e3b341" />
      </g>
    </svg>
  )
}

export function Portada({ s, dispatch }: { s: Estado; dispatch: Dispatch<Accion> }) {
  const enCurso = s.pos > 0 || s.decisiones.length > 0
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-5 py-8">
      <div className="aparecer text-center">
        <Portada3D />
        <h1 className="titulo mt-2 text-4xl leading-tight text-tinta">{juego.titulo}</h1>
        <p className="titulo text-lg text-tinta2">{juego.subtitulo}</p>
        <p className="mx-auto mt-4 max-w-xs text-[17px] italic leading-snug">{juego.pregunta}</p>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-bold">¿Cómo te llamas? (opcional, sale en tu pergamino)</span>
        <input
          className="min-h-[48px] w-full rounded-xl border-2 border-[#c9ad7a] bg-[#fbf5e8] px-4 text-[16px] outline-none focus:border-tinta"
          value={s.nombre}
          onChange={(e) => dispatch({ type: 'NOMBRE', nombre: e.target.value })}
          placeholder="Tu nombre"
          autoComplete="given-name"
          maxLength={40}
        />
      </label>
      <div className="flex flex-col gap-3">
        {enCurso ? (
          <>
            <button className="btn-oro text-lg" onClick={() => dispatch({ type: 'IR', pantalla: 'tablero' })}>
              Continuar mi viaje <IconoFlecha />
            </button>
            <button
              className="btn-secundario"
              onClick={() => {
                if (window.confirm('¿Empezar de cero? Se borra tu progreso.')) {
                  dispatch({ type: 'REINICIAR' })
                  dispatch({ type: 'IR', pantalla: 'contexto' })
                }
              }}
            >
              Empezar de nuevo
            </button>
          </>
        ) : (
          <button className="btn-oro text-lg" onClick={() => dispatch({ type: 'IR', pantalla: 'contexto' })} data-testid="comenzar">
            Comenzar el viaje <IconoFlecha />
          </button>
        )}
        <button className="btn-secundario" onClick={() => dispatch({ type: 'IR', pantalla: 'ayuda' })}>
          ¿Cómo se juega?
        </button>
      </div>
      <footer className="text-center text-xs text-tinta2">
        <p>{creditos.proyecto}</p>
        <p>{creditos.universidad}</p>
        <div className="mt-2 flex justify-center gap-4">
          <button className="underline" onClick={() => dispatch({ type: 'IR', pantalla: 'creditos' })}>
            Créditos
          </button>
          <a className="inline-flex items-center gap-1 underline" href="#/qr">
            <IconoQR size={14} /> Ver QR
          </a>
        </div>
      </footer>
    </main>
  )
}

export function Contexto({ dispatch }: { dispatch: Dispatch<Accion> }) {
  const [i, setI] = useState(0)
  const [x0, setX0] = useState<number | null>(null)
  const ultimo = i === contexto.length - 1
  const ir = () => dispatch({ type: 'IR', pantalla: 'ayuda' })
  const tarjeta = contexto[i]
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-5 py-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold uppercase tracking-wider text-tinta2">Antes de empezar · {i + 1} de {contexto.length}</p>
        <button className="btn min-h-[44px] px-3 text-sm underline" onClick={ir}>
          Saltar
        </button>
      </div>
      <section
        key={i}
        className="papel aparecer flex flex-1 flex-col justify-center gap-4 p-6"
        onTouchStart={(e) => setX0(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (x0 === null) return
          const dx = e.changedTouches[0].clientX - x0
          if (dx < -50 && !ultimo) setI(i + 1)
          if (dx > 50 && i > 0) setI(i - 1)
          setX0(null)
        }}
        aria-live="polite"
      >
        <div className="text-oro">
          {i === 0 ? (
            <svg width="54" height="40" viewBox="0 0 54 40" aria-hidden>
              <ellipse cx="27" cy="20" rx="20" ry="14" fill="none" stroke="#b8860b" strokeWidth="6" />
            </svg>
          ) : i === 1 ? (
            <svg width="54" height="40" viewBox="0 0 54 40" aria-hidden>
              <path d="M6 36 a21 21 0 0 1 42 0Z" fill="#7a5a3a" />
              <circle cx="27" cy="24" r="5" fill="#e3b341" />
            </svg>
          ) : (
            <IconoMontana size={44} />
          )}
        </div>
        <h2 className="titulo text-3xl">{tarjeta.titulo}</h2>
        <p className="text-[18px] leading-relaxed">{tarjeta.texto}</p>
        {ultimo && <p className="titulo text-lg italic text-tinta2">{juego.pregunta}</p>}
      </section>
      <div className="flex justify-center gap-2" aria-hidden>
        {contexto.map((_, k) => (
          <span key={k} className={`h-2.5 rounded-full transition-all ${k === i ? 'w-7 bg-tinta' : 'w-2.5 bg-tinta/30'}`} />
        ))}
      </div>
      <div className="flex gap-3">
        <button className="btn-secundario flex-1" onClick={() => setI(i - 1)} disabled={i === 0}>
          Atrás
        </button>
        <button className="btn-primario flex-1" onClick={() => (ultimo ? ir() : setI(i + 1))} data-testid="siguiente">
          {ultimo ? 'Entendido' : 'Siguiente'} <IconoFlecha size={18} />
        </button>
      </div>
    </main>
  )
}

export function PantallaAyuda({ dispatch }: { dispatch: Dispatch<Accion> }) {
  return (
    <main className="mx-auto max-w-md px-5 py-6">
      <div className="papel p-5">
        <Ayuda />
      </div>
      <div className="sticky bottom-0 -mx-5 mt-4 bg-gradient-to-t from-[#efe2c6] via-[#efe2c6] to-transparent px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
        <button className="btn-oro w-full text-lg" onClick={() => dispatch({ type: 'IR', pantalla: 'tablero' })} data-testid="al-tablero">
          ¡A caminar! <IconoFlecha />
        </button>
      </div>
    </main>
  )
}
