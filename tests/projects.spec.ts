import { test, expect } from './my-setup'

test.describe('Projects page', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(async ({ page, login }) => {
    // init with no projects
    const getProjectsRequestAssertion = page.waitForResponse(
      (res) => res.url().includes('/api/projects') && res.status() === 200,
    )

    page.route('**/api/projects', async (route) => {
      const request = route.request()

      if (request.method() === 'GET') {
        route.fulfill({ json: [], status: 200 })
      }
    })

    await page.goto('http://localhost:3000/projects')

    await getProjectsRequestAssertion
  })

  test('shows empty list of projects', async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot('no-projects.png')
  })

  test('creates a project', async ({ page }) => {
    const createProjectResponse = {
      id: 82,
      description: 'test',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    page.route('**/api/projects', async (route) => {
      const request = route.request()

      if (request.method() === 'POST') {
        route.fulfill({ json: createProjectResponse, status: 200 })
      }
    })

    // test cancel button
    await page.getByText('Create a new project').click()
    await page.getByRole('button', { name: 'Close' }).click()

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // create a project
    await page.getByText('Create a new project').click()
    await page.getByLabel('Project description').fill('New Project')

    const createProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'POST' &&
        res.url().includes('/api/projects') &&
        res.status() === 200
      )
    })

    await page.getByRole('button', { name: 'Create project' }).click()

    await createProjectRequestAssertion

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project added').click()
    await page.waitForSelector('text="Project added"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-created.png')
  })

  test('edits a project', async ({ page }) => {
    const createProjectResponse = {
      id: 82,
      description: 'test',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    const updateProjectResponse = {
      id: 82,
      description: 'updated description',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    page.route('**/api/projects', async (route) => {
      const request = route.request()

      if (request.method() === 'POST') {
        route.fulfill({ json: createProjectResponse, status: 200 })
      }
    })

    page.route('**/api/projects/**', async (route) => {
      const request = route.request()

      if (request.method() === 'PUT') {
        route.fulfill({ json: updateProjectResponse, status: 200 })
      }
    })

    // test cancel button
    await page.getByText('Create a new project').click()
    await page.getByRole('button', { name: 'Close' }).click()

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // create a project
    await page.getByText('Create a new project').click()
    await page.getByLabel('Project description').fill('New Project')

    const createProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'POST' &&
        res.url().includes('/api/projects') &&
        res.status() === 200
      )
    })

    await page.getByRole('button', { name: 'Create project' }).click()

    await createProjectRequestAssertion

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project added').click()
    await page.waitForSelector('text="Project added"', { state: 'detached' })

    // edit the project

    await page
      .getByRole('row', { name: 'test 0.0 hours Edit' })
      .getByRole('button')
      .click()

    await page
      .getByLabel('Project description')
      .fill('New Project name updated')

    const updateProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'PUT' &&
        res.url().includes(`/api/projects/`) &&
        res.status() === 200
      )
    })

    await page
      .getByLabel('Edit project')
      .getByRole('button', { name: 'Edit project' })
      .click()

    await updateProjectRequestAssertion

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project updated').click()
    await page.waitForSelector('text="Project updated"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-updated.png')
  })

  test('deletes a project', async ({ page }) => {
    const createProjectResponse = {
      id: 82,
      description: 'test',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    const updateProjectResponse = {
      id: 82,
      description: 'updated description',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    page.route('**/api/projects', async (route) => {
      const request = route.request()

      if (request.method() === 'POST') {
        route.fulfill({ json: createProjectResponse, status: 200 })
      }
    })

    page.route('**/api/projects/**', async (route) => {
      const request = route.request()

      if (request.method() === 'DELETE') {
        route.fulfill({ json: updateProjectResponse, status: 204 })
      }
    })

    // test cancel button
    await page.getByText('Create a new project').click()
    await page.getByRole('button', { name: 'Close' }).click()

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // create a project
    await page.getByText('Create a new project').click()
    await page.getByLabel('Project description').fill('New Project')

    const createProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'POST' &&
        res.url().includes('/api/projects') &&
        res.status() === 200
      )
    })

    await page.getByRole('button', { name: 'Create project' }).click()

    await createProjectRequestAssertion

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    // remove toast
    await page.getByText('Project added').click()
    await page.waitForSelector('text="Project added"', { state: 'detached' })

    // delete the project
    await page
      .getByRole('row', { name: 'test 0.0 hours Edit' })
      .getByRole('button')
      .click()

    // await page.getByLabel('Edit project').getByRole('button').last().click()

    const deleteProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'DELETE' &&
        res.url().includes(`/api/projects/`) &&
        res.status() === 204
      )
    })

    await page.getByLabel('Delete project').click()

    expect(page.getByRole('button', { name: 'Close' })).toBeHidden()

    await deleteProjectRequestAssertion

    // remove toast
    await page.getByText('Project deleted').click()
    await page.waitForSelector('text="Project deleted"', { state: 'detached' })

    expect(await page.screenshot()).toMatchSnapshot('project-deleted.png')
  })
})
