import {
  CalendarEventApiResponseObject,
  ProjectApiResponseObject,
} from '@/requests/types'
import dayjs from 'dayjs'

export const existingProject: ProjectApiResponseObject = {
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

export const createCalendarEventResponse: CalendarEventApiResponseObject = {
  id: '126',
  projectId: 82,
  description: 'Updated description',
  startTime: dayjs('2024-02-29T03:45:00Z'),
  endTime: dayjs('2024-02-29T04:00:00Z'),
}

export const updateCalendarEventResponse: CalendarEventApiResponseObject = {
  id: '126',
  projectId: 82,
  description: 'Updated description',
  startTime: dayjs('2024-02-29T03:45:00Z'),
  endTime: dayjs('2024-02-29T04:00:00Z'),
}

export const createProjectResponse = {
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

export const updateProjectResponse = {
  id: 83,
  description: 'updated description',
  projectColor: {
    lightest: '#cffafe',
    light: '#a5f3fc',
    dark: '#0891b2',
    darkest: '#164e63',
  },
  isActive: true,
  totalEventDurationInMinutes: 0,
}
