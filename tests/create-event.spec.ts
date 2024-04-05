import { CalendarEventApiResponseObject } from '@/requests/types'
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
import {
  existingCalendarEvents,
  existingProjects,
} from '../playwright/fixtures'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })

  setupGetEventsIntercept(page, existingCalendarEvents)
  setupGetProjectsIntercept(page, existingProjects)

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])
})

test('Opens model with correct timeslot', async ({ page }) => {
  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()
  expect(page.getByLabel('Event start time')).toHaveValue('2024-02-28T03:15')
  expect(page.getByLabel('Event end time')).toHaveValue('03:30:00')

  await page.getByRole('button', { name: 'Close' }).click()

  await page.getByLabel('Create an event on February 28 at 3:45 AM.').click()
  expect(page.getByLabel('Event start time')).toHaveValue('2024-02-28T03:45')
  expect(page.getByLabel('Event end time')).toHaveValue('04:00:00')

  await page.getByRole('button', { name: 'Close' }).click()

  await page.getByLabel('Create an event on February 26 at 2:45 PM.').click()
  expect(page.getByLabel('Event start time')).toHaveValue('2024-02-26T14:45')
  expect(page.getByLabel('Event end time')).toHaveValue('15:00:00')

  await page.getByRole('button', { name: 'Close' }).click()
})

test('request error', async ({ page }) => {
  setupCreateCalendarEventIntercept(page, null, 400)

  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  await page
    .locator('#addEventPopover')
    .getByLabel('Event description')
    .fill('event name')

  await Promise.all([
    page.getByRole('button', { name: 'Save' }).click(),
    waitForCreateEventRequest(page, 400),
  ])

  // event added to calendar
  expect(
    page
      .locator('#addEventPopover')
      .getByText('Request failed with status code 400'),
  ).toHaveCount(1)
})

test('Adds event to calendar', async ({ page }) => {
  const createCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: null,
    description: 'event name',
    startTime: new Date('2024-02-29T03:45:00Z'),
    endTime: new Date('2024-02-29T04:00:00Z'),
  }

  setupCreateCalendarEventIntercept(page, createCalendarEventResponse)

  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  await page
    .locator('#addEventPopover')
    .getByLabel('Event description')
    .fill('event name')

  await Promise.all([
    page.getByRole('button', { name: 'Save' }).click(),
    waitForCreateEventRequest(page),
  ])

  // event added to calendar
  expect(
    page.getByLabel(
      'Calendar event: event name on February 29 at 3:45 AM, not assigned to any project.',
    ),
  ).toHaveCount(1)
})

test('Validates event name', async ({ page }) => {
  // open project
  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  // add description longer than 60 characters
  await page
    .locator('#addEventPopover')
    .getByLabel('Event description')
    .fill('aaaaaaaaaa'.repeat(7))

  // save
  await page.getByRole('button', { name: 'Save' }).click()

  // assert error message
  await expect(
    page.getByText('Description must be less than 60 characters'),
  ).toHaveCount(1)
})

test('Validates event time', async ({ page }) => {
  // open modal
  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  // set end time before start time
  await page.getByLabel('Event end time').fill('02:30:00')

  // save
  await page.getByRole('button', { name: 'Save' }).click()

  // assert error message
  await expect(page.getByText('End time must be after start')).toHaveCount(1)
})

test('Can select a project', async ({ page }) => {
  // open modal
  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  // add description
  await page
    .locator('#addEventPopover')
    .getByLabel('Event description')
    .fill('event name')

  // select project
  await page
    .locator('#addEventPopover')
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page
    .locator('#addEventPopover')
    .getByLabel('Select project: Existing Project')
    .click()

  // save event
  const createCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 82,
    description: 'event name',
    startTime: new Date('2024-02-29T03:45:00Z'),
    endTime: new Date('2024-02-29T04:00:00Z'),
  }

  setupCreateCalendarEventIntercept(page, createCalendarEventResponse)

  await Promise.all([
    page.getByRole('button', { name: 'Save' }).click(),
    waitForCreateEventRequest(page),
  ])

  // event added to calendar
  expect(
    page.getByLabel(
      'Calendar event: event name on February 29 at 3:45 AM, assigned to project Existing project.',
    ),
  ).toHaveCount(1)
})

test('Can create and select a new project', async ({ page }) => {
  // open modal
  await page.getByLabel('Create an event on February 28 at 3:15 AM.').click()

  // add description
  await page
    .locator('#addEventPopover')
    .getByLabel('Event description')
    .fill('event name')

  // select and create project
  await setupCreateProjectRequestIntercept(page)

  await page
    .locator('#addEventPopover')
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page.getByLabel('Create a new project').click()
  await page.getByPlaceholder('Planning').fill('New project')

  await Promise.all([
    page.getByRole('button', { name: 'Create project' }).click(),
    waitForCreateProjectRequest(page),
  ])

  await page
    .locator('#addEventPopover')
    .getByLabel('Select project: New project')
    .click()

  // save event
  const createCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 83,
    description: 'event name',
    startTime: new Date('2024-02-29T03:45:00Z'),
    endTime: new Date('2024-02-29T04:00:00Z'),
  }

  setupCreateCalendarEventIntercept(page, createCalendarEventResponse)

  await Promise.all([
    page.getByRole('button', { name: 'Save' }).click(),
    waitForCreateEventRequest(page),
  ])

  // event added to calendar
  expect(
    page.getByLabel(
      'Calendar event: event name on February 29 at 3:45 AM, assigned to project New project.',
    ),
  ).toHaveCount(1)
})
