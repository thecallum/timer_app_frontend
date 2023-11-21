import { Project } from "@/features/calendar/components/project";
import { formatDuration } from "@/features/calendar/helpers/formatter";
import { useCalendarProjects } from "@/features/calendar/hooks/useCalendarProjects";
import { IProject } from "@/features/calendar/types/types";
import { useState, useEffect, useRef } from "react";

const Logo = () => {
  return (
    <div className="w-40 px-2 flex-shrink-0 flex-grow-0 flex justify-center">
      <div
        className="bg-slate-600 rounded-md p-1 px-2 text-slate-300 flex justify-start items-center"
        style={{ fontFamily: "Nova Square" }}
      >
        <span>Time</span>
        <span className="w-2 h-2 mx-2 rounded-full bg-purple-300 block"></span>
        <span>Tracker</span>
      </div>
    </div>
  );
};

const TimerControls = () => {
  const [project, setProject] = useState<IProject | null>(null);
  const { projects } = useCalendarProjects();

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const interval = useRef<number | undefined>();

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isRunning) {
      clearInterval(interval.current);
      return;
    }

    interval.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    reset();
  };

  const reset = () => {
    setTime(0);
    setDescription("");
    setProject(null);
  };

  return (
    <div className="flex flex-row items-center justify-end w-full ml-2">
      <div className="flex-grow max-w-sm mr-2">
        <input
          type="text"
          name="description"
          id="description"
          aria-label="Event description"
          value={description}
          onInput={(e) => setDescription(e.target.value)}
          className="text-white w-full   bg-slate-600 rounded-md mr-2 px-2 h-9"
          placeholder="(no description)"
        />
      </div>

      <div className="mr-2">
        <Project
          project={project}
          projects={projects}
          setProject={setProject}
          showAddProjectModal={() => {}}
        />
      </div>

      <div className="mr-4 text-slate-200 text-xl">
        <span>{formatDuration(time)}</span>
      </div>

      {isRunning ? (
        <button
          onClick={stopTimer}
          className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-rose-900"
            >
              <path
                fill="currentColor"
                d="M6 16V8q0-.825.588-1.413T8 6h8q.825 0 1.413.588T18 8v8q0 .825-.588 1.413T16 18H8q-.825 0-1.413-.588T6 16Z"
              />
            </svg>
          </span>
        </button>
      ) : (
        <button
          onClick={startTimer}
          className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-emerald-900"
            >
              <path
                fill="currentColor"
                d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475q0 .25-.113.475t-.337.375l-8.15 5.175q-.125.075-.263.113T9 18.175q-.4 0-.7-.288t-.3-.712Z"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export const Header = () => {
  return (
    <header className="h-16 bg-slate-700 flex items-center flex-col justify-center">
      <div className="flex flex-row justify-between items-center w-full pr-2">
        <Logo />

        <TimerControls />
      </div>
    </header>
  );
};
