import { test, expect } from './my-setup'

test.describe('Calendar page', () => {

  test.beforeEach(async ({ page, login }) => {
 

  })

  test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    

    await page.getByRole('button', { name: 'Previous' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('div').filter({ hasText: /^11 Mar - 17 Mar$/ }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^04 Mar - 10 Mar$/ }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^26 Feb - 03 Mar$/ }).getByRole('button').nth(1).click();
    await page.locator('div').filter({ hasText: /^04 Mar - 10 Mar$/ }).getByRole('button').nth(1).click();
    await page.locator('div:nth-child(3) > div > button:nth-child(3)').first().click();
    await page.locator('form').getByRole('button', { name: 'No project' }).click();
    await page.getByRole('button', { name: 'Create a new project' }).click();
    await page.getByPlaceholder('Planning').fill('test');
    await page.getByRole('button', { name: 'Create project' }).click();
    await page.getByRole('button', { name: 'test' }).click();
    await page.locator('form').getByLabel('Event description').click();
    await page.locator('form').getByLabel('Event description').fill('new event');
    await page.getByLabel('Start').click();
    await page.getByLabel('Start').click();
    await page.getByLabel('Start').click();
    await page.getByLabel('Start').click();
    await page.getByLabel('Start').click();
    await page.locator('input[name="eventEndTime"]').click();
    await page.getByLabel('Start').click();
    await page.locator('input[name="eventEndTime"]').click();
    await page.locator('input[name="eventEndTime"]').click();
    await page.locator('input[name="eventEndTime"]').click();
    await page.locator('input[name="eventEndTime"]').press('ArrowLeft');
    await page.locator('input[name="eventEndTime"]').press('ArrowLeft');
    await page.locator('input[name="eventEndTime"]').fill('10:45:00');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'new event test 10:15:' }).click();
    await page.getByPlaceholder('(no description)').fill('new event updated eve');
    await page.getByPlaceholder('(no description)').press('Control+a');
    await page.getByPlaceholder('(no description)').fill('Updated descripton');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Updated descripton test 10:15:' }).click();
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.getByRole('button', { name: 'New Projectggc' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
    await page.getByText('TodayNext').click();
    await page.locator('.w-10').click();
    await page.getByPlaceholder('What are you working on?').fill('record an event');
    await page.getByRole('button', { name: 'No project' }).click();
    await page.getByRole('button', { name: 'New Projectggc' }).click();
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
    await page.locator('.w-10').click();
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('What are you working on?').fill('test');
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByText('Week Total233:15:1219 Feb -').click();
    await page.getByText('testNo project0:00:').click();
    await page.getByText('test', { exact: true }).click();
    await page.getByRole('button', { name: 'No project', exact: true }).click();
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.getByText('test').nth(2).click();
    await page.getByText('testtest0:00:').click();
    await page.locator('.w-10').click();
    await page.getByRole('button', { name: 'test test 0:00:' }).click();
    await page.locator('input[name="eventEndTime"]').click();
    await page.locator('input[name="eventEndTime"]').press('ArrowLeft');
    await page.locator('input[name="eventEndTime"]').press('ArrowLeft');
    await page.locator('input[name="eventEndTime"]').press('ArrowUp');
    await page.locator('input[name="eventEndTime"]').press('ArrowUp');
    await page.locator('input[name="eventEndTime"]').press('ArrowUp');
    await page.locator('input[name="eventEndTime"]').fill('18:01:22');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'test test 2:00:' }).click();
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.getByRole('button', { name: 'd', exact: true }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByText('Week Total235:15:4019 Feb -').click();
    await page.getByText(':15:40').click();
  });


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // test.beforeEach(async ({ page, login }) => {
  //   // init with no projects
  //   const getProjectsRequestAssertion = page.waitForResponse(
  //     (res) => res.url().includes('/api/projects') && res.status() === 200,
  //   )

  //   page.route('**/api/projects', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'GET') {
  //       route.fulfill({ json: [], status: 200 })
  //     }
  //   })

  //   await page.goto('http://localhost:3000/projects')

  //   await getProjectsRequestAssertion
  // })

  // test('shows empty list of projects', async ({ page }) => {
  //   expect(await page.screenshot()).toMatchSnapshot('no-projects.png')
  // })

  // test('creates a project', async ({ page }) => {
  //   const createProjectResponse = {
  //     id: 82,
  //     description: 'test',
  //     projectColor: {
  //       lightest: '#cffafe',
  //       light: '#a5f3fc',
  //       dark: '#0891b2',
  //       darkest: '#164e63',
  //     },
  //     isActive: true,
  //     totalEventDurationInMinutes: 0,
  //   }

  //   page.route('**/api/projects', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'POST') {
  //       route.fulfill({ json: createProjectResponse, status: 200 })
  //     }
  //   })

  //   // test cancel button
  //   await page.getByText('Create a new project').click()
  //   await page.getByRole('button', { name: 'Close' }).click()

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // create a project
  //   await page.getByText('Create a new project').click()
  //   await page.getByLabel('Project description').fill('New Project')

  //   const createProjectRequestAssertion = page.waitForResponse((res) => {
  //     const request = res.request()

  //     return (
  //       request.method() === 'POST' &&
  //       res.url().includes('/api/projects') &&
  //       res.status() === 200
  //     )
  //   })

  //   await page.getByRole('button', { name: 'Create project' }).click()

  //   await createProjectRequestAssertion

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // remove toast
  //   await page.getByText('Project added').click()
  //   await page.waitForSelector('text="Project added"', { state: 'detached' })

  //   expect(await page.screenshot()).toMatchSnapshot('project-created.png')
  // })

  // test('edits a project', async ({ page }) => {
  //   const createProjectResponse = {
  //     id: 82,
  //     description: 'test',
  //     projectColor: {
  //       lightest: '#cffafe',
  //       light: '#a5f3fc',
  //       dark: '#0891b2',
  //       darkest: '#164e63',
  //     },
  //     isActive: true,
  //     totalEventDurationInMinutes: 0,
  //   }

  //   const updateProjectResponse = {
  //     id: 82,
  //     description: 'updated description',
  //     projectColor: {
  //       lightest: '#cffafe',
  //       light: '#a5f3fc',
  //       dark: '#0891b2',
  //       darkest: '#164e63',
  //     },
  //     isActive: true,
  //     totalEventDurationInMinutes: 0,
  //   }

  //   page.route('**/api/projects', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'POST') {
  //       route.fulfill({ json: createProjectResponse, status: 200 })
  //     }
  //   })

  //   page.route('**/api/projects/**', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'PUT') {
  //       route.fulfill({ json: updateProjectResponse, status: 200 })
  //     }
  //   })

  //   // test cancel button
  //   await page.getByText('Create a new project').click()
  //   await page.getByRole('button', { name: 'Close' }).click()

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // create a project
  //   await page.getByText('Create a new project').click()
  //   await page.getByLabel('Project description').fill('New Project')

  //   const createProjectRequestAssertion = page.waitForResponse((res) => {
  //     const request = res.request()

  //     return (
  //       request.method() === 'POST' &&
  //       res.url().includes('/api/projects') &&
  //       res.status() === 200
  //     )
  //   })

  //   await page.getByRole('button', { name: 'Create project' }).click()

  //   await createProjectRequestAssertion

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // remove toast
  //   await page.getByText('Project added').click()
  //   await page.waitForSelector('text="Project added"', { state: 'detached' })

  //   // edit the project

  //   await page
  //     .getByRole('row', { name: 'test 0.0 hours Edit' })
  //     .getByRole('button')
  //     .click()

  //   await page
  //     .getByLabel('Project description')
  //     .fill('New Project name updated')

  //   const updateProjectRequestAssertion = page.waitForResponse((res) => {
  //     const request = res.request()

  //     return (
  //       request.method() === 'PUT' &&
  //       res.url().includes(`/api/projects/`) &&
  //       res.status() === 200
  //     )
  //   })

  //   await page
  //     .getByLabel('Edit project')
  //     .getByRole('button', { name: 'Edit project' })
  //     .click()

  //   await updateProjectRequestAssertion

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // remove toast
  //   await page.getByText('Project updated').click()
  //   await page.waitForSelector('text="Project updated"', { state: 'detached' })

  //   expect(await page.screenshot()).toMatchSnapshot('project-updated.png')
  // })

  // test('deletes a project', async ({ page }) => {
  //   const createProjectResponse = {
  //     id: 82,
  //     description: 'test',
  //     projectColor: {
  //       lightest: '#cffafe',
  //       light: '#a5f3fc',
  //       dark: '#0891b2',
  //       darkest: '#164e63',
  //     },
  //     isActive: true,
  //     totalEventDurationInMinutes: 0,
  //   }

  //   const updateProjectResponse = {
  //     id: 82,
  //     description: 'updated description',
  //     projectColor: {
  //       lightest: '#cffafe',
  //       light: '#a5f3fc',
  //       dark: '#0891b2',
  //       darkest: '#164e63',
  //     },
  //     isActive: true,
  //     totalEventDurationInMinutes: 0,
  //   }

  //   page.route('**/api/projects', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'POST') {
  //       route.fulfill({ json: createProjectResponse, status: 200 })
  //     }
  //   })

  //   page.route('**/api/projects/**', async (route) => {
  //     const request = route.request()

  //     if (request.method() === 'DELETE') {
  //       route.fulfill({ json: updateProjectResponse, status: 204 })
  //     }
  //   })

  //   // test cancel button
  //   await page.getByText('Create a new project').click()
  //   await page.getByRole('button', { name: 'Close' }).click()

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // create a project
  //   await page.getByText('Create a new project').click()
  //   await page.getByLabel('Project description').fill('New Project')

  //   const createProjectRequestAssertion = page.waitForResponse((res) => {
  //     const request = res.request()

  //     return (
  //       request.method() === 'POST' &&
  //       res.url().includes('/api/projects') &&
  //       res.status() === 200
  //     )
  //   })

  //   await page.getByRole('button', { name: 'Create project' }).click()

  //   await createProjectRequestAssertion

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   // remove toast
  //   await page.getByText('Project added').click()
  //   await page.waitForSelector('text="Project added"', { state: 'detached' })

  //   // delete the project
  //   await page
  //     .getByRole('row', { name: 'test 0.0 hours Edit' })
  //     .getByRole('button')
  //     .click()

  //   // await page.getByLabel('Edit project').getByRole('button').last().click()

  //   const deleteProjectRequestAssertion = page.waitForResponse((res) => {
  //     const request = res.request()

  //     return (
  //       request.method() === 'DELETE' &&
  //       res.url().includes(`/api/projects/`) &&
  //       res.status() === 204
  //     )
  //   })

  //   await page.getByLabel('Delete project').click()

  //   expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

  //   await deleteProjectRequestAssertion

  //   // remove toast
  //   await page.getByText('Project deleted').click()
  //   await page.waitForSelector('text="Project deleted"', { state: 'detached' })

  //   expect(await page.screenshot()).toMatchSnapshot('project-deleted.png')
  // })
})
