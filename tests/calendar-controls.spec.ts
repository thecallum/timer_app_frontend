import { test, expect } from './my-setup'
import {
  setupGetProjectsIntercept,
  waitForGetEventsRequest,
  waitForGetProjectsRequest,
} from './test-helpers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test.beforeEach(async ({ page, login }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
})

test('shows the correct days of week', async ({ page }) => {
  const getEventsRequestAssertion = waitForGetEventsRequest(page)

  await page.goto('http://localhost:3000/')

  await getEventsRequestAssertion

  // check current week
  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[0].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[0].png' })

  // check previous week
  page.getByText('Previous').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[-1].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[-1].png' })

  // check previous week
  page.getByLabel('Show previous week').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[-2].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[-2].png' })

  // check next week
  page.getByText('Next').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[-1].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[-1].png' })

  // check today
  page.getByLabel('Show current week').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[0].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[0].png' })

  // check next week
  page.getByText('Next').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[1].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[1].png' })

  // check next week
  page.getByLabel('Show next week').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[2].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[2].png' })

  // check today
  page.getByLabel('Show current week').click()

  await page
    .getByLabel('Calendar week selector')
    .screenshot({ path: 'week-selector-[0].png' })
  await page
    .getByLabel('Days of week')
    .screenshot({ path: 'days-of-week-[0].png' })

  // expect(await page.screenshot()).toMatchSnapshot('no-projects.png')
})

test('loads events for each week', async ({ page }) => {
  const events = [
    {
      id: 126,
      projectId: 82,
      description: 'Event -2',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    },
    {
      id: 127,
      projectId: 82,
      description: 'Event -1',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    },
    {
      id: 128,
      projectId: 82,
      description: 'Event 0',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    },
    {
      id: 129,
      projectId: 82,
      description: 'Event 1',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    },
    {
      id: 130,
      projectId: 82,
      description: 'Event 2',
      startTime: '2024-02-29T03:45:00Z',
      endTime: '2024-02-29T04:00:00Z',
    },
  ]
  page.route(
    '**/api/events?startTime=02%2F12%2F2024&endTime=02%2F18%2F2024',
    async (route) => route.fulfill({ json: [events[0]], status: 200 }),
  )
  page.route(
    '**/api/events?startTime=02%2F19%2F2024&endTime=02%2F25%2F2024',
    async (route) => route.fulfill({ json: [events[1]], status: 200 }),
  )
  page.route(
    '**/api/events?startTime=02%2F26%2F2024&endTime=03%2F03%2F2024',
    async (route) => route.fulfill({ json: [events[2]], status: 200 }),
  )
  page.route(
    '**/api/events?startTime=03%2F04%2F2024&endTime=03%2F10%2F2024',
    async (route) => route.fulfill({ json: [events[3]], status: 200 }),
  )
  page.route(
    '**/api/events?startTime=03%2F11%2F2024&endTime=03%2F17%2F2024',
    async (route) => route.fulfill({ json: [events[4]], status: 200 }),
  )

  setupGetProjectsIntercept(page)

  let getEventsRequestAssertion = waitForGetEventsRequest(page)
  const getProjectsRequestAssertion = waitForGetProjectsRequest(page)

  await page.goto('http://localhost:3000/')

  await Promise.all([getEventsRequestAssertion, getProjectsRequestAssertion])

  // check current week
  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check previous week
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByText('Previous').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event -1 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check previous week
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByLabel('Show previous week').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event -2 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByText('Next').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event -1 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check today
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByLabel('Show current week').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByText('Next').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event 1 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByLabel('Show next week').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event 2 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check today
  getEventsRequestAssertion = waitForGetEventsRequest(page)
  await page.getByLabel('Show current week').click()
  await getEventsRequestAssertion

  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 29 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)
})
