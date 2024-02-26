import { Page } from '@playwright/test'
import { test, expect } from './my-setup'
import { ProjectApiResponseObject } from '@/requests/types'

test.describe('Timer controls', () => {
  test.beforeEach(async ({ page, login }) => {
    await page.setViewportSize({ width: 1920, height: 4000 })
  })

  test('timer controls work on projects page', async ({ page }) => {})

  test('timer controls on calendar page', async ({ page }) => {
    page.route('**/api/events**', async (route) => {
      route.fulfill({ json: [], status: 200 })
    })

    const getEventsRequestAssertion = page.waitForResponse(
      (res) => res.url().includes('/api/events') && res.status() === 200,
    )

    const existingProject: ProjectApiResponseObject = {
      id: 82,
      description: 'Existing Project',
      projectColor: {
        lightest: '#cffafe',
        light: '#a5f3fc',
        dark: '#0891b2',
        darkest: '#164e63',
      },
      isActive: true,
      totalEventDurationInMinutes: 0,
    }

    setupGetProjectsIntercept(page, [existingProject])

    await page.goto('http://localhost:3000/')

    await getEventsRequestAssertion

    // enter description
    await page.getByPlaceholder('What are you working on?').fill('Current task')

    // start
    await page.getByLabel('Start recording an event').click()

    // recording visible
    expect(
      page.getByLabel(
        'Recording in progress for event Current task, not assigned to any project.',
      ),
    ).toHaveCount(1)

    // change description
    await page
      .getByPlaceholder('What are you working on?')
      .fill('Updated description')

    // updated in recording
    expect(
      page.getByLabel(
        'Recording in progress for event Updated description, not assigned to any project.',
      ),
    ).toHaveCount(1)

    // change project
    await page
      .getByLabel('Select a project - Currently selected: no project')
      .click()
    await page.getByLabel('Select project: Existing Project').click()

    // updated in recording
    expect(
      page.getByLabel(
        'Recording in progress for event Updated description, assigned to project Existing Project.',
      ),
    ).toHaveCount(1)

    // create and select project
    const createProjectResponse = {
      id: 83,
      description: 'New project',
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

    const createProjectRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'POST' &&
        res.url().includes('/api/projects') &&
        res.status() === 200
      )
    })

    await page
      .getByLabel('Select a project - Currently selected: Existing Project')
      .click()
    await page.getByLabel('Create a new project').click()
    await page
      .getByPlaceholder('Planning')
      .fill(createProjectResponse.description)
    await page.getByRole('button', { name: 'Create project' }).click()

    await createProjectRequestAssertion

    await page.getByLabel('Select project: New project').click()

    // updated in recording
    expect(
      page.getByLabel(
        'Recording in progress for event Updated description, assigned to project New project.',
      ),
    ).toHaveCount(1)

    // change project
    await page
      .getByLabel('Select a project - Currently selected: New project')
      .click()
    await page.getByLabel('Select project: Existing Project').click()

    // await page.waitForTimeout(1000)

    const getProjectsRequestAssertion = page.waitForResponse(
      (res) => res.url().includes('/api/projects') && res.status() === 200,
    )

    // reload page - assert event still saved

    await setupGetProjectsIntercept(page, [existingProject])

    await page.reload()
    await getProjectsRequestAssertion

    // timer controlls needs to re-init
    await page.waitForTimeout(100)

    expect(
      page.getByLabel(
        'Recording in progress for event Updated description, assigned to project Existing Project.',
      ),
    ).toHaveCount(1)
    expect(page.getByPlaceholder('What are you working on?')).toHaveValue(
      'Updated description',
    )
    expect(
      page.getByLabel(
        'Select a project - Currently selected: Existing Project',
      ),
    ).toHaveCount(1)

    // end recording
    const createCalendarEventResponse = {
      id: 126,
      projectId: 82,
      description: 'Updated description',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    }

    page.route('**/api/events/', async (route) => {
      const request = route.request()

      if (request.method() === 'POST') {
        route.fulfill({ json: createCalendarEventResponse, status: 200 })
      }
    })

    const createCalendarEventRequestAssertion = page.waitForResponse((res) => {
      const request = res.request()

      return (
        request.method() === 'POST' &&
        res.url().includes(`/api/events/`) &&
        res.status() === 200
      )
    })

    await page.getByLabel('Save current recording').click()

    await createCalendarEventRequestAssertion

    // timer controls reset
    expect(page.getByPlaceholder('What are you working on?')).toHaveValue('')
    expect(
      page.getByLabel('Select a project - Currently selected: no project'),
    ).toHaveCount(1)

    // event added to calendar
    expect(
      page.getByLabel(
        'Calendar event: Updated description on February 29 at 3:45 AM, assigned to project Existing Project.',
      ),
    ).toHaveCount(1)

    // no recording visible
    expect(
      page.getByLabel(
        'Recording in progress for event Updated description, assigned to project Existing Project.',
      ),
    ).toHaveCount(0)
  })
})

const setupGetProjectsIntercept = async (
  page: Page,
  data: ProjectApiResponseObject[],
) => {
  await page.route('**/api/projects**', async (route) => {
    const request = route.request()

    if (request.method() === 'GET') {
      route.fulfill({ json: data, status: 200 })
    }
  })
}
