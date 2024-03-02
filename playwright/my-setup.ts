import { Page, test as baseTest } from '@playwright/test'
export * from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

export const test = baseTest.extend<{ _autoSnapshotSuffix: void; page: Page }>({
  page: async ({ page }, use) => {
    // initialise existing storage state
    await page.context().storageState({ path: authFile })

    console.log('Checking auth')

    // implementation really slow because it relies on waitForNavigation to time out
    // if there is a quicker way, potentially reversing the confition, that would be better

    try {
      await Promise.all([
        page.goto('http://localhost:3000'),
        page.waitForNavigation(),
      ])

      console.log('User navigated')

      await handleLogin(page)
    } catch (error) {
      console.log('User didnt navigate. Auth is probably good.')
    }

    await use(page)
  },
  _autoSnapshotSuffix: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, testInfo) => {
      testInfo.snapshotSuffix = ''
      await use()
    },
    { auto: true },
  ],
})

const handleLogin = async (page: Page) => {
  const credentials = {
    email: process.env.TEST_ACCOUNT_EMAIL ?? '',
    password: process.env.TEST_ACCOUNT_PASSWORD ?? '',
  }

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
