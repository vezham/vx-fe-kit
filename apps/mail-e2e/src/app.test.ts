import { expect, test } from '@playwright/test'

test.describe('mail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home | /)
  })
})
