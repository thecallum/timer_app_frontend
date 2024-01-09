import { useTimer } from "@/features/timer/hooks/useTimer";
import dayjs from "dayjs";
import { getColor } from "../helpers/colors";
import { formatDuration } from "../helpers/formatter";

const HEIGHT_ONE_MINUTE = 64 / 60;

export const CurrentEventHover = () => {
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

  if (!isRunning) return null;

  return (
    <div
      className={`absolute w-[calc(100%/7)]`}
      style={{
        left: `calc(100%/7 * ${dayOfWeek - 1} )`,
        top: `${startedAtInMinutes * HEIGHT_ONE_MINUTE}px`,
        height: `${Math.max(timeInMinutes, 15) * HEIGHT_ONE_MINUTE}px`,
      }}
    >
      <div className="w-full h-full p-[2px] overflow-hidden">
        <div
          className="p-2 w-full shadow-lg h-full overflow-hidden rounded-sm justify-between border-slate-400 border border-dashed"
          style={{
            background: `repeating-linear-gradient(-45deg, transparent 0px, transparent 0.5em, rgba(201, 128, 107, 0.08) 0.5em, rgba(201, 128, 107, 0.08) 0.6em) ${projectColor.light}`,
            borderColor: projectColor.dark
          }}
        >
          <div
            className="font-semibold text-s"
            style={{
              color: projectColor.darkest,
            }}
          >
            {description}
          </div>

          <div
            className="text-s whitespace-nowrap"
            style={{
              color: projectColor.darkest,
            }}
          >
            {formatDuration(time)}
          </div>
        </div>
      </div>
      <div className="bg-rose-900 w-full h-[4px] rounded-sm absolute bottom-0 left-0 shadow-2xl"></div>
    </div>
  );
};
