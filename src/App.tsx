import { useEffect, useReducer, useState } from 'react'
import { cargar, guardar, reducer } from './lib/estado'
import { Contexto, PantallaAyuda, Portada } from './screens/Inicio'
import Juego from './screens/Juego'
import { Creditos, Epilogo, Monte, PantallaQR, Pergamino } from './screens/Final'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const f = () => setHash(window.location.hash)
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return hash
}

export default function App() {
  const [s, dispatch] = useReducer(reducer, undefined, cargar)
  const hash = useHash()

  useEffect(() => guardar(s), [s])
  useEffect(() => {
    if (s.pantalla !== 'tablero') window.scrollTo({ top: 0 })
  }, [s.pantalla])

  if (hash === '#/qr') return <PantallaQR />

  switch (s.pantalla) {
    case 'portada':
      return <Portada s={s} dispatch={dispatch} />
    case 'contexto':
      return <Contexto dispatch={dispatch} />
    case 'ayuda':
      return <PantallaAyuda dispatch={dispatch} />
    case 'tablero':
      return <Juego s={s} dispatch={dispatch} />
    case 'monte':
      return <Monte s={s} dispatch={dispatch} />
    case 'epilogo':
      return <Epilogo dispatch={dispatch} />
    case 'pergamino':
      return <Pergamino s={s} dispatch={dispatch} />
    case 'creditos':
      return <Creditos dispatch={dispatch} />
  }
}
