import {
  ACCESS_TOKEN_COOKIE_NAME,
  IS_AUTHORIZED_COOKIE_NAME,
} from '@/auth/constants'
import { COOKIE_DOMAIN, buildCookieString } from '@/auth/setCookies'
import { ProjectApiResponseObject } from '@/requests/types'
import { test, expect } from './my-setup'
import { assert } from 'console'
// import { test } from './my-setup'

test('is test', async ({ browser }) => {
  const context = await browser.newContext()
  // Create a new page inside context.
  const page = await context.newPage()

  const accessToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBtXzFTckREd2FlcnhJeTRLMTNJTiJ9.eyJpc3MiOiJodHRwczovL2Rldi1pZzNqZmR0YXhkenJlZGh5LnVrLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NWMwOWRhN2Y5MDRhYjE2ZWY1ZTU0MzMiLCJhdWQiOlsiaHR0cHM6Ly9wY2sxem5qc2c2LmV4ZWN1dGUtYXBpLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tLyIsImh0dHBzOi8vZGV2LWlnM2pmZHRheGR6cmVkaHkudWsuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwODc5MDg4NiwiZXhwIjoxNzA4NzkxMTg2LCJhenAiOiI1elREaVdMNFd4bDZORTJwZ0phQXNzZkpXYTZnQnpBUCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.GrfQedBWrjGCs_kY0Du0Tu3GKH6qvGuUAwxA94PIZa7ZN-sGJh1bdJrl_r2Xpu4cWFTETzIP_CJ_ROtgHshWwZp2n2-Hbeery2BLq5Mzx3XZSEKy1ztCKpk5_29j_di8ecsCPjLpAB7HF9KGWwgbS0lQlciOsFFK7GcDR4kKimluiazwdpCiNIaSdwtq5o8wcJg_uNm9Vrv1FZXkuPy-8SxzY8VsG_hr791bxBM2Z6iHzO25KRLyzFNA0_E371-C4neiy7OOLgjm3RF7YZ845HRzZt6JqI_-jZGZoBWND5D0p--sKb2zhwdU7Hyek4lYgODF3rPzDx6p2HR9niIw9Q'

  // const cookies = [
  //     buildCookieString(
  //         ACCESS_TOKEN_COOKIE_NAME,
  //         accessToken,
  //         COOKIE_DOMAIN,
  //         true,
  //       ),
  // ]

  await context.addCookies([
    {
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: accessToken,
      domain: 'http://localhost:3000',
      httpOnly: true,
      secure: true,
      path: '/',
    },
    {
      name: IS_AUTHORIZED_COOKIE_NAME,
      value: 'true',
      domain: 'http://localhost:3000',
      httpOnly: false,
      secure: true,
      path: '/',
    },
  ])

  const projectsResponse: ProjectApiResponseObject[] = [
    {
      id: 1,
      description: 'description',
      isActive: true,
      projectColor: {
        dark: '',
        darkest: '',
        light: '',
        lightest: '',
      },
      totalEventDurationInMinutes: 100,
    },
  ]

  //   let getProjectsRequestResolved = false

  await page.route('**/api/projects', async (route) => {
    await route.fulfill({ json: projectsResponse, status: 200 })
    // getProjectsRequestResolved = true
  })

  await page.route('**/api/events**', async (route) => {
    await route.fulfill({ json: [], status: 200 })
  })

  const getProjectsRequestAssertion = page.waitForRequest(
    (request) =>
      request.url().includes('/api/projects') && request.method() === 'GET',
  )

  await page.goto('http://localhost:3000/projects')

  await getProjectsRequestAssertion
  //   expect(getProjectsRequestResolved).toBeTruthy()

  //1await responsePromise

  // // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Projects/)
})

// const myTest = test.extend({
//   webApp: async ({ page }, use) => {
//     await page.goto('http://localhost:3000/login')

//     await page
//       .locator('div')
//       .filter({ hasText: /^Login$/ })
//       .click()
//     await page.getByRole('button', { name: 'Login' }).click()
//     await page.getByLabel('Email address').click()
//     await page.getByLabel('Email address').fill('callummac@protonmail.com')
//     await page.getByLabel('Email address').press('Tab')
//     await page.getByLabel('Password').fill('Password1234!')
//     await page.getByLabel('Password').press('Enter')

//     await use(page)
//   },
// })

test('test', async ({ page, webApp }) => {
  await page.goto('http://localhost:3000/projects')

  await page.getByRole('link', { name: 'Projects' }).click()
  await page
    .locator('div')
    .filter({
      hasText: /^ProjectsCreate projectProject nameTotal timeActions$/,
    })
    .first()
    .click()
  await page.getByRole('heading', { name: 'Projects' }).click()
  await page.getByText('ProjectsCreate project').click()
  await page.getByText('ProjectsCreate project').click()
  await page.getByRole('button', { name: 'Create project' }).click()
  await page.getByPlaceholder('Planning').fill('New Project')
  await page.getByRole('button', { name: 'Close' }).click()
  await page.getByRole('button', { name: 'Create project' }).click()
  await page.getByPlaceholder('Planning').fill('New Project')
  await page
    .getByLabel('Create a project')
    .getByRole('button', { name: 'Create project' })
    .click()
  await page.getByText('Project added').click()
  await page
    .getByRole('row', { name: 'New Project 0.0 hours Edit' })
    .getByRole('button')
    .click()
  await page.getByPlaceholder('Planning').fill('New Project name updated')
  await page.getByRole('button', { name: 'Close' }).click()
  await page
    .getByRole('row', { name: 'New Project 0.0 hours Edit' })
    .getByRole('button')
    .click()
  await page.getByPlaceholder('Planning').fill('New Project name updated')
  await page
    .getByLabel('Edit project')
    .getByRole('button', { name: 'Edit project' })
    .click()
  await page.getByRole('button', { name: 'Close' }).click()
  await page
    .getByRole('row', { name: 'New Project name updated 0.0' })
    .getByRole('button')
    .click()
  await page.getByLabel('Edit project').getByRole('button').first().click()
  await page.locator('html').click()
})
