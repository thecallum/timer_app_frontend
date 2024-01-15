import { useReducer } from "react";
import reducer from "../reducer";
import { placeholderEvents } from "../placeholderEvents";
import { CalendarEvent } from "@/features/calendar/types/types";
import dayjs from "dayjs";
import { getEvents } from "../getEvents";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, {
    events: placeholderEvents,
  });

  const updateEvent = (event: CalendarEvent) => {
    dispatch({
      type: "update_event",
      event,
    });
  };

  const addEvent = (event: CalendarEvent) => {
    dispatch({
      type: "add_event",
      event,
    });
  };

  const deleteEvent = (event: CalendarEvent) => {
    dispatch({
      type: "delete_event",
      event,
    });
  };

  const filterEvents = (week: number) => {
    const today = dayjs();

    const weeksMultiplier = 7 * week;

    const startOfWeek = today.startOf("week").add(1 + weeksMultiplier, "days");
    const endOfWeek = startOfWeek.add(7, "days");

    return state.events.filter((x) => {
      return (
        x.start.startOf("day").isSameOrAfter(startOfWeek) &&
        x.start.startOf("day").isBefore(endOfWeek)
      );
    });
  };

  return {
    updateEvent,
    addEvent,
    deleteEvent,
    getAllEvents: () => getEvents(state.events),
    getEvents: (week: number) => getEvents(filterEvents(week)),
  };
};
