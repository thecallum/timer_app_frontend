import { test, expect } from '../playwright/my-setup'
import {
  setupGetEventsIntercept,
  setupGetProjectsIntercept,
  waitForGetEventsRequest,
  waitForGetProjectsRequest,
} from '../playwright/test-helpers'
import {
  existingCalendarEvents,
  existingProjects,
} from '../playwright/fixtures'

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 4000 })
})

test('shows empty calendar page', async ({ page }) => {
  setupGetEventsIntercept(page, [])
  setupGetProjectsIntercept(page, existingProjects)

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])

  console.log('test')

  expect(await page.screenshot()).toMatchSnapshot('empty-calendar.png')
})

test('shows calendar with events', async ({ page }) => {
  setupGetEventsIntercept(page, existingCalendarEvents)
  setupGetProjectsIntercept(page, existingProjects)

  await Promise.all([
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])

  expect(await page.screenshot()).toMatchSnapshot('calendar-with-events.png')
})
