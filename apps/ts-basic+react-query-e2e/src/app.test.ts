import { expect, test } from '@playwright/test'

test.describe('ts-basic+react-query', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home | /)
  })
})
