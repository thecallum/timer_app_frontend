import { CalendarEventApiResponseObject } from '@/requests/types'
import { test, expect } from '../playwright/my-setup'
import {
  setupCreateProjectRequestIntercept,
  setupDeleteCalendarEventIntercept,
  setupGetEventsIntercept,
  setupGetProjectsIntercept,
  setupUpdateCalendarEventIntercept,
  waitForCreateProjectRequest,
  waitForDeleteEventsRequest,
  waitForGetEventsRequest,
  waitForGetProjectsRequest,
  waitForUpdateEventRequest,
} from '../playwright/test-helpers'
import dayjs from 'dayjs'
import { existingProject, existingProjects } from '../playwright/fixtures'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })

  const existingEvent: CalendarEventApiResponseObject = {
    id: '126',
    projectId: null,
    description: 'Event name',
    startTime: dayjs('2024-02-29T03:45:00Z'),
    endTime: dayjs('2024-02-29T04:00:00Z'),
  }

  setupGetEventsIntercept(page, [existingEvent])
  setupGetProjectsIntercept(page, [existingProject])

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])
})

test.describe('Edits an event', () => {
  test('Request error', async ({ page }) => {
    setupUpdateCalendarEventIntercept(page, null, 400)

    // open event
    await page
      .getByLabel(
        'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
      )
      .click()

    // update description
    await page.getByPlaceholder('(no description)').fill('new description')

    // save changes
    await Promise.all([
      page.getByRole('button', { name: 'Save' }).click(),
      waitForUpdateEventRequest(page, 400),
    ])

    // assert changes visible
    expect(
      page
        .locator('#editEventPopover')
        .getByText('Request failed with status code 400'),
    ).toHaveCount(1)
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
    await Promise.all([
      page.getByRole('button', { name: 'Save' }).click(),
      waitForUpdateEventRequest(page),
    ])

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
    await Promise.all([
      page.getByRole('button', { name: 'Save' }).click(),
      waitForUpdateEventRequest(page),
    ])

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
    await Promise.all([
      page.getByRole('button', { name: 'Save' }).click(),
      waitForUpdateEventRequest(page),
    ])

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

    await page
      .locator('#editEventPopover')
      .getByLabel('Select a project - Currently selected: no project')
      .click()
    await page.getByLabel('Create a new project').click()
    await page.getByPlaceholder('Planning').fill('New project')

    await Promise.all([
      page.getByRole('button', { name: 'Create project' }).click(),
      waitForCreateProjectRequest(page),
    ])

    await page
      .locator('#editEventPopover')
      .getByLabel('Select project: New project')
      .click()

    // save changes
    await Promise.all([
      page.getByRole('button', { name: 'Save' }).click(),
      waitForUpdateEventRequest(page),
    ])

    // assert changes visible
    expect(
      page.getByLabel(
        'Calendar event: Event name on February 29 at 3:45 AM, assigned to project New project.',
      ),
    ).toHaveCount(1)
  })
})

test.describe('Deletes event', () => {
  test('Request error', async ({ page }) => {
    setupDeleteCalendarEventIntercept(page, 400)

    // open event
    await page
      .getByLabel(
        'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
      )
      .click()

    // delete event
    await Promise.all([
      page.getByLabel('Delete event').click(),
      waitForDeleteEventsRequest(page, 400),
    ])

    // assert error message
    expect(
      page
        .locator('#editEventPopover')
        .getByText('Request failed with status code 400'),
    ).toHaveCount(1)
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
    await Promise.all([
      page.getByLabel('Delete event').click(),
      waitForDeleteEventsRequest(page),
    ])

    // assert event deleted
    expect(
      page.getByLabel(
        'Calendar event: Event name on February 29 at 3:45 AM, not assigned to any project.',
      ),
    ).toHaveCount(0)
  })
})
