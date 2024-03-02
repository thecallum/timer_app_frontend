import { existingProjects } from '../playwright/fixtures'
import { test, expect } from '../playwright/my-setup'
import {
  setupCreateCalendarEventIntercept,
  setupCreateProjectRequestIntercept,
  setupGetEventsIntercept,
  setupGetProjectsIntercept,
  waitForCreateEventRequest,
  waitForCreateProjectRequest,
  waitForGetEventsRequest,
  waitForGetProjectsRequest,
} from '../playwright/test-helpers'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 4000 })

  setupGetEventsIntercept(page, [])
  setupGetProjectsIntercept(page, existingProjects)

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])
})

test('can record event and save it to calendar', async ({ page }) => {
  await setupCreateCalendarEventIntercept(page)

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

  // end recording

  await Promise.all([
    page.getByLabel('Save current recording').click(),
    waitForCreateEventRequest(page),
  ])

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

test('can resume recording when page reloaded', async ({ page }) => {
  // enter description
  await page.getByPlaceholder('What are you working on?').fill('Current task')

  // set project
  await page
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page.getByLabel('Select project: Existing Project').click()

  // start
  await page.getByLabel('Start recording an event').click()

  // recording visible
  expect(
    page.getByLabel(
      'Recording in progress for event Current task, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // reload page - assert event still saved
  await page.reload()

  // timer controlls needs to re-init
  await page.waitForTimeout(100)

  expect(
    page.getByLabel(
      'Recording in progress for event Current task, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)
  expect(page.getByPlaceholder('What are you working on?')).toHaveValue(
    'Current task',
  )
  expect(
    page.getByLabel('Select a project - Currently selected: Existing Project'),
  ).toHaveCount(1)
})

test('can edit in progress recording', async ({ page }) => {
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
})

test('can create and select a new project', async ({ page }) => {
  await setupCreateProjectRequestIntercept(page)

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

  // create and select project

  await page
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page.getByLabel('Create a new project').click()
  await page.getByPlaceholder('Planning').fill('New project')

  await Promise.all([
    page.getByRole('button', { name: 'Create project' }).click(),
    waitForCreateProjectRequest(page),
  ])

  await page.getByLabel('Select project: New project').click()

  // updated in recording
  expect(
    page.getByLabel(
      'Recording in progress for event Current task, assigned to project New project.',
    ),
  ).toHaveCount(1)
})
