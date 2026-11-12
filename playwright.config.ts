import { defineConfig, devices } from '@playwright/test'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173/'

export default defineConfig({
  testDir: './e2e',
  timeout: 240_000,
  use: {
    baseURL: BASE,
    trace: 'off',
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
  },
  projects: [
    { name: 'movil-360', use: { ...devices['Pixel 5'], viewport: { width: 360, height: 740 } } },
    { name: 'movil-390', use: { ...devices['iPhone 12'], browserName: 'chromium', viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'npm run build && npx vite preview --port 4173 --strictPort', url: BASE, reuseExistingServer: true, timeout: 120_000 },
})
