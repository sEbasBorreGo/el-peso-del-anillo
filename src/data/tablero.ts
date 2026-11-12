import type { Casilla } from '../types'

/**
 * EL TABLERO: 36 casillas (0 a 35).
 * - encrucijada: parada obligatoria (el contenido está en encrucijadas.ts)
 * - sendero (escalera): solo sube si Hábitos ≥ 5
 * - sombra (serpiente): solo baja si Peso del Anillo ≥ 6
 * - eco: tarjeta de otro libro de la clase (ecos.ts)
 * - espejo: Espejo de Galadriel, pregunta para escribir (ver `espejos` abajo)
 * - paisaje: solo una línea de ambiente
 * Regla: un sendero nunca se salta una Encrucijada pendiente (se detiene en ella).
 */
export const tablero: Casilla[] = [
  { n: 0, tipo: 'salida', nombre: 'Bolsón Cerrado', texto: 'Tu casa en la Comarca. Todo empieza aquí.' },
  { n: 1, tipo: 'paisaje', nombre: 'Hobbiton', texto: 'Hobbiton queda atrás. Sam mira hacia atrás por última vez.' },
  { n: 2, tipo: 'eco', nombre: 'Eco' },
  { n: 3, tipo: 'encrucijada', nombre: 'Bolsón Cerrado' },
  { n: 4, tipo: 'paisaje', nombre: 'El Bosque Viejo', texto: 'Los árboles se cierran sobre el camino. Por primera vez sientes que ya no estás en casa.' },
  { n: 5, tipo: 'sendero', nombre: 'Sendero de los elfos', hasta: 9, texto: 'Caminar todos los días te endureció las piernas: lo que repites se vuelve fácil.' },
  { n: 6, tipo: 'paisaje', nombre: 'La Cima de los Vientos', texto: 'Jinetes negros en la noche. Frodo siente el frío de una herida que no se ve.' },
  { n: 7, tipo: 'encrucijada', nombre: 'Rivendel' },
  { n: 8, tipo: 'espejo', nombre: 'Espejo de Galadriel' },
  { n: 9, tipo: 'paisaje', nombre: 'Moria', texto: 'Minas oscuras. Gandalf cae al abismo para que los demás puedan salir.' },
  { n: 10, tipo: 'sombra', nombre: 'Sombra en Moria', hasta: 6, texto: 'Los vicios también se repiten solos: una pequeña concesión, y otra, hasta que ya no decides tú.' },
  { n: 11, tipo: 'encrucijada', nombre: 'Amon Hen' },
  { n: 12, tipo: 'eco', nombre: 'Eco' },
  { n: 13, tipo: 'sendero', nombre: 'Sendero de las piedras', hasta: 17, texto: 'Ya sabes bajar riscos sin pensarlo. La práctica te abrió un paso.' },
  { n: 14, tipo: 'paisaje', nombre: 'El río Anduin', texto: 'La Compañía se rompe. Frodo y Sam siguen solos, río abajo.' },
  { n: 15, tipo: 'encrucijada', nombre: 'Emyn Muil' },
  { n: 16, tipo: 'espejo', nombre: 'Espejo de Galadriel' },
  { n: 17, tipo: 'paisaje', nombre: 'Las Ciénagas de los Muertos', texto: 'Luces en el agua que llaman a seguirlas. Gollum dice: no las miren.' },
  { n: 18, tipo: 'sombra', nombre: 'Sombra en las ciénagas', hasta: 14, texto: 'Lo que cedes una vez cuesta menos ceder la segunda. Así se forma una segunda naturaleza al revés.' },
  { n: 19, tipo: 'encrucijada', nombre: 'Ithilien' },
  { n: 20, tipo: 'paisaje', nombre: 'La Puerta Negra', texto: 'La entrada principal de Mordor está cerrada y vigilada. Hay que buscar otro camino.' },
  { n: 21, tipo: 'sendero', nombre: 'Escalera escondida', hasta: 26, texto: 'La constancia te enseñó a subir paso a paso. El camino difícil ya no te asusta igual.' },
  { n: 22, tipo: 'eco', nombre: 'Eco' },
  { n: 23, tipo: 'paisaje', nombre: 'Las escaleras de Cirith Ungol', texto: 'Escalones interminables en la roca. Gollum se adelanta y desaparece.' },
  { n: 24, tipo: 'encrucijada', nombre: 'Cirith Ungol' },
  { n: 25, tipo: 'sombra', nombre: 'Sombra de la torre', hasta: 20, texto: 'El Anillo pesa más cuando lo alimentas con excusas. Te arrastra hacia lo que ya conoces.' },
  { n: 26, tipo: 'paisaje', nombre: 'La torre de los orcos', texto: 'Ruido de peleas entre orcos. En el caos, Sam encuentra una forma de entrar.' },
  { n: 27, tipo: 'sendero', nombre: 'Atajo entre la ceniza', hasta: 31, texto: 'Ya no te quejas por cada paso: el hábito de seguir te da un atajo.' },
  { n: 28, tipo: 'paisaje', nombre: 'Llanura de Gorgoroth', texto: 'Ceniza hasta donde alcanza la vista. Ni un pájaro, ni una planta.' },
  { n: 29, tipo: 'encrucijada', nombre: 'Mordor' },
  { n: 30, tipo: 'eco', nombre: 'Eco' },
  { n: 31, tipo: 'paisaje', nombre: 'Una estrella entre las nubes', texto: 'Sam ve una estrella entre el humo y entiende que la sombra es pequeña y pasajera.' },
  { n: 32, tipo: 'sombra', nombre: 'Sombra del Ojo', hasta: 28, texto: 'El Ojo busca a quien carga el Anillo con hambre. Cuanto más pesa, más fácil te encuentra.' },
  { n: 33, tipo: 'encrucijada', nombre: 'Sammath Naur' },
  { n: 34, tipo: 'espejo', nombre: 'Espejo de Galadriel' },
  { n: 35, tipo: 'meta', nombre: 'Monte del Destino' },
]

/** Regiones del mapa (para pintar el fondo y las etiquetas). */
export const regiones = [
  { desde: 0, hasta: 4, nombre: 'La Comarca', color: '#cfdcae' },
  { desde: 5, hasta: 8, nombre: 'Rivendel', color: '#d9e3c4' },
  { desde: 9, hasta: 12, nombre: 'Moria y el Río', color: '#d6cdb6' },
  { desde: 13, hasta: 18, nombre: 'Emyn Muil y las Ciénagas', color: '#cbc7ad' },
  { desde: 19, hasta: 22, nombre: 'Ithilien', color: '#c8d4a8' },
  { desde: 23, hasta: 27, nombre: 'Cirith Ungol', color: '#bdb4a8' },
  { desde: 28, hasta: 35, nombre: 'Mordor', color: '#aaa29b' },
]

/** Espejos de Galadriel: preguntas sobre tu propia vida (respuesta opcional, máx. 280 caracteres). */
export const espejos: Record<number, { titulo: string; pregunta: string }> = {
  8: {
    titulo: 'El agua muestra tu “yo lo hago”',
    pregunta: '¿En qué momento de tu vida dijiste “yo lo hago” aunque te diera miedo? ¿Qué pasó?',
  },
  16: {
    titulo: 'El agua muestra quién vas siendo',
    pregunta: '¿Qué hábito te gustaría que fuera tu “segunda naturaleza” dentro de cinco años?',
  },
  34: {
    titulo: 'El agua muestra a quien te cargó',
    pregunta: '¿Quién ha sido tu Sam? ¿Quién te ha cargado cuando tú ya no podías?',
  },
}

export const META = 35
