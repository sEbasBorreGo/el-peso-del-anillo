# El Peso del Anillo — un viaje de decisiones

Juego web educativo para **Core IV: Persona y su actuar** (Universidad de La Sabana, 2026-2).
Un tablero individual (estilo serpientes y escaleras) de la Comarca al Monte del Destino. En cada
Encrucijada eliges **qué haces** y **por qué lo haces**; tus motivos cambian el tablero.

> ¿Qué hace que alguien pequeño sea capaz de cargar con algo enorme?

- **URL pública:** `PENDIENTE` (se completa al desplegar)
- **QR:** `qr.png` en la raíz del repo (y `public/qr.png`). Dentro del juego: portada → “Ver QR”, o la dirección `…/#/qr` para proyectarlo en grande. Esa pantalla genera el QR con la URL donde esté abierto el juego, así que siempre apunta bien.

## Cómo se juega (resumen)

1. Tira el dado. Hay **8 Encrucijadas** (casillas 3, 7, 11, 15, 19, 24, 29, 33): siempre te detienes en ellas.
2. En cada una: Paso 1 “¿Qué haces?” (3 acciones) → Paso 2 “¿Por qué lo haces?” (4 motivos en orden aleatorio y sin etiqueta: hedonismo, utilitarismo, relativismo, virtud).
3. Feedback “Lo que tu decisión revela”: análisis de la acción, del motivo (con su marco ético), qué pasó en el libro y una pregunta para tu vida.
4. Medidores: Libertad, Hábitos, Autenticidad, Ética (0–10, empiezan en 3) y Peso del Anillo (0–10, empieza en 2).
5. **Senderos** (5, 13, 21, 27) solo te suben si Hábitos ≥ 5. **Sombras** (10, 18, 25, 32) solo te bajan si Peso ≥ 6. Si Peso ≥ 8, el dado solo saca 1–3. Un sendero nunca se salta una Encrucijada pendiente.
6. **Ecos** (2, 12, 22, 30): otros libros de la clase. **Espejos de Galadriel** (8, 16, 34): escribes algo de tu vida (opcional).
7. Final: Monte del Destino → Epílogo → **Pergamino de la vida lograda** (pregunta abierta obligatoria de mínimo 20 caracteres, descarga PNG y copiar texto).

### Puntaje
- Acciones: ±1 a uno o dos temas.
- Motivo de **virtud**: +2 al tema principal de la encrucijada, +1 Autenticidad, +1 Hábitos, −1 Peso.
- **Hedonismo**: +1 Peso, −1 Hábitos · **Utilitarismo**: +1 Peso, −1 Ética · **Relativismo**: +1 Peso, −1 Autenticidad.
- Todo se limita entre 0 y 10. Ajustes en `src/lib/logica.ts` (`efectosDelMotivo`, `calcularPerfil`, umbrales arriba del archivo).

## Cómo editar los textos (sin tocar la lógica)

| Archivo | Qué contiene |
|---|---|
| `src/data/encrucijadas.ts` | Las 8 encrucijadas: escena, acciones, motivos, feedback, “qué pasó”, “llévalo a tu vida”. |
| `src/data/ecos.ts` | Las 4 tarjetas de Eco (otros libros). |
| `src/data/tablero.ts` | Las 36 casillas, líneas de paisaje, frases de senderos/sombras, preguntas de los Espejos, regiones del mapa. |
| `src/data/textos.ts` | Nombres y definiciones de los 4 temas, marcos éticos, contexto inicial, instrucciones, perfiles finales, epílogo, vida lograda, **créditos (nombres del equipo)**. |

Para poner los nombres del equipo: busquen `[COMPLETAR NOMBRES DEL EQUIPO]` en `src/data/textos.ts`.

## Desarrollo

```bash
npm install
```

```bash
npm run dev
```

```bash
npm test
```

```bash
npm run build
```

Prueba E2E en viewport de celular (360×740 y 390×844), juega una partida completa y descarga el pergamino:

```bash
npx playwright test
```

## Desplegar / redesplegar

Sitio 100 % estático (carpeta `dist`), sin backend ni claves. `base: './'` en `vite.config.ts` hace que funcione en la raíz de un dominio o en una subcarpeta, y la navegación usa estado interno + `#/qr`, así que recargar nunca da 404.

**Vercel** (con sesión iniciada o un token):

```bash
npx vercel --prod
```

**Netlify:**

```bash
npm run build && npx netlify deploy --prod --dir=dist
```

**GitHub Pages:** ya viene el workflow `.github/workflows/pages.yml`. En el repo: Settings → Pages → Source: *GitHub Actions*, y cada push a `main` despliega.

Después de desplegar, regenerar el QR con la URL final y hacer commit:

```bash
npm run qr -- https://LA-URL-FINAL
```

## Créditos

Proyecto final Core IV – Persona y su actuar · Universidad de La Sabana · 2026-2.
Libro: *El Señor de los Anillos*, J. R. R. Tolkien. Ecos: *Sin miedo a volar* (Simone Biles), *Matar a un ruiseñor* (Harper Lee), *La Rosa Blanca* (José M. Pellegrin), *Crimen y castigo* (Fiódor Dostoievski).
Proyecto académico sin ánimo de lucro; personajes y obras pertenecen a sus autores. Arte original (SVG/CSS); los textos son paráfrasis propias.
