import { CalendarEvent as CalendarEventType } from "../types/calendar-event";

interface Props {
 event: CalendarEventType
}

const ONE_HOUR_IN_SECONDS = 3600;

export const CalendarEvent = (props: Props) => {
  const { description, project, duration, startTime } = props.event;

  //   divide by 15

  const durationByFifteen = Math.ceil(duration / 60 / 15);
  const topByFifteen = Math.ceil((startTime + ONE_HOUR_IN_SECONDS) / 60 / 15);

  const elementHeight = durationByFifteen * 16; // 15 minutes is 16px
  const elementTop = topByFifteen * 16;

  const formatTime = (seconds: number) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  const styles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
  };

  return (
    <li
      key={description}
      className={`absolute rounded-sm w-full bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
      style={styles}
    >
      <span>
        <div className="text-pink-950 font-semibold text-s">{description}</div>
        <div className="text-pink-500 text-xs whitespace-nowrap">{project}</div>
      </span>
      <div className="text-pink-950 text-s whitespace-nowrap">
        {formatTime(duration)}
      </div>
    </li>
  );
};
