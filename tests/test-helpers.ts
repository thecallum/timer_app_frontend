import { Page } from '@playwright/test'
import {
  CalendarEventApiResponseObject,
  ProjectApiResponseObject,
} from '@/requests/types'
import dayjs from 'dayjs'

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

const createCalendarEventResponse: CalendarEventApiResponseObject = {
  id: '126',
  projectId: 82,
  description: 'Updated description',
  startTime: dayjs('2024-02-29T03:45:00Z'),
  endTime: dayjs('2024-02-29T04:00:00Z'),
}

const updateCalendarEventResponse: CalendarEventApiResponseObject = {
  id: '126',
  projectId: 82,
  description: 'Updated description',
  startTime: dayjs('2024-02-29T03:45:00Z'),
  endTime: dayjs('2024-02-29T04:00:00Z'),
}

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

export const setupGetEventsIntercept = async (
  page: Page,
  response: CalendarEventApiResponseObject[] = [],
) => {
  page.route('**/api/events**', async (route) => {
    route.fulfill({ json: response, status: 200 })
  })
}

export const setupGetProjectsIntercept = async (page: Page) => {
  await page.route('**/api/projects**', async (route) => {
    const request = route.request()

    if (request.method() === 'GET') {
      route.fulfill({ json: [existingProject], status: 200 })
    }
  })
}

export const setupCreateCalendarEventIntercept = async (
  page: Page,
  body: CalendarEventApiResponseObject = createCalendarEventResponse,
) => {
  await page.route('**/api/events/', async (route) => {
    const request = route.request()

    if (request.method() === 'POST') {
      route.fulfill({ json: body, status: 200 })
    }
  })
}

export const setupUpdateCalendarEventIntercept = async (
  page: Page,
  body: CalendarEventApiResponseObject = updateCalendarEventResponse,
) => {
  await page.route('**/api/events/**', async (route) => {
    const request = route.request()

    if (request.method() === 'PUT') {
      route.fulfill({ json: body, status: 200 })
    }
  })
}


export const setupDeleteCalendarEventIntercept = async (
  page: Page,
) => {
  await page.route('**/api/events/**', async (route) => {
    const request = route.request()

    if (request.method() === 'DELETE') {
      route.fulfill({status: 204 })
    }
  })
}


export const setupCreateProjectRequestIntercept = async (page: Page) => {
  await page.route('**/api/projects', async (route) => {
    const request = route.request()

    if (request.method() === 'POST') {
      route.fulfill({ json: createProjectResponse, status: 200 })
    }
  })
}

export const waitForGetEventsRequest = (page: Page) => {
  return page.waitForResponse(
    (res) => res.url().includes('/api/events') && res.status() === 200,
  )
}

export const waitForDeleteEventsRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const method = res.request().method()

    return (
      res.url().includes('/api/events') &&
      res.status() === 204 &&
      method === 'DELETE'
    )
  })
}

export const waitForCreateEventRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'POST' &&
      res.url().includes(`/api/events/`) &&
      res.status() === 200
    )
  })
}

export const waitForUpdateEventRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'PUT' &&
      res.url().includes(`/api/events/`) &&
      res.status() === 200
    )
  })
}

export const waitForCreateProjectRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'POST' &&
      res.url().includes('/api/projects') &&
      res.status() === 200
    )
  })
}

export const waitForGetProjectsRequest = (page: Page) => {
  return page.waitForResponse(
    (res) => res.url().includes('/api/projects') && res.status() === 200,
  )
}
