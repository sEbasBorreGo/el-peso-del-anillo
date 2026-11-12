import { useEffect, useRef, type ReactNode } from 'react'
import { IconoCerrar } from './Iconos'

export default function Modal({
  children,
  etiqueta,
  onCerrar,
  ancho = 'max-w-lg',
}: {
  children: ReactNode
  etiqueta: string
  onCerrar?: () => void
  ancho?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar?.()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onCerrar])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1d130a]/60 backdrop-blur-[2px] sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={etiqueta}>
      <div
        ref={ref}
        tabIndex={-1}
        className={`papel aparecer relative max-h-[94dvh] w-full ${ancho} overflow-y-auto overscroll-contain rounded-b-none p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] outline-none sm:rounded-2xl sm:p-6`}
      >
        {onCerrar && (
          <button className="btn-icono absolute right-3 top-3 z-10" onClick={onCerrar} aria-label="Cerrar">
            <IconoCerrar size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
