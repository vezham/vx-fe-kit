import { expect, test } from '@playwright/test'

test.describe('finance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home | /)
  })
})
