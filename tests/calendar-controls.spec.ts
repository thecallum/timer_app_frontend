import { existingProject } from '../playwright/fixtures'
import { test, expect } from '../playwright/my-setup'
import {
  setupGetEventsIntercept,
  setupGetProjectsIntercept,
  waitForGetEventsRequest,
  waitForGetProjectsRequest,
} from '../playwright/test-helpers'

const events = [
  {
    id: 126,
    projectId: 82,
    description: 'Event -2',
    startTime: '2024-02-12T03:45:00Z',
    endTime: '2024-02-12T04:00:00Z',
  },
  {
    id: 127,
    projectId: 82,
    description: 'Event -1',
    startTime: '2024-02-19T03:45:00Z',
    endTime: '2024-02-19T04:00:00Z',
  },
  {
    id: 128,
    projectId: 82,
    description: 'Event 0',
    startTime: '2024-02-26T03:45:00Z',
    endTime: '2024-02-26T04:00:00Z',
  },
  {
    id: 129,
    projectId: 82,
    description: 'Event 1',
    startTime: '2024-03-04T03:45:00Z',
    endTime: '2024-03-04T04:00:00Z',
  },
  {
    id: 130,
    projectId: 82,
    description: 'Event 2',
    startTime: '2024-03-11T03:45:00Z',
    endTime: '2024-03-11T04:00:00Z',
  },
]

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
})

test('shows the correct days of week for week view', async ({ page }) => {
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

  setupGetProjectsIntercept(page, [existingProject])
  // setupGetEventsIntercept(page, [])

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])

  await page.evaluate(() => document.fonts.ready)

  await page.waitForTimeout(100)

  // check current week
  page.getByText('26 Feb - 03 Mar')

  page.getByText('26Mon0:15:00')
  page.getByText('27Tue0:00:00')
  page.getByText('28Wed0:00:00')
  page.getByText('29Thu0:00:00')
  page.getByText('01Fri0:00:00')
  page.getByText('02Sat0:00:00')
  page.getByText('03Sun0:00:00')

  // check previous week
  page.getByText('Previous').click()

  await page.waitForTimeout(100)

  page.getByText('19 Feb - 25 Feb')

  page.getByText('19Mon0:15:00')
  page.getByText('20Tue0:00:00')
  page.getByText('21Wed0:00:00')
  page.getByText('22Thu0:00:00')
  page.getByText('23Fri0:00:00')
  page.getByText('24Sat0:00:00')
  page.getByText('25Sun0:00:00')

  // check previous week
  page.getByLabel('Show previous week').click()

  await page.waitForTimeout(100)

  page.getByText('12 Feb - 18 Feb')

  page.getByText('12Mon0:15:00')
  page.getByText('13Tue0:00:00')
  page.getByText('14Wed0:00:00')
  page.getByText('15Thu0:00:00')
  page.getByText('16Fri0:00:00')
  page.getByText('17Sat0:00:00')
  page.getByText('18Sun0:00:00')

  // check next week
  page.getByText('Next').click()

  await page.waitForTimeout(100)

  page.getByText('19 Feb - 25 Feb')

  page.getByText('19Mon0:15:00')
  page.getByText('20Tue0:00:00')
  page.getByText('21Wed0:00:00')
  page.getByText('22Thu0:00:00')
  page.getByText('23Fri0:00:00')
  page.getByText('24Sat0:00:00')
  page.getByText('25Sun0:00:00')

  // check today
  page.getByLabel('Show current week').click()

  await page.waitForTimeout(100)

  page.getByText('26 Feb - 03 Mar')

  page.getByText('26Mon0:15:00')
  page.getByText('27Tue0:00:00')
  page.getByText('28Wed0:00:00')
  page.getByText('29Thu0:00:00')
  page.getByText('01Fri0:00:00')
  page.getByText('02Sat0:00:00')
  page.getByText('03Sun0:00:00')

  // check next week
  page.getByText('Next').click()

  await page.waitForTimeout(100)

  page.getByText('04 Mar - 10 Mar')

  page.getByText('04Mon0:15:00')
  page.getByText('05Tue0:00:00')
  page.getByText('06Wed0:00:00')
  page.getByText('07Thu0:00:00')
  page.getByText('08Fri0:00:00')
  page.getByText('09Sat0:00:00')
  page.getByText('10Sun0:00:00')

  // check next week
  page.getByLabel('Show next week').click()

  await page.waitForTimeout(100)

  page.getByText('11 Mar - 17 Mar')

  page.getByText('11Mon0:15:00')
  page.getByText('12Tue0:00:00')
  page.getByText('13Wed0:00:00')
  page.getByText('14Thu0:00:00')
  page.getByText('15Fri0:00:00')
  page.getByText('16Sat0:00:00')
  page.getByText('17Sun0:00:00')

  // check today
  page.getByLabel('Show current week').click()

  await page.waitForTimeout(100)

  page.getByText('26 Feb - 03 Mar')

  page.getByText('26Mon0:15:00')
  page.getByText('27Tue0:00:00')
  page.getByText('28Wed0:00:00')
  page.getByText('29Thu0:00:00')
  page.getByText('01Fri0:00:00')
  page.getByText('02Sat0:00:00')
  page.getByText('03Sun0:00:00')
})

test('shows the correct days of week for day view', async ({ page }) => {
  // page.route(
  //   '**/api/events?startTime=02%2F12%2F2024&endTime=02%2F18%2F2024',
  //   async (route) => route.fulfill({ json: [events[0]], status: 200 }),
  // )
  // page.route(
  //   '**/api/events?startTime=02%2F19%2F2024&endTime=02%2F25%2F2024',
  //   async (route) => route.fulfill({ json: [events[1]], status: 200 }),
  // )
  // page.route(
  //   '**/api/events?startTime=02%2F26%2F2024&endTime=03%2F03%2F2024',
  //   async (route) => route.fulfill({ json: [events[2]], status: 200 }),
  // )
  // page.route(
  //   '**/api/events?startTime=03%2F04%2F2024&endTime=03%2F10%2F2024',
  //   async (route) => route.fulfill({ json: [events[3]], status: 200 }),
  // )
  // page.route(
  //   '**/api/events?startTime=03%2F11%2F2024&endTime=03%2F17%2F2024',
  //   async (route) => route.fulfill({ json: [events[4]], status: 200 }),
  // )

  setupGetProjectsIntercept(page, [existingProject])
  setupGetEventsIntercept(page, [])

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])

  await page.evaluate(() => document.fonts.ready)

  await page.waitForTimeout(100)

  // set to day view
  await page.getByLabel('Calendar view').selectOption('Day')

  // check current week
  page.getByText('28 Feb')
  page.getByText('28Wed0:00:00')

  // check previous week
  page.getByText('Previous').click()

  await page.waitForTimeout(100)

  page.getByText('27 Feb')
  page.getByText('27Tue0:00:00')

  // check previous week
  page.getByLabel('Show previous week').click()

  await page.waitForTimeout(100)

  page.getByText('26 Feb')
  page.getByText('26Mon0:00:00')

  // check next week
  page.getByText('Next').click()

  await page.waitForTimeout(100)

  page.getByText('27 Feb')
  page.getByText('27Tue0:00:00')

  // check today
  page.getByLabel('Show current week').click()

  await page.waitForTimeout(100)

  page.getByText('28 Feb')
  page.getByText('28Wed0:00:00')

  // check next week
  page.getByText('Next').click()

  await page.waitForTimeout(100)

  page.getByText('29 Feb')
  page.getByText('29Thu0:00:00')

  // check next week
  page.getByLabel('Show next week').click()

  await page.waitForTimeout(100)

  page.getByText('01 Mar')
  page.getByText('01Fri0:00:00')

  // check today
  page.getByLabel('Show current week').click()

  await page.waitForTimeout(100)

  page.getByText('28 Feb')
  page.getByText('28Wed0:00:00')
})

test('loads events for each week', async ({ page }) => {
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

  setupGetProjectsIntercept(page, [existingProject])

  await Promise.all([
    page.goto('http://localhost:3000/'),
    waitForGetEventsRequest(page),
    waitForGetProjectsRequest(page),
  ])

  // check current week
  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 26 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check previous week
  await Promise.all([
    page.getByText('Previous').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event -1 on February 19 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check previous week
  await Promise.all([
    page.getByLabel('Show previous week').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event -2 on February 12 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  await Promise.all([
    page.getByText('Next').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event -1 on February 19 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check today
  await Promise.all([
    page.getByLabel('Show current week').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 26 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  await Promise.all([
    page.getByText('Next').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event 1 on March 04 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check next week
  await Promise.all([
    page.getByLabel('Show next week').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event 2 on March 11 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)

  // check today
  await Promise.all([
    page.getByLabel('Show current week').click(),
    waitForGetEventsRequest(page),
  ])

  expect(
    page.getByLabel(
      'Calendar event: Event 0 on February 26 at 3:45 AM, assigned to project Existing Project.',
    ),
  ).toHaveCount(1)
})
