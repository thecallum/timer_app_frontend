import { CalendarEvent } from '@/features/calendar/types/types'
import { IEventState } from '../../types'

type Action =
  | { type: 'update_event'; event: CalendarEvent }
  | { type: 'add_event'; event: CalendarEvent }
  | { type: 'delete_event'; event: CalendarEvent }

export const reducer = (state: IEventState, action: Action): IEventState => {
  switch (action.type) {
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
