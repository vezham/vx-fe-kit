import { expect, test } from '@playwright/test'

test.describe('books2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home | /)
  })
})
