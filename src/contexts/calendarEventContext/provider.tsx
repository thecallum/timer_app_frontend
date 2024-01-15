import CalendarEventContext from "./context";
import { useCalendar } from "./hooks/useCalendar";
import { ICalendarEventContext } from "./types";

interface Props {
    children: JSX.Element;
  }
  
  export const CalendarContextProvider = (props: Props) => {
    const { children } = props;
  
    const { updateEvent, addEvent, deleteEvent, getAllEvents, getEvents } =
      useCalendar();
  
    const value: ICalendarEventContext = {
      updateEvent,
      addEvent,
      deleteEvent,
      getAllEvents,
      getEvents,
    };
  
    return (
      <CalendarEventContext.Provider value={value}>
        {children}
      </CalendarEventContext.Provider>
    );
  };
  