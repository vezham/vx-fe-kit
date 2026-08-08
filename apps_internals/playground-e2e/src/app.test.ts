import { expect, test } from '@playwright/test'

test.describe('playground', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
  })

  test('loads app shell', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('.vx-app')).toBeVisible()
  })
})
