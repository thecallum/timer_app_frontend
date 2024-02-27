import { CalendarEventApiResponseObject } from '@/requests/types'
import { test, expect } from './my-setup'
import {
  setupCreateCalendarEventIntercept,
  setupCreateProjectRequestIntercept,
  setupDeleteCalendarEventIntercept,
  setupGetEventsIntercept,
  setupGetProjectsIntercept,
  setupUpdateCalendarEventIntercept,
  waitForCreateEventRequest,
  waitForCreateProjectRequest,
  waitForDeleteEventsRequest,
  waitForUpdateEventRequest,
} from './test-helpers'
import dayjs from 'dayjs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test.beforeEach(async ({ page, login }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })

  const existingEvent: CalendarEventApiResponseObject = {
    id: '126',
    projectId: null,
    description: 'Event name',
    startTime: dayjs('2024-02-29T03:45:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupGetEventsIntercept(page, [existingEvent])
  setupGetProjectsIntercept(page)
})

test('Updates event description', async ({ page }) => {
  const updateCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 82,
    description: 'Updated description',
    startTime: dayjs('2024-02-29T03:45:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupUpdateCalendarEventIntercept(page, updateCalendarEventResponse)

  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // update description
  await page.getByPlaceholder('(no description)').fill('new description')

  // save changes
  const updateEventRequestAssertion = waitForUpdateEventRequest(page)
  await page.getByRole('button', { name: 'Save' }).click()
  await updateEventRequestAssertion

  // assert changes visible
  expect(
    page.getByLabel(
      'Calendar event: new description on February 29 at 3:45 AM, not assigned to any project.',
    ),
  ).toHaveCount(1)
})

test('Validates event description', async ({ page }) => {
  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // add description longer than 60 characters
  await page.getByPlaceholder('(no description)').fill('aaaaaaaaaa'.repeat(7))

  // save changes
  await page.getByRole('button', { name: 'Save' }).click()

  // assert error message
  await expect(
    page.getByText('Description must be less than 60 characters'),
  ).toHaveCount(1)
})

test('Updates event time', async ({ page }) => {
  const updateCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 82,
    description: 'Event name',
    startTime: dayjs('2024-02-29T04:15:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupUpdateCalendarEventIntercept(page, updateCalendarEventResponse)

  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // update time
  await page.getByLabel('Event start time').fill('2024-02-29T04:15')
  await page.getByLabel('Event end time').fill('04:30:00')

  // save changes
  const updateEventRequestAssertion = waitForUpdateEventRequest(page)
  await page.getByRole('button', { name: 'Save' }).click()
  await updateEventRequestAssertion

  // assert changes visible
  expect(
    page.getByLabel(
      'Calendar event: Event name on February 29 at 4:15 AM, not assigned to any project.',
    ),
  ).toHaveCount(1)
})

test('Validates event time', async ({ page }) => {
  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // update time
  await page.getByLabel('Event start time').fill('2024-02-29T04:15')
  await page.getByLabel('Event end time').fill('02:30:00')

  // save
  await page.getByRole('button', { name: 'Save' }).click()

  // assert error message
  await expect(page.getByText('End time must be after start')).toHaveCount(1)
})

test('Deletes event from calendar', async ({ page }) => {
  setupDeleteCalendarEventIntercept(page)

  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // delete event
  const deleteEventRequestAssertion = waitForDeleteEventsRequest(page)
  await page.getByLabel('Delete event').click()
  await deleteEventRequestAssertion

  // assert event deleted
  expect(
    page.getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    ),
  ).toHaveCount(0)
})

// can update event project
// can create and select project

test('Can update event project', async ({ page }) => {
  const updateCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 82,
    description: 'Updated description',
    startTime: dayjs('2024-02-29T03:45:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupUpdateCalendarEventIntercept(page, updateCalendarEventResponse)

  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // select project
  await page
    .locator('#editEventPopover')
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page
    .locator('#editEventPopover')
    .getByLabel('Select project: Existing Project')
    .click()

  // save changes
  const updateEventRequestAssertion = waitForUpdateEventRequest(page)
  await page.getByRole('button', { name: 'Save' }).click()
  await updateEventRequestAssertion

  // assert changes visible
  expect(
    page.getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)
})

test('Can create and select project', async ({ page }) => {
  const updateCalendarEventResponse: CalendarEventApiResponseObject = {
    id: '126',
    projectId: 83,
    description: 'Updated description',
    startTime: dayjs('2024-02-29T03:45:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupUpdateCalendarEventIntercept(page, updateCalendarEventResponse)

  // open event
  await page
    .getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
    )
    .click()

  // select and create project
  await setupCreateProjectRequestIntercept(page)

  const createProjectRequestAssertion = waitForCreateProjectRequest(page)

  await page
    .locator('#editEventPopover')
    .getByLabel('Select a project - Currently selected: no project')
    .click()
  await page.getByLabel('Create a new project').click()
  await page.getByPlaceholder('Planning').fill('New project')
  await page.getByRole('button', { name: 'Create project' }).click()

  await createProjectRequestAssertion

  await page
    .locator('#editEventPopover')
    .getByLabel('Select project: New project')
    .click()

  // save changes
  const updateEventRequestAssertion = waitForUpdateEventRequest(page)
  await page.getByRole('button', { name: 'Save' }).click()
  await updateEventRequestAssertion

  // assert changes visible
  expect(
    page.getByLabel(
      'Calendar event: Event name on February 29 at 3:45 AM, assigned to project New project.',
    ),
  ).toHaveCount(1)
})
