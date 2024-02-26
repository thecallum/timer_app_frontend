import { Page } from '@playwright/test'
import { ProjectApiResponseObject } from '@/requests/types'

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

const createCalendarEventResponse = {
  id: 126,
  projectId: 82,
  description: 'Updated description',
  startTime: '2024-02-29T03:45:00Z',
  endTime: '2024-02-29T04:00:00Z',
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

export const setupGetEventsIntercept = async (page: Page) => {
  page.route('**/api/events**', async (route) => {
    route.fulfill({ json: [], status: 200 })
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

export const setupCreateCalendarEventIntercept = async (page: Page) => {
  await page.route('**/api/events/', async (route) => {
    const request = route.request()

    if (request.method() === 'POST') {
      route.fulfill({ json: createCalendarEventResponse, status: 200 })
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
