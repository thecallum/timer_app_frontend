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

export const setupDeleteCalendarEventIntercept = async (page: Page) => {
  await page.route('**/api/events/**', async (route) => {
    const request = route.request()

    if (request.method() === 'DELETE') {
      route.fulfill({ status: 204 })
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

export const setupUpdateProjectRequestIntercept = async (
  page: Page,
  data: ProjectApiResponseObject = updateProjectResponse,
) => {
  await page.route('**/api/projects/**', async (route) => {
    const request = route.request()

    if (request.method() === 'PUT') {
      route.fulfill({ json: data, status: 200 })
    }
  })
}

export const setupDeleteProjectRequestIntercept = async (page: Page) => {
  await page.route('**/api/projects/**', async (route) => {
    const request = route.request()

    if (request.method() === 'DELETE') {
      route.fulfill({ status: 204 })
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

export const waitForDeleteProjectRequest = (page: Page) => {
  return page.waitForResponse((res) => {
    const request = res.request()

    return (
      request.method() === 'DELETE' &&
      res.url().includes(`/api/projects/`) &&
      res.status() === 204
    )
  })
}

export const waitForGetProjectsRequest = (page: Page) => {
  return page.waitForResponse(
    (res) => res.url().includes('/api/projects') && res.status() === 200,
  )
}
