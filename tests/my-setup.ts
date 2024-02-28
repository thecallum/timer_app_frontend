import * as playwright from '@playwright/test'

const credentials = {
  email: process.env.TEST_ACCOUNT_EMAIL ?? '',
  password: process.env.TEST_ACCOUNT_PASSWORD ?? '',
}

export const expect = playwright.expect

export const test = playwright.test.extend({
  login: async ({ page }, use) => {
    await page.goto('http://localhost:3000/login')

    await page
      .locator('div')
      .filter({ hasText: /^Login$/ })
      .click()
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByLabel('Email address').click()
    await page.getByLabel('Email address').fill(credentials.email)
    await page.getByLabel('Email address').press('Tab')
    await page.getByLabel('Password').fill(credentials.password)
    await page.getByLabel('Password').press('Enter')

    await use(page)
  },
})

