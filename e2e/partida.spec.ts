import { expect, test, type Page } from '@playwright/test'

async function sinScrollHorizontal(page: Page) {
  const w = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(w).toBeLessThanOrEqual(0)
}

test('partida completa en celular: inicio → 8 encrucijadas → pergamino descargado', async ({ page }, info) => {
  await page.goto('./')
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  await page.getByPlaceholder('Tu nombre').fill('Ana')
  await page.getByTestId('comenzar').click()
  for (let i = 0; i < 3; i++) await page.getByTestId('siguiente').click()
  await expect(page.getByRole('heading', { name: '¿Cómo se juega?' })).toBeVisible()
  await sinScrollHorizontal(page)
  await page.getByTestId('al-tablero').click()
  await sinScrollHorizontal(page)
  if (info.project.name === 'movil-390') await page.screenshot({ path: `test-results/tablero.png` })

  let encrucijadas = 0
  for (let vuelta = 0; vuelta < 200; vuelta++) {
    if (await page.getByRole('heading', { name: 'El Monte del Destino' }).isVisible()) break
    const dialogo = page.getByRole('dialog')
    if (await dialogo.isVisible()) {
      const nombre = (await dialogo.getAttribute('aria-label')) ?? ''
      if (nombre.startsWith('Encrucijada')) {
        await dialogo.getByRole('button', { name: '¿Qué haces?' }).click()
        await dialogo.locator('.opcion').nth(encrucijadas % 3).click()
        // alternamos motivos: virtud en las pares, el primero que salga en las impares
        const motivo = encrucijadas % 2 === 0 ? dialogo.locator('[data-marco="virtud"]') : dialogo.locator('.opcion').first()
        await motivo.click()
        await expect(dialogo.getByRole('heading', { name: 'Lo que tu decisión revela' })).toBeVisible()
        if (encrucijadas === 0 && info.project.name === 'movil-390') await page.screenshot({ path: 'test-results/feedback.png', fullPage: false })
        await dialogo.getByRole('button', { name: 'Seguir el camino' }).click()
        encrucijadas++
      } else if (nombre === 'Espejo de Galadriel') {
        await dialogo.locator('textarea').fill('Cuando me cambié de carrera.')
        await dialogo.getByRole('button', { name: 'Guardar' }).click()
      } else {
        await dialogo.getByRole('button').last().click()
      }
      continue
    }
    const tirar = page.getByTestId('tirar')
    if (await tirar.isEnabled()) await tirar.click()
    await page.waitForTimeout(150)
  }
  expect(encrucijadas).toBe(8)
  await page.getByTestId('a-epilogo').click()
  await page.getByTestId('a-pergamino').click()

  const generar = page.getByTestId('generar')
  await page.getByTestId('reflexion').fill('corta')
  await expect(generar).toBeDisabled()
  await page.getByTestId('reflexion').fill('Una vida lograda es decidir con libertad y no caminar solo. Esta semana voy a llamar a mi abuela.')
  await generar.click()
  await expect(page.getByTestId('pergamino')).toContainText('Pergamino de Ana')
  await expect(page.getByTestId('pergamino')).toContainText('voy a llamar a mi abuela')
  await sinScrollHorizontal(page)
  if (info.project.name === 'movil-390') await page.getByTestId('pergamino').screenshot({ path: 'test-results/pergamino.png' })

  const descarga = page.waitForEvent('download')
  await page.getByTestId('descargar').click()
  const d = await descarga
  expect(d.suggestedFilename()).toMatch(/^pergamino-.*\.png$/)
  const ruta = await d.path()
  expect(ruta).toBeTruthy()
})

test('la pantalla #/qr muestra un QR y recargar no da 404', async ({ page }) => {
  await page.goto('./#/qr')
  await expect(page.getByRole('img', { name: /Código QR/ })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('img', { name: /Código QR/ })).toBeVisible()
})
