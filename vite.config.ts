/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' hace que el build funcione igual en Vercel, Netlify o GitHub Pages (subcarpeta).
export default defineConfig({
  base: './',
  plugins: [react()],
  test: { globals: true, environment: 'node', include: ['src/**/*.test.ts'] },
})
