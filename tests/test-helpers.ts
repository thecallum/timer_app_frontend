import { Page } from '@playwright/test'
import {
  CalendarEventApiResponseObject,
  ProjectApiResponseObject,
} from '@/requests/types'
import {
  createCalendarEventResponse,
  createProjectResponse,
  updateCalendarEventResponse,
  updateProjectResponse,
} from './fixtures'

export const setupGetEventsIntercept = async (
  page: Page,
  response: CalendarEventApiResponseObject[] = [],
) => {
  page.route('**/api/events**', async (route) => {
    route.fulfill({ json: response, status: 200 })
  })
}

export const setupGetProjectsIntercept = async (
  page: Page,
  body: ProjectApiResponseObject[] = [],
) => {
  await page.route('**/api/projects**', async (route) => {
    const request = route.request()

    if (request.method() === 'GET') {
      route.fulfill({ json: body, status: 200 })
    }
  })
}

export const setupCreateCalendarEventIntercept = async (
  page: Page,
  body: CalendarEventApiResponseObject | null = createCalendarEventResponse,
  status: number = 200,
) => {
  await page.route('**/api/events/', async (route) => {
    const request = route.request()

    if (request.method() === 'POST') {
      route.fulfill({ json: body, status })
    }
  })
}

export const setupUpdateCalendarEventIntercept = async (
  page: Page,
  body: CalendarEventApiResponseObject | null = updateCalendarEventResponse,
  status: number = 200,
) => {
  await page.route('**/api/events/**', async (route) => {
    const request = route.request()

    if (request.method() === 'PUT') {
      route.fulfill({ json: body, status })
    }
  })
}

export const setupDeleteCalendarEventIntercept = async (
  page: Page,
  status: number = 204,
) => {
  await page.route('**/api/events/**', async (route) => {
    const request = route.request()

    if (request.method() === 'DELETE') {
      route.fulfill({ status })
    }
  })
}

export const setupCreateProjectRequestIntercept = async (
  page: Page,
  status: number = 200,
) => {
  await page.route('**/api/projects', async (route) => {
    if (route.request().method() === 'POST') {
      route.fulfill({ json: createProjectResponse, status })
    }
  })
}

export const setupUpdateProjectRequestIntercept = async (
  page: Page,
  data: ProjectApiResponseObject = updateProjectResponse,
  status: number = 200,
) => {
  await page.route('**/api/projects/**', async (route) => {
    const request = route.request()

    if (request.method() === 'PUT') {
      route.fulfill({ json: data, status })
    }
  })
}

export const setupDeleteProjectRequestIntercept = async (
  page: Page,
  status: number = 204,
) => {
  await page.route('**/api/projects/**', async (route) => {
    const request = route.request()

    if (request.method() === 'DELETE') {
      route.fulfill({ status })
    }
  })
}

export const waitForGetEventsRequest = (page: Page) => {
  return page.waitForResponse(
    (res) => res.url().includes('/api/events') && res.status() === 200,
  )
}

export const waitForDeleteEventsRequest = (
  page: Page,
  status: number = 204,
) => {
  return page.waitForResponse((res) => {
    const method = res.request().method()

    return (
      res.url().includes('/api/events') &&
      res.status() === status &&
      method === 'DELETE'
    )
  })
}

export const waitForCreateEventRequest = (page: Page, status: number = 200) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'POST' &&
      res.url().includes(`/api/events/`) &&
      res.status() === status
    )
  })
}

export const waitForUpdateEventRequest = (page: Page, status: number = 200) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'PUT' &&
      res.url().includes(`/api/events/`) &&
      res.status() === status
    )
  })
}

export const waitForCreateProjectRequest = (
  page: Page,
  status: number = 200,
) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'POST' &&
      res.url().includes('/api/projects') &&
      res.status() === status
    )
  })
}

export const waitForUpdateProjectRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'PUT' &&
      res.url().includes('/api/projects/**') &&
      res.status() === 200
    )
  })
}

export const waitForDeleteProjectRequest = (
  page: Page,
  statusCode: number = 204,
) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'DELETE' &&
      res.url().includes(`/api/projects/`) &&
      res.status() === statusCode
    )
  })
}

export const waitForGetProjectsRequest = (page: Page) => {
  return page.waitForResponse(
    (res) => res.url().includes('/api/projects') && res.status() === 200,
  )
}
