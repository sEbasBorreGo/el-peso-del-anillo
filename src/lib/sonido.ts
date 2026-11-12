// Sonidos muy simples con WebAudio (sin archivos). Apagados por defecto.
let ctx: AudioContext | null = null

function tono(freq: number, dur: number, tipo: OscillatorType = 'sine', vol = 0.06, delay = 0) {
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const t = ctx.currentTime + delay
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = tipo
    o.frequency.setValueAtTime(freq, t)
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(ctx.destination)
    o.start(t)
    o.stop(t + dur)
  } catch {
    /* sin audio */
  }
}

export const sonidos = {
  dado: () => [0, 0.07, 0.14, 0.21].forEach((d) => tono(180 + Math.random() * 120, 0.06, 'square', 0.03, d)),
  paso: () => tono(520, 0.05, 'triangle', 0.03),
  campana: () => { tono(660, 0.5, 'sine', 0.05); tono(990, 0.6, 'sine', 0.03, 0.08) },
  sombra: () => { tono(140, 0.6, 'sawtooth', 0.03); tono(110, 0.7, 'sine', 0.04, 0.1) },
  sendero: () => [0, 0.08, 0.16].forEach((d, i) => tono(440 + i * 150, 0.18, 'triangle', 0.04, d)),
}
