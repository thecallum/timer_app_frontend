import { CalendarEvent } from '@/types/calendarEvents'

type Action =
  | { type: 'set_loading'; clearEvents: boolean }
  | { type: 'add_loaded_events'; events: CalendarEvent[] }
  | { type: 'update_event'; event: CalendarEvent }
  | { type: 'add_event'; event: CalendarEvent }
  | { type: 'delete_event'; event: CalendarEvent }

type EventState = {
  events: CalendarEvent[]
  isLoading: boolean
}

export const reducer = (state: EventState, action: Action): EventState => {
  switch (action.type) {
    case 'set_loading':
      return {
        ...state,
        isLoading: true,
        events: action.clearEvents ? [] : state.events,
      }

    case 'add_loaded_events':
      return {
        ...state,
        events: action.events,
        isLoading: false,
      }

    case 'update_event':
      return {
        ...state,
        events: state.events.map((x) =>
          x.id === action.event.id ? action.event : x,
        ),
        isLoading: false,
      }

    case 'add_event':
      return {
        ...state,
        events: [...state.events, action.event],
        isLoading: false,
      }

    case 'delete_event':
      return {
        ...state,
        events: [...state.events.filter((x) => x.id !== action.event.id)],
        isLoading: false,
      }

    default:
      return state
  }
}
