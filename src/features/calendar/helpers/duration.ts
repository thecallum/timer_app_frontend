import { ICalendarEvent } from "../types/types";

export const calculateDuration = (events: ICalendarEvent[]) => {
    const totalDurationInSeconds = events.reduce(
        (accumulator, currentValue) => {
            const eventDurationInSeconds = currentValue.end.diff(
                currentValue.start,
                "second"
            );
            return accumulator + eventDurationInSeconds;
        },
        0
    );

    return totalDurationInSeconds;
};


