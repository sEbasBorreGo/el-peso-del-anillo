import type { Encrucijada } from '../types'

/**
 * LAS 8 ENCRUCIJADAS
 * ------------------
 * Aquí vive todo el texto de las decisiones. Se puede editar sin tocar la lógica.
 * - temas[0] es el tema PRINCIPAL: es el que sube +2 cuando el motivo es de virtud.
 * - efectos de las acciones: pequeños (±1). Los puntos grandes salen del MOTIVO
 *   (ver src/lib/logica.ts → efectosDelMotivo).
 * - Los motivos se muestran en orden aleatorio y sin la etiqueta del marco.
 */
export const encrucijadas: Encrucijada[] = [
  {
    id: 1,
    casilla: 3,
    lugar: 'Bolsón Cerrado',
    titulo: 'La carta que nadie quiere',
    personaje: 'Frodo',
    temas: ['libertad'],
    escena:
      'Gandalf te cuenta la verdad: el anillo que heredaste de Bilbo es el Anillo Único. Si te quedas en la Comarca, el enemigo vendrá a buscarlo y tu tierra pagará el precio. Nadie te obliga. Tienes una vida tranquila, amigos y la mejor despensa del pueblo.',
    acciones: [
      { id: 'a', texto: '“Me voy yo. Si me lo quedo aquí, pongo en riesgo a todos.”', efectos: { libertad: 1 } },
      { id: 'b', texto: '“Primero organizo todo con calma. Unos meses más no cambian nada.”', efectos: { habitos: -1, autenticidad: 1 } },
      { id: 'c', texto: '“Gandalf, tómalo tú. Eres más sabio y más fuerte que yo.”', efectos: { libertad: -1, etica: 1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque es mi responsabilidad, aunque me dé miedo. Quiero ser alguien que responde.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque así me quito este problema de encima lo más rápido posible.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque es lo que salva a más gente, aunque yo pierda todo.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque cualquier opción es igual de válida; nadie puede decirme qué es lo correcto.' },
    ],
    feedbackAcciones: {
      a: 'Usaste tu libertad PARA algo, no solo te libraste DE algo. La libertad no es tener todas las puertas abiertas para siempre: crece cuando te comprometes con una.',
      b: 'Postergar también es decidir. A veces “más adelante” es la forma elegante de no elegir, y mientras tanto las consecuencias siguen caminando.',
      c: 'Pasarle la decisión a alguien “mejor” se siente prudente, pero hay decisiones que nadie puede tomar por ti. Gandalf mismo no lo quiere tocar: sabe que ese poder también lo dañaría a él.',
    },
    feedbackMotivos: {
      virtud:
        'Tu razón no fue escapar ni calcular: fue hacerte cargo. Eso es lo que convierte una elección en algo que te forma por dentro.',
      hedonismo:
        'Ojo: puedes hacer algo valiente por una razón cómoda. Si lo que buscas es quitarte el problema de encima, la próxima vez que algo moleste también vas a buscar la salida más rápida.',
      utilitarismo:
        'Pensar en los demás está bien. Pero si todo se reduce a sumar y restar vidas, tú quedas como una ficha más del cálculo, y algún día el cálculo puede pedirte algo que no deberías hacer.',
      relativismo:
        'Si todas las opciones valen igual, ninguna te compromete. Y si nada te compromete, nadie, ni siquiera tú, puede contar contigo.',
    },
    quepaso:
      'Frodo se demora en salir, pero al final decide irse él mismo. Gandalf rechaza el Anillo porque teme lo que haría con él, incluso queriendo hacer el bien.',
    tuVida:
      '¿Hay una decisión importante (carrera, relación, cambiar algo de ti) que estés pateando con un “más adelante”?',
  },
  {
    id: 2,
    casilla: 7,
    lugar: 'Rivendel',
    titulo: 'El Concilio: ¿quién lo lleva?',
    personaje: 'Frodo',
    temas: ['libertad', 'autenticidad'],
    escena:
      'En Rivendel se reúnen elfos, enanos, hombres y hobbits. Discuten durante horas. Nadie quiere cargar el Anillo; cada uno tiene una excusa o una idea mejor. Tú eres el más pequeño de la sala.',
    acciones: [
      { id: 'a', texto: 'Te pones de pie: “Yo lo llevo, aunque no sé el camino.”', efectos: { autenticidad: 1 } },
      { id: 'b', texto: 'Te quedas callado. Ya hiciste bastante trayéndolo hasta aquí.', efectos: { libertad: -1, habitos: 1 } },
      { id: 'c', texto: 'Propones que lo lleve el más fuerte del grupo.', efectos: { etica: 1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque siento que esto es lo que me toca a mí, aunque no me sienta capaz.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque quiero que esta discusión eterna se acabe ya.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque es la opción con más probabilidades de que la misión salga bien.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque en el fondo da igual quién lo lleve; cada uno ve las cosas a su manera.' },
    ],
    feedbackAcciones: {
      a: 'Frodo no se ofrece porque sea el más capaz, sino porque descubre que eso es lo suyo. Autenticidad es eso: no copiar al más fuerte, sino responder desde quien eres.',
      b: 'Descansar en lo que ya hiciste es muy humano. Pero la libertad no se gasta de una: cada día vuelve a preguntarte qué vas a hacer con ella.',
      c: 'Suena lógico. Pero el más fuerte también es el más tentado. En esta historia la fuerza no es lo que más se necesita.',
    },
    feedbackMotivos: {
      virtud:
        'Respondiste desde lo que sientes que te toca, no desde lo que se ve bien en la sala. Ahí la decisión deja de ser un trámite y se vuelve tuya.',
      hedonismo:
        'Las discusiones largas cansan, de verdad. Pero si decides para que se acabe la incomodidad, la decisión la tomó tu cansancio, no tú.',
      utilitarismo:
        'Calcular probabilidades no está mal, pero aquí nadie sabe cuál es la opción “más probable”. Cuando el cálculo se vuelve la única brújula, uno deja de preguntarse quién quiere ser.',
      relativismo:
        '“Da igual” suena tranquilo, pero es una forma de salirse del juego. Si da igual quién lo lleve, también da igual lo que tú hagas, y eso no es libertad, es ausencia.',
    },
    quepaso:
      'Frodo se ofrece. Sam, que estaba escondido escuchando, se niega a dejarlo ir solo. Así se forma la Compañía de los nueve.',
    tuVida: '¿Alguna vez dijiste “no soy capaz” para no tener que intentarlo?',
  },
  {
    id: 3,
    casilla: 11,
    lugar: 'Amon Hen',
    titulo: 'La propuesta de Boromir',
    personaje: 'Boromir',
    temas: ['etica'],
    subtema: 'Liderazgo ético',
    escena:
      'Ahora eres Boromir, capitán de Gondor. Tu ciudad está a punto de caer y tu gente muere cada día. El Anillo está ahí, en manos de un hobbit asustado. Con él podrías salvar a tu pueblo. Frodo está solo en el bosque.',
    acciones: [
      { id: 'a', texto: 'Le pides el Anillo con insistencia: “es por el bien de todos”.', efectos: { etica: -1, libertad: 1 } },
      { id: 'b', texto: 'Le cuentas a Frodo lo que estás sintiendo y le pides que se aleje de ti.', efectos: { autenticidad: 1 } },
      { id: 'c', texto: 'No dices nada y vuelves con el grupo, aunque la idea no se te va de la cabeza.', efectos: { habitos: 1, autenticidad: -1 } },
    ],
    motivos: [
      { id: 'u', marco: 'utilitarismo', texto: 'Porque miles de vidas valen más que lo que quiera un solo hobbit.' },
      { id: 'v', marco: 'virtud', texto: 'Porque un líder no usa a otros como medios, ni siquiera para un buen fin.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque quiero ser yo el que salve a Gondor y que me lo reconozcan.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque en la guerra no hay bien ni mal, solo lo que funciona.' },
    ],
    feedbackAcciones: {
      a: 'Este es el razonamiento utilitarista puro: el fin (salvar Gondor) justifica el medio (quitárselo a Frodo). Suena noble, y por eso es tan peligroso: el Anillo convence con buenas razones.',
      b: 'Decir en voz alta tu propia tentación es una forma de liderazgo ético: no te escondes y proteges al otro de ti mismo.',
      c: 'Callar no es lo mismo que vencer la tentación. Lo que no se nombra suele crecer en silencio.',
    },
    feedbackMotivos: {
      virtud:
        'Pusiste un límite que no depende del resultado: a las personas no se les usa. Eso es lo que hace un líder ético, aunque el costo sea alto.',
      hedonismo:
        'Querer ser el héroe es muy entendible. Pero cuando el motor es el reconocimiento, los demás terminan siendo escenario de tu historia.',
      utilitarismo:
        'Es la lógica más fuerte del libro y la más tramposa: si el fin justifica los medios, cualquier medio queda justificado con un fin lo bastante grande.',
      relativismo:
        '“Solo lo que funciona” parece realista. Pero si no hay bien ni mal, tampoco hay forma de decir que lo que hace el enemigo está mal.',
    },
    quepaso:
      'Boromir intenta quitarle el Anillo a Frodo y Frodo huye. Boromir se arrepiente enseguida y muere defendiendo a Merry y a Pippin. Su caída y su redención muestran que nadie queda definido para siempre por su peor momento.',
    tuVida: '¿Has justificado algo que sabías que no estaba bien con un “es por una buena causa”?',
  },
  {
    id: 4,
    casilla: 15,
    lugar: 'Emyn Muil',
    titulo: 'La criatura que los sigue',
    personaje: 'Frodo y Sam',
    temas: ['etica', 'habitos'],
    escena:
      'Una criatura flaca y desesperada los viene siguiendo hace semanas: Gollum. Hace siglos fue alguien parecido a un hobbit, llamado Sméagol, hasta que el Anillo lo consumió. Lo atrapan. Sam quiere amarrarlo y dejarlo; Gollum suplica. Él conoce el camino a Mordor.',
    acciones: [
      { id: 'a', texto: 'Le perdonas la vida y lo llevas como guía.', efectos: { etica: 1 } },
      { id: 'b', texto: 'Lo amarras y lo dejas atrás. No se puede confiar en él.', efectos: { habitos: 1, etica: -1 } },
      { id: 'c', texto: 'Lo usas de guía, pero solo mientras sirva. Después ya verás.', efectos: { libertad: 1, etica: -1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque veo en él lo que yo podría llegar a ser, y merece una oportunidad.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque lo importante es llegar; lo demás es secundario.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque no quiero cargar con la culpa de hacerle daño.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque ¿quién soy yo para decir quién es bueno o malo?' },
    ],
    feedbackAcciones: {
      a: 'Gandalf le había dicho a Frodo que no se apurara a decidir quién merece morir. La misericordia no es ingenuidad: es ver a la persona detrás de lo que ha hecho.',
      b: 'Es prudente y se entiende. Pero mira a Gollum: es el resultado de siglos repitiendo el mismo hábito. Los hábitos no solo hacen cosas, te hacen a ti.',
      c: 'Usar a alguien como herramienta es tratarlo como cosa. Funciona un rato, pero va cambiando a quien lo hace.',
    },
    feedbackMotivos: {
      virtud:
        'Te reconociste en él. Esa compasión no nace de un día para otro: es un hábito del corazón, y es justo el que el Anillo destruyó en Sméagol.',
      hedonismo:
        'No querer sentir culpa no es lo mismo que querer el bien del otro. En el primer caso, el centro sigues siendo tú.',
      utilitarismo:
        'Si lo único que importa es llegar, las personas del camino se vuelven medios. Y uno se acostumbra a mirar así a los demás.',
      relativismo:
        'No juzgar a la persona está bien. Pero no poder decir que algo está mal no es humildad: es quedarse sin brújula.',
    },
    quepaso:
      'Frodo le tiene compasión y lo hace su guía. Esa decisión, que parecía pequeña, va a ser clave al final del viaje.',
    tuVida: '¿Qué hábito repites hoy que, si sigues así cinco años, te va a definir? ¿Para bien o para mal?',
  },
  {
    id: 5,
    casilla: 19,
    lugar: 'Ithilien',
    titulo: 'El capitán que no lo toma',
    personaje: 'Faramir',
    temas: ['habitos'],
    subtema: 'Liderazgo ético',
    escena:
      'Ahora eres Faramir, el hermano menor de Boromir. Capturas a dos hobbits y descubres que llevan el arma que tu hermano tanto deseaba, la que podría hacer que tu papá por fin te valore. Tus hombres esperan tu orden.',
    acciones: [
      { id: 'a', texto: 'Los dejas ir y además les das provisiones.', efectos: { etica: 1 } },
      { id: 'b', texto: 'Los llevas a Gondor para que tu padre decida.', efectos: { habitos: 1, libertad: -1 } },
      { id: 'c', texto: 'Les quitas el Anillo “solo para custodiarlo”.', efectos: { libertad: 1, etica: -1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque no tomaría esto ni aunque lo encontrara tirado en el camino. No es quien soy.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque por fin mi padre me miraría como miraba a mi hermano.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque Gondor lo necesita y la ley está de mi lado.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque cada quien carga lo suyo. No es asunto mío.' },
    ],
    feedbackAcciones: {
      a: 'Faramir casi ni lo duda. Eso es una virtud: cuando un hábito bueno está bien arraigado, lo correcto deja de costar tanto. Por eso los hábitos son libertad, no cárcel.',
      b: 'Seguir el reglamento parece lo seguro, pero aquí sería entregarle el Anillo a alguien que no lo resistiría. Liderar a veces es asumir tú la decisión.',
      c: '“Solo para custodiarlo” es exactamente como empieza la corrupción. Las peores decisiones casi nunca se presentan como malas.',
    },
    feedbackMotivos: {
      virtud:
        'Tu respuesta salió del carácter, no de un cálculo del momento. Eso es un hábito hecho segunda naturaleza: decide por ti antes de que llegue la tentación.',
      hedonismo:
        'Querer que tu papá te valore es de lo más humano que hay. Pero si eso es lo que decide, la herida está manejando el timón.',
      utilitarismo:
        'Que algo sea legal y útil no lo vuelve bueno. Gondor “lo necesita”, sí, y justamente por eso lo destruiría.',
      relativismo:
        '“No es asunto mío” suena a respeto, pero cuando tienes el poder de actuar, desentenderte también es una decisión.',
    },
    quepaso:
      'Faramir los deja ir. Es lo contrario de su hermano, no porque sea más fuerte, sino porque tiene el carácter formado.',
    tuVida: '¿Qué decisión buena te sale fácil hoy porque la has repetido mucho? ¿Cuál te gustaría que te saliera así?',
  },
  {
    id: 6,
    casilla: 24,
    lugar: 'Cirith Ungol',
    titulo: 'Sam solo',
    personaje: 'Sam',
    temas: ['autenticidad', 'libertad'],
    escena:
      'Ahora eres Sam. Una araña gigante ataca a Frodo y lo deja inmóvil. Crees que está muerto. Estás solo en la frontera de Mordor, con el Anillo en la mano y toda la misión encima. Eres jardinero, no héroe.',
    acciones: [
      { id: 'a', texto: 'Tomas el Anillo y sigues tú solo con la misión.', efectos: { libertad: 1 } },
      { id: 'b', texto: 'Te quedas con el cuerpo de Frodo. No lo vas a abandonar.', efectos: { etica: 1 } },
      { id: 'c', texto: 'Te devuelves a buscar ayuda.', efectos: { habitos: 1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque Frodo habría querido que esto se terminara, y yo no lo voy a dejar a medias.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque no soporto el dolor de quedarme aquí.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque calculo que es la opción con más posibilidades.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque ya nada importa de verdad; cualquier camino da igual.' },
    ],
    feedbackAcciones: {
      a: 'Sam toma una decisión enorme sin dejar de ser Sam. Más adelante el Anillo le muestra una visión de sí mismo como un gran señor que convierte Mordor en un jardín. La rechaza: sabe que es jardinero, y que un jardín pequeño cuidado con sus manos le basta. Eso es autenticidad.',
      b: 'La lealtad es de lo más grande del libro. Pero a veces ser fiel a alguien es seguir su propósito, no solo quedarse a su lado.',
      c: 'Pedir ayuda muchas veces es lo más sabio. Aquí el tiempo se acaba; decidir también es aceptar que no siempre hay una opción sin pérdida.',
    },
    feedbackMotivos: {
      virtud:
        'Decidiste desde lo que te une a Frodo y a la misión, no desde el miedo. Eso es ser auténtico: actuar en coherencia con lo que amas, incluso cuando nadie te ve.',
      hedonismo:
        'El dolor es real y nadie te lo puede reprochar. Pero huir del dolor como criterio te puede llevar justo lejos de lo que más te importa.',
      utilitarismo:
        'Calcular en medio del duelo es casi imposible. Y cuando el cálculo reemplaza al vínculo, uno se pierde de vista a sí mismo.',
      relativismo:
        '“Ya nada importa” es lo que dice el cansancio cuando todo se derrumba. Escúchalo, pero no lo dejes decidir: la autenticidad es justo recordar qué sí importa.',
    },
    quepaso:
      'Sam toma el Anillo, luego descubre que Frodo está vivo, lo rescata y se lo devuelve. Sam carga con todo sin pedir que se lo reconozcan.',
    tuVida: '¿Qué versión “más grande” de ti te venden las redes o la presión del parche que en realidad no eres tú?',
  },
  {
    id: 7,
    casilla: 29,
    lugar: 'Mordor',
    titulo: 'La última reserva de agua',
    personaje: 'Sam',
    temas: ['habitos', 'etica'],
    subtema: 'Liderazgo de servicio',
    escena:
      'Mordor es un desierto de ceniza. Queda muy poca agua y comida. Frodo ya casi no puede caminar porque el Anillo pesa cada vez más. Tú también tienes sed.',
    acciones: [
      { id: 'a', texto: 'Le das casi todo a Frodo y tú aguantas.', efectos: { etica: 1 } },
      { id: 'b', texto: 'Lo divides exactamente en partes iguales.', efectos: { autenticidad: 1 } },
      { id: 'c', texto: 'Tomas un poco más para ti: si tú caes, nadie lo carga a él.', efectos: { libertad: 1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque cuidarlo es lo que le da sentido a este viaje para mí.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque es el reparto que más probabilidades da de llegar.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque ya no aguanto más la sed.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque no hay una forma correcta de repartir; cualquiera vale.' },
    ],
    feedbackAcciones: {
      a: 'El servicio es una forma de liderazgo: Sam no da órdenes, pero sin él la misión no existe. Ojo: servir no es desaparecer; hasta Sam necesita llegar vivo.',
      b: 'La justicia como igualdad es razonable. La pregunta es si tratar igual siempre es tratar bien, cuando uno de los dos carga algo mucho más pesado.',
      c: 'Tu razón tiene lógica, y cuidarte también es responsabilidad. Todo depende del motivo: ¿te cuidas para seguir sirviendo o te estás justificando?',
    },
    feedbackMotivos: {
      virtud:
        'Para ti cuidar no es una carga extra, es el sentido del viaje. Eso no se improvisa en Mordor: se viene formando desde la Comarca, gesto por gesto.',
      hedonismo:
        'La sed es real y tu cuerpo manda. Pero si la decisión la toma solo la necesidad del momento, mañana va a mandar otra vez, y cada vez más fuerte.',
      utilitarismo:
        'Optimizar el reparto suena eficiente. Pero Frodo no es un recurso de la misión; es tu amigo. El cálculo no ve esa diferencia.',
      relativismo:
        'Si cualquier reparto vale, da igual quién cargue qué. Y justo en este punto del viaje, no da igual.',
    },
    quepaso:
      'Sam raciona todo para Frodo y, cuando Frodo ya no puede más, le dice que no puede cargar el Anillo por él, pero sí puede cargarlo a él. Y se lo sube a la espalda.',
    tuVida: '¿A quién estás “cargando” hoy? ¿O quién te está cargando a ti sin que lo hayas notado?',
  },
  {
    id: 8,
    casilla: 33,
    lugar: 'El borde del fuego',
    titulo: 'El borde del fuego',
    personaje: 'Frodo',
    temas: ['libertad', 'habitos', 'autenticidad', 'etica'],
    escena:
      'Llegaste. El fuego está ahí abajo. Solo tienes que soltar el Anillo. Pero después de tantos días cargándolo, ya no se siente como algo que llevas: se siente como parte de ti.',
    acciones: [
      { id: 'a', texto: 'Lo sueltas.', efectos: { libertad: 1 } },
      { id: 'b', texto: 'Le pides a Sam que lo haga él, porque tú ya no puedes.', efectos: { autenticidad: 1 } },
      { id: 'c', texto: 'Dudas… y te lo pones en el dedo.', efectos: { etica: -1 } },
    ],
    motivos: [
      { id: 'v', marco: 'virtud', texto: 'Porque esto fue lo que elegí ser desde el principio.' },
      { id: 'h', marco: 'hedonismo', texto: 'Porque ya no quiero sufrir más.' },
      { id: 'u', marco: 'utilitarismo', texto: 'Porque el mundo entero depende de esto.' },
      { id: 'r', marco: 'relativismo', texto: 'Porque quizá el Anillo no es tan malo como dicen.' },
    ],
    feedbackAcciones: {
      a: 'Elegiste soltar. Ahora mira lo que pasó en el libro: a veces ni la mejor intención alcanza en el último segundo.',
      b: 'Reconocer que ya no puedes no es fracasar. Pedir ayuda en el límite también es una forma de libertad.',
      c: 'Elegiste lo que eligió Frodo. No es una elección “de villano”: es lo que pasa cuando algo te ha pesado demasiado tiempo.',
    },
    feedbackMotivos: {
      virtud:
        'Tu motivo mira hacia atrás, a todo el camino. Ese es el punto: el último paso se sostiene en los primeros.',
      hedonismo:
        'Querer que el sufrimiento pare es lo más natural del mundo. Lo que te sostiene en ese momento no son las ganas, es lo que fuiste construyendo antes.',
      utilitarismo:
        'Es verdad que el mundo depende de esto. Pero en el borde del fuego, las grandes razones pesan menos que lo que ya eres.',
      relativismo:
        'Esa duda es exactamente la voz del Anillo: “quizá no es tan malo”. Por eso las decisiones de antes importan tanto.',
    },
    quepaso:
      'En el libro, Frodo no lo logra: al borde del fuego dice que el Anillo es suyo y se lo pone. Gollum aparece, le arranca el dedo con el Anillo, pierde el equilibrio y cae al fuego. El Anillo se destruye. La misión se cumple gracias a la misericordia que Frodo tuvo con Gollum mucho antes, y gracias a Sam, que lo cargó hasta ahí. Nuestra libertad tiene límites: no somos héroes que lo logran todo solos. Las decisiones pequeñas de antes (perdonar, servir, ser fiel) sostienen el momento en que ya no podemos más.',
    tuVida: '¿Qué te ayuda a sostenerte cuando tu fuerza de voluntad no alcanza?',
  },
]

export const encrucijadaPorCasilla = (casilla: number) => encrucijadas.find((e) => e.casilla === casilla)
export const encrucijadaPorId = (id: number) => encrucijadas.find((e) => e.id === id)!
