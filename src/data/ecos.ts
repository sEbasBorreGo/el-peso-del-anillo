import type { Eco } from '../types'

/**
 * ECOS: otros libros de la clase que "resuenan" con el viaje.
 * Solo hechos generales, sin citas inventadas.
 */
export const ecos: Eco[] = [
  {
    id: 'biles',
    casilla: 2,
    libro: 'Sin miedo a volar',
    autor: 'Simone Biles',
    temas: 'Autenticidad · Libertad',
    historia:
      'Simone creció en hogares de acogida antes de que sus abuelos la adoptaran, y llegó a ser la gimnasta más laureada de la historia. Años después, en plenos Juegos Olímpicos, decidió retirarse de varias finales para cuidar su salud mental, aunque el mundo entero esperaba que compitiera.',
    conexion:
      'Como Sam cuando rechaza la versión “grande” de sí mismo que le ofrece el Anillo, ella eligió ser fiel a quien es por encima de lo que todos esperaban de ella.',
    pregunta: '¿Te atreverías a decirle “no” a algo que todo el mundo espera de ti?',
  },
  {
    id: 'ruisenor',
    casilla: 12,
    libro: 'Matar a un ruiseñor',
    autor: 'Harper Lee',
    temas: 'Ética · Liderazgo ético',
    historia:
      'Atticus Finch, abogado en el sur de Estados Unidos en los años 30, defiende a un hombre negro inocente sabiendo que el jurado ya lo condenó antes de empezar. Su hija Scout aprende de él, mirándolo, qué es la justicia.',
    conexion:
      'Como Frodo cuando se pone de pie en el Concilio, Atticus actúa con integridad aunque sabe que lo más probable es perder. Y lidera sin dar discursos: con el ejemplo.',
    pregunta: '¿Vale la pena hacer lo correcto si sabes que no vas a ganar?',
  },
  {
    id: 'rosablanca',
    casilla: 22,
    libro: 'La Rosa Blanca',
    autor: 'José M. Pellegrin',
    temas: 'Libertad · Conciencia',
    historia:
      'Un grupo de universitarios en la Alemania nazi, entre ellos los hermanos Hans y Sophie Scholl, repartió panfletos contra el régimen cuando quedarse callado era lo más seguro. Lo pagaron con su vida.',
    conexion:
      'Como los hobbits, eran “pequeños” frente a un poder enorme. Y aun así eligieron. Tenían tu edad.',
    pregunta: '¿Qué te haría hablar cuando lo cómodo es quedarse callado?',
  },
  {
    id: 'crimen',
    casilla: 30,
    libro: 'Crimen y castigo',
    autor: 'Fiódor Dostoievski',
    temas: 'Ética · Utilitarismo',
    historia:
      'Raskólnikov, un estudiante pobre, se convence de que su inteligencia le da derecho a matar a una prestamista usurera “por el bien de muchos”. Después del crimen, su conciencia no lo deja en paz.',
    conexion:
      'Es el mismo razonamiento de Boromir en Amon Hen: una buena razón para una mala acción. Y en los dos casos, por dentro, algo se rompe.',
    pregunta: '¿Puede alguien justificar una mala acción con una buena razón?',
  },
]

export const ecoPorCasilla = (casilla: number) => ecos.find((e) => e.casilla === casilla)
export const ecoPorId = (id: string) => ecos.find((e) => e.id === id)!
