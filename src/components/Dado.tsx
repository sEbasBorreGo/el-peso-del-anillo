const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[26, 26], [50, 50], [74, 74]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]],
}

export default function Dado({ valor, rodando, size = 56 }: { valor: number; rodando: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={rodando ? 'rodando' : ''} aria-hidden>
      <rect x="6" y="6" width="88" height="88" rx="20" fill="#fbf5e8" stroke="#3b2614" strokeWidth="6" />
      {PIPS[valor]?.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8.5" fill={valor === 1 ? '#a8321e' : '#3b2614'} />
      ))}
    </svg>
  )
}
