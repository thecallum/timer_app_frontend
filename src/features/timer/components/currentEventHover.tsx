import { useTimer } from "@/features/timer/context/hooks/useTimer";
import dayjs from "dayjs";
import { getColor } from "../../../helpers/colors";
import { formatDuration } from "../../calendar/helpers/formatter";
import { CalendarEventView } from "@/features/calendar/components/calendar-event-view";

const HEIGHT_ONE_MINUTE = (64 / 60) * 2;

interface Props {
  showingCurrentWeek: boolean;
}

export const CurrentEventHover = (props: Props) => {
  const { showingCurrentWeek } = props;

  const { state: timerState } = useTimer();
  const { time, isRunning, startedAt, description, project } = timerState;

  const startedAtInMinutes = dayjs(startedAt).diff(
    dayjs(startedAt).startOf("day"),
    "minute"
  );

  const timeInMinutes = time / 60;

  let dayOfWeek = dayjs(startedAt).day();
  if (dayOfWeek === 0) dayOfWeek = 7;

  const projectColor = getColor(project?.color);

  if (!isRunning || !showingCurrentWeek) return null;

  return (
    <div
      className={`absolute w-[calc(100%/7)] p-[2px]`}
      style={{
        left: `calc(100%/7 * ${dayOfWeek - 1} )`,
        top: `${startedAtInMinutes * HEIGHT_ONE_MINUTE}px`,
        height: `${Math.max(timeInMinutes, 15) * HEIGHT_ONE_MINUTE}px`,
      }}
    >
      <div
        className="w-full h-full rounded-sm border border-dashed shadow-lg"
        style={{
          background: `repeating-linear-gradient(-45deg, transparent 0px, transparent 0.5em, rgba(201, 128, 107, 0.08) 0.5em, rgba(201, 128, 107, 0.08) 0.6em) ${projectColor.lightest}`,
          borderColor: projectColor.dark,
        }}
      >
        <CalendarEventView
          description={description}
          durationInSeconds={time}
          project={project}
        />
      </div>
    </div>
  );
};
