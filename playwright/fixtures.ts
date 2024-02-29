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

export const existingProjects: ProjectApiResponseObject[] = [
  {
    id: 37,
    description: 'Memez',
    projectColor: {
      lightest: '#ffe4e6',
      light: '#fecdd3',
      dark: '#e11d48',
      darkest: '#881337',
    },
    isActive: false,
    totalEventDurationInMinutes: 210,
  },
  {
    id: 39,
    description: 'Bluetooth ',
    projectColor: {
      lightest: '#e0e7ff',
      light: '#c7d2fe',
      dark: '#4f46e5',
      darkest: '#312e81',
    },
    isActive: false,
    totalEventDurationInMinutes: 11878,
  },
  {
    id: 36,
    description: 'new project',
    projectColor: {
      lightest: '#fce7f3',
      light: '#fbcfe8',
      dark: '#db2777',
      darkest: '#831843',
    },
    isActive: false,
    totalEventDurationInMinutes: 1894,
  },
  {
    id: 35,
    description: 'test',
    projectColor: {
      lightest: '#fef3c7',
      light: '#fde68a',
      dark: '#d97706',
      darkest: '#78350f',
    },
    isActive: false,
    totalEventDurationInMinutes: 126,
  },
  existingProject
]

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


export const existingCalendarEvents: CalendarEventApiResponseObject[] = [
  {
    id: '90',
    projectId: null,
    description: 'test',
    startTime: dayjs('2024-02-16T18:45:00'),
    endTime: dayjs('2024-02-16T19:00:00'),
  },
  {
    id: '92',
    projectId: null,
    description: 'test',
    startTime: dayjs('2024-02-16T06:15:00'),
    endTime: dayjs('2024-02-16T06:30:00'),
  },
  {
    id: '95',
    projectId: null,
    description: 'tresdsdfsdf',
    startTime: dayjs('2024-02-17T08:30:00'),
    endTime: dayjs('2024-02-17T08:45:00'),
  },
  {
    id: '96',
    projectId: null,
    description: 'fffff',
    startTime: dayjs('2024-02-15T10:30:00'),
    endTime: dayjs('2024-02-15T10:45:00'),
  },
  {
    id: '97',
    projectId: 37,
    description: 'Cheese',
    startTime: dayjs('2024-02-12T10:15:00'),
    endTime: dayjs('2024-02-12T10:30:00'),
  },
  {
    id: '98',
    projectId: 39,
    description: 'Ggxgsg',
    startTime: dayjs('2024-02-13T15:45:00'),
    endTime: dayjs('2024-02-13T16:00:00'),
  },
  {
    id: '91',
    projectId: null,
    description: 'testr',
    startTime: dayjs('2024-02-17T01:45:00'),
    endTime: dayjs('2024-02-17T02:00:00'),
  },
  {
    id: '93',
    projectId: 36,
    description: 'sdfsdfsdfw',
    startTime: dayjs('2024-02-14T07:15:00'),
    endTime: dayjs('2024-02-14T09:30:00'),
  },
  {
    id: '94',
    projectId: 35,
    description: 'dddd',
    startTime: dayjs('2024-02-16T06:41:29'),
    endTime: dayjs('2024-02-16T08:47:59'),
  },
  {
    id: '106',
    projectId: null,
    description: 'sfsfdsfdsf',
    startTime: dayjs('2024-02-14T06:30:00'),
    endTime: dayjs('2024-02-14T06:45:00'),
  },
  {
    id: '107',
    projectId: null,
    description: 'dsfsdfsdf',
    startTime: dayjs('2024-02-14T07:00:00'),
    endTime: dayjs('2024-02-14T10:15:00'),
  },
  {
    id: '108',
    projectId: null,
    description: 'sdsfdsfdsfdsf',
    startTime: dayjs('2024-02-14T10:45:00'),
    endTime: dayjs('2024-02-14T11:00:00'),
  },
  {
    id: '109',
    projectId: null,
    description: 'sdfsdfsdf',
    startTime: dayjs('2024-02-14T09:45:00'),
    endTime: dayjs('2024-02-14T16:00:00'),
  },
  {
    id: '110',
    projectId: null,
    description: 'zxczxcxzc',
    startTime: dayjs('2024-02-14T07:00:00'),
    endTime: dayjs('2024-02-14T12:15:00'),
  },
  {
    id: '111',
    projectId: null,
    description: 'asdasd',
    startTime: dayjs('2024-02-14T17:30:00'),
    endTime: dayjs('2024-02-14T17:45:00'),
  },
  {
    id: '116',
    projectId: 39,
    description: 'Doing what needs to be done',
    startTime: dayjs('2024-02-17T15:31:44.543'),
    endTime: dayjs('2024-02-23T13:16:13.543'),
  },
]
