import { test as baseTest } from '@playwright/test'
export * from '@playwright/test'

const credentials = {
  email: process.env.TEST_ACCOUNT_EMAIL ?? '',
  password: process.env.TEST_ACCOUNT_PASSWORD ?? '',
}

const authFile = 'playwright/.auth/user.json'

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    // initialise existing storage state
    await page.context().storageState({ path: authFile })

    console.log('Checking auth')

    try {
      await Promise.all([
        page.goto('http://localhost:3000'),
        page.waitForNavigation(),
      ])

      console.log('User navigated')

      if (page.url() === 'http://localhost:3000/login') {
        // we need to login again

        // await page.goto('http://localhost:3000/login')

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
      }
    } catch (error) {
      console.log('User didnt navigate. Auth is probably good.')
    }

    await use(page)
  },
})
