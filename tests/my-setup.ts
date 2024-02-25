import * as playwright from '@playwright/test'

export const expect = playwright.expect

export const test = playwright.test.extend({
  webApp: async ({ page }, use) => {
    await page.goto('http://localhost:3000/login')

    await page
      .locator('div')
      .filter({ hasText: /^Login$/ })
      .click()
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByLabel('Email address').click()
    await page.getByLabel('Email address').fill('callummac@protonmail.com')
    await page.getByLabel('Email address').press('Tab')
    await page.getByLabel('Password').fill('Password1234!')
    await page.getByLabel('Password').press('Enter')

    await use(page)
  },
})
