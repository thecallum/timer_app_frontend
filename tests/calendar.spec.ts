import { test, expect } from './my-setup'

test.describe('Calendar page', () => {
  test.beforeEach(async ({ page, login }) => {
    // MockDate.set('2024-02-28')
    await page.setViewportSize({ width: 1920, height: 4000 })
  })

  test('shows empty calendar page', async ({ page }) => {
    page.route('**/api/events**', async (route) => {
      route.fulfill({ json: [], status: 200 })
    })

    const getEventsRequestAssertion = page.waitForResponse(
      (res) => res.url().includes('/api/events') && res.status() === 200,
    )

    await page.goto('http://localhost:3000/')

    await getEventsRequestAssertion

    expect(await page.screenshot()).toMatchSnapshot('empty-calendar.png')
  })

  test('shows calendar with events', async ({ page }) => {
    const getEventsRequestAssertion = page.waitForResponse(
      (res) => res.url().includes('/api/events') && res.status() === 200,
    )

    const calendarEvents = [
      {
        id: 90,
        projectId: null,
        description: 'test',
        startTime: '2024-02-16T18:45:00',
        endTime: '2024-02-16T19:00:00',
      },
      {
        id: 92,
        projectId: null,
        description: 'test',
        startTime: '2024-02-16T06:15:00',
        endTime: '2024-02-16T06:30:00',
      },
      {
        id: 95,
        projectId: null,
        description: 'tresdsdfsdf',
        startTime: '2024-02-17T08:30:00',
        endTime: '2024-02-17T08:45:00',
      },
      {
        id: 96,
        projectId: null,
        description: 'fffff',
        startTime: '2024-02-15T10:30:00',
        endTime: '2024-02-15T10:45:00',
      },
      {
        id: 97,
        projectId: 37,
        description: 'Cheese',
        startTime: '2024-02-12T10:15:00',
        endTime: '2024-02-12T10:30:00',
      },
      {
        id: 98,
        projectId: 39,
        description: 'Ggxgsg',
        startTime: '2024-02-13T15:45:00',
        endTime: '2024-02-13T16:00:00',
      },
      {
        id: 91,
        projectId: null,
        description: 'testr',
        startTime: '2024-02-17T01:45:00',
        endTime: '2024-02-17T02:00:00',
      },
      {
        id: 93,
        projectId: 36,
        description: 'sdfsdfsdfw',
        startTime: '2024-02-14T07:15:00',
        endTime: '2024-02-14T09:30:00',
      },
      {
        id: 94,
        projectId: 35,
        description: 'dddd',
        startTime: '2024-02-16T06:41:29',
        endTime: '2024-02-16T08:47:59',
      },
      {
        id: 106,
        projectId: null,
        description: 'sfsfdsfdsf',
        startTime: '2024-02-14T06:30:00',
        endTime: '2024-02-14T06:45:00',
      },
      {
        id: 107,
        projectId: null,
        description: 'dsfsdfsdf',
        startTime: '2024-02-14T07:00:00',
        endTime: '2024-02-14T10:15:00',
      },
      {
        id: 108,
        projectId: null,
        description: 'sdsfdsfdsfdsf',
        startTime: '2024-02-14T10:45:00',
        endTime: '2024-02-14T11:00:00',
      },
      {
        id: 109,
        projectId: null,
        description: 'sdfsdfsdf',
        startTime: '2024-02-14T09:45:00',
        endTime: '2024-02-14T16:00:00',
      },
      {
        id: 110,
        projectId: null,
        description: 'zxczxcxzc',
        startTime: '2024-02-14T07:00:00',
        endTime: '2024-02-14T12:15:00',
      },
      {
        id: 111,
        projectId: null,
        description: 'asdasd',
        startTime: '2024-02-14T17:30:00',
        endTime: '2024-02-14T17:45:00',
      },
      {
        id: 116,
        projectId: 39,
        description: 'Doing what needs to be done',
        startTime: '2024-02-17T15:31:44.543',
        endTime: '2024-02-23T13:16:13.543',
      },
    ]

    page.route('**/api/events**', async (route) => {
      route.fulfill({ json: calendarEvents, status: 200 })
    })

    await getEventsRequestAssertion

    expect(await page.screenshot()).toMatchSnapshot('calendar-with-events.png')
  })
})
