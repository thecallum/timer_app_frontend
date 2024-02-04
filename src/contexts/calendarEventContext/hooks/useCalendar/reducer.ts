import { CalendarEvent } from '@/types/calendarEvents'

type Action =
  | { type: 'add_loaded_events'; events: CalendarEvent[] }
  | { type: 'update_event'; event: CalendarEvent }
  | { type: 'add_event'; event: CalendarEvent }
  | { type: 'delete_event'; event: CalendarEvent }

type EventState = {
  events: CalendarEvent[]
}

export const reducer = (state: EventState, action: Action): EventState => {
  switch (action.type) {
    case 'add_loaded_events':
      return {
        ...state,
        events: action.events,
      }

    case 'update_event':
      return {
        ...state,
        events: state.events.map((x) =>
          x.id === action.event.id ? action.event : x,
        ),
      }

    case 'add_event':
      return {
        ...state,
        events: [...state.events, action.event],
      }

    case 'delete_event':
      return {
        ...state,
        events: [...state.events.filter((x) => x.id !== action.event.id)],
      }

    default:
      return state
  }
}
