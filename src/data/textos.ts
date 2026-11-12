import type { Marco, TemaId } from '../types'

/**
 * TEXTOS GENERALES DEL JUEGO
 * Si la profe nombró los temas distinto, cámbienlos SOLO aquí.
 */

export const juego = {
  titulo: 'El Peso del Anillo',
  subtitulo: 'un viaje de decisiones',
  pregunta: '¿Qué hace que alguien pequeño sea capaz de cargar con algo enorme?',
  duracion: '10 a 15 minutos',
}

export const temas: Record<TemaId, { nombre: string; corto: string; descripcion: string }> = {
  libertad: {
    nombre: 'Libertad y toma de decisiones',
    corto: 'Libertad',
    descripcion:
      'No es solo “hacer lo que quiero” (libertad de), sino elegir hacia dónde quiero crecer (libertad para). Decidir bien es pensar, elegir y hacerme cargo de las consecuencias, en mí y en los demás.',
  },
  habitos: {
    nombre: 'Hábitos (virtudes y vicios)',
    corto: 'Hábitos',
    descripcion:
      'Lo que repito me va formando: se vuelve una segunda naturaleza. Las virtudes hacen fácil lo bueno; los vicios hacen fácil lo que me destruye.',
  },
  autenticidad: {
    nombre: 'Autenticidad',
    corto: 'Autenticidad',
    descripcion:
      'Ser fiel a quien soy y a quien quiero llegar a ser, no a la presión del grupo ni al impulso del momento. Auténtico no es “hago lo que sienta”: es actuar en coherencia con lo que valoro.',
  },
  etica: {
    nombre: 'Ética y liderazgo ético',
    corto: 'Ética',
    descripcion:
      'Hay distintas formas de razonar qué es lo bueno: hedonismo, utilitarismo, relativismo y ética de la virtud. El líder ético influye desde el ejemplo y el servicio, no desde el poder.',
  },
}

export const marcos: Record<Marco, { nombre: string; idea: string; explicacion: string }> = {
  hedonismo: {
    nombre: 'Hedonismo',
    idea: 'Lo bueno es lo que me da placer o comodidad.',
    explicacion:
      'Tu motivo fue sentirte bien o dejar de sentirte mal. Es humano, pero si eso decide siempre, terminas siendo esclavo de lo que te gusta o te molesta.',
  },
  utilitarismo: {
    nombre: 'Utilitarismo',
    idea: 'Lo bueno es el mejor resultado para la mayoría; el fin justifica los medios.',
    explicacion:
      'Tu motivo fue el resultado. Pensar en las consecuencias es necesario, pero si el fin lo justifica todo, cualquier persona puede terminar usada como medio.',
  },
  relativismo: {
    nombre: 'Relativismo',
    idea: 'Nada es mejor que otra cosa; todo depende.',
    explicacion:
      'Tu motivo fue que todo da igual o depende. Suena abierto, pero si nada es mejor que nada, tampoco tienes hacia dónde crecer.',
  },
  virtud: {
    nombre: 'Ética de la virtud',
    idea: 'Lo bueno es lo que me hace mejor persona y respeta a los demás.',
    explicacion:
      'Tu motivo fue ser quien quieres ser y tratar bien a los otros. Es el motivo que, repetido, se vuelve carácter.',
  },
}

export const vidaLograda = {
  titulo: '¿Qué es una vida lograda?',
  texto:
    'Una vida lograda se construye con decisiones libres orientadas a lo bueno (Libertad), repetidas hasta volverse carácter (Hábitos), coherentes con quien quiero ser (Autenticidad) y abiertas a los demás, sin usar a nadie como medio (Ética). No es éxito ni placer constante: es plenitud. No es una vida perfecta ni sin caídas: es una vida con sentido, en la que me voy haciendo quien estoy llamado a ser. Y siempre se hace en compañía.',
  preguntaFinal:
    'Después de este viaje, ¿qué es para ti una vida lograda y qué decisión concreta vas a tomar esta semana para acercarte a ella?',
}

export const contexto = [
  {
    titulo: 'El mundo',
    texto:
      'La Tierra Media es un mundo de hobbits, elfos, enanos y hombres. Hace siglos, Sauron, un señor oscuro, forjó un Anillo para dominarlos a todos. Quien lo lleva se va volviendo, poco a poco, esclavo de él.',
  },
  {
    titulo: 'El protagonista',
    texto:
      'Frodo Bolsón es un hobbit: pequeño, tranquilo, amante de la buena comida y de su casa. Hereda el Anillo de su tío Bilbo. La única forma de destruirlo es lanzarlo al fuego del Monte del Destino, en pleno corazón de la tierra del enemigo.',
  },
  {
    titulo: 'Tu papel',
    texto:
      'Vas a recorrer ese camino y a tomar las decisiones que tomaron (o pudieron tomar) Frodo, Sam, Boromir y Faramir. No hay respuestas correctas: hay decisiones y motivos, y cada uno te va formando.',
  },
]

export const instrucciones = [
  { icono: 'dado', titulo: 'Tira el dado', texto: 'Avanzas por el camino de la Comarca al Monte del Destino.' },
  {
    icono: 'encrucijada',
    titulo: 'Encrucijadas',
    texto: 'Hay 8. Siempre te detienes en ellas, aunque el dado diga más. Primero eliges qué haces y después por qué lo haces.',
  },
  {
    icono: 'medidores',
    titulo: 'Tus 4 medidores',
    texto: 'Son los temas de la clase: Libertad, Hábitos, Autenticidad y Ética. Van de 0 a 10 y empiezan en 3.',
  },
  {
    icono: 'anillo',
    titulo: 'El Peso del Anillo',
    texto: 'Sube o baja según tus MOTIVOS, más que según tus acciones. Si llega a 8, el dado solo saca de 1 a 3: avanzas más lento.',
  },
  {
    icono: 'sendero',
    titulo: 'Senderos',
    texto: 'Son atajos. Solo te suben si tienes Hábitos en 5 o más.',
  },
  {
    icono: 'sombra',
    titulo: 'Sombras',
    texto: 'Te devuelven. Pero solo te alcanzan si el Anillo pesa 6 o más.',
  },
  {
    icono: 'eco',
    titulo: 'Ecos y Espejos',
    texto: 'Los Ecos traen historias de otros libros de la clase. En los Espejos de Galadriel puedes escribir algo de tu vida (si quieres).',
  },
  {
    icono: 'pergamino',
    titulo: 'Al final',
    texto: 'Recibes tu Pergamino de la vida lograda, que puedes descargar.',
  },
]

export const regla = 'Lo que te va formando no es solo lo que haces, sino por qué lo haces.'

export const perfiles = {
  sam: {
    nombre: 'Sam',
    frase: 'Tu fuerza está en la fidelidad y el servicio.',
    luz: 'Eres de los que se quedan cuando todos se van, y cargan sin pedir aplausos.',
    sombra: 'Cuidado con olvidarte de ti: servir no es desaparecer.',
  },
  faramir: {
    nombre: 'Faramir',
    frase: 'Tu carácter ya decide antes que la tentación.',
    luz: 'Tienes hábitos tan formados que lo correcto te cuesta menos.',
    sombra: 'Cuidado con creer que ya no te puede pasar: hasta Faramir necesitó a otros.',
  },
  frodo: {
    nombre: 'Frodo',
    frase: 'Cargaste mucho y no siempre pudiste; nadie llega solo.',
    luz: 'Tuviste motivos de todo tipo, como cualquiera que de verdad carga algo pesado.',
    sombra: 'El Anillo te pesó a ratos. Eso no te define: te muestra dónde necesitas a otros.',
  },
  boromir: {
    nombre: 'Boromir',
    frase: 'Buscaste el bien con atajos; recuerda que Boromir también se levantó.',
    luz: 'Te importan los resultados y la gente que depende de ti.',
    sombra: 'El fin no justifica los medios. La buena noticia: ningún mal momento es la última palabra.',
  },
  bilbo: {
    nombre: 'Bilbo en la Comarca',
    frase: 'La comodidad te llamó fuerte; el viaje siempre se puede retomar.',
    luz: 'Sabes disfrutar y no te complicas, y eso también es un don.',
    sombra: 'Si todo da igual o lo que manda es estar cómodo, es difícil crecer. Bilbo también salió de su casa ya mayor.',
  },
} as const

export const epilogo = [
  'Frodo vuelve a la Comarca, pero ya no es el mismo. Carga heridas que no sanan del todo.',
  'Sam se casa, siembra jardines, forma una familia y vive con una alegría sencilla.',
  'La vida lograda no es la del que nunca falla, sino la del que se va haciendo mejor con sus decisiones y no camina solo.',
]

export const montaña = {
  titulo: 'El Monte del Destino',
  texto:
    'El Anillo ya no existe. La montaña tiembla, la torre de Sauron se derrumba y el Ojo se apaga. Frodo y Sam quedan en una roca, rodeados de fuego, cansados y libres. Frodo dice que se alegra de que Sam esté con él, aquí, al final de todas las cosas.',
  pesoAlto: 'Sientes lo que sintió Frodo: el Anillo pesa demasiado.',
  pesoBajo: 'Llegas más ligero que Frodo: tus decisiones te prepararon para este momento.',
}

export const creditos = {
  proyecto: 'Proyecto final Core IV – Persona y su actuar',
  universidad: 'Universidad de La Sabana · 2026-2',
  libro: 'El Señor de los Anillos, J. R. R. Tolkien.',
  ecos: 'Ecos: Sin miedo a volar (Simone Biles), Matar a un ruiseñor (Harper Lee), La Rosa Blanca (José M. Pellegrin), Crimen y castigo (Fiódor Dostoievski).',
  equipo: '[COMPLETAR NOMBRES DEL EQUIPO]',
  aviso:
    'Proyecto académico sin ánimo de lucro. Los personajes y las obras pertenecen a sus autores. Arte original del equipo; los textos son paráfrasis propias.',
}
