/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: '#f4ead5',
        pergamino: '#ead9b5',
        tinta: '#3b2614',
        tinta2: '#5c4128',
        oro: '#b8860b',
        oroclaro: '#e3b341',
        brasa: '#a8321e',
        comarca: '#4f7a3a',
        ceniza: '#5f5a55',
      },
      fontFamily: {
        titulo: ['Cinzel', 'Georgia', 'serif'],
        texto: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
