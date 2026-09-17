import { expect, test } from '@playwright/test'

test.describe('playground-app', () => {
  let browserErrors: string[]

  test.beforeEach(async ({ page }) => {
    browserErrors = []

    page.on('console', message => {
      if (message.type() === 'error') {
        browserErrors.push(message.text())
      }
    })

    page.on('pageerror', error => browserErrors.push(error.message))

    await page.goto('/', { waitUntil: 'domcontentloaded' })
  })

  test('loads the application document', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('.vx-app')).toBeVisible()
  })

  test('loads an unmatched route', async ({ page }) => {
    await page.goto('/hello-world')

    await expect(page.locator('[data-vx-not-found-path]')).toHaveText(
      ': /hello-world'
    )
  })

  test('reports no browser errors', () => {
    expect(browserErrors).toEqual([])
  })
})
