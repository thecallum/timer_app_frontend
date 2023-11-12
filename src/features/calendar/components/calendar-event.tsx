import { CalendarEvent as CalendarEventType } from "../types/calendar-event";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { usePopper } from 'react-popper'

interface Props {
  event: CalendarEventType;
}

const ONE_HOUR_IN_SECONDS = 3600;

export const CalendarEvent = (props: Props) => {
  const { description, project, duration, startTime, column } = props.event;

  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-start",
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [10, -10],
        },
      },
    ]
  })

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

  const eventStyles = {
    height: `${elementHeight}px`,
    top: `${elementTop}px`,
    left: `calc((100%/7)*${column})`
  };

  const popoverStyles = {
    // height: `${elementHeight}px`,
    top: `${elementTop + elementHeight / 2 - 10}px`,
    left: `calc(50%)`,
  };

  return (
    <Popover className="relative" key={description}>
      <Popover.Button
      ref={setReferenceElement}
        as="li"
        className={`absolute rounded-sm w-[calc(100%/7)] bg-pink-200 hover:bg-pink-300 p-2 flex flex-col justify-between overflow-hidden text-ellipsis cursor-pointer`}
        style={eventStyles}
      >
        <span>
          <div className="text-pink-950 font-semibold text-s">
            {description}
          </div>
          <div className="text-pink-500 text-xs whitespace-nowrap">
            {project}
          </div>
        </span>
        <div className="text-pink-950 text-s whitespace-nowrap">
          {formatTime(duration)}
        </div>
      </Popover.Button>

      <Popover.Panel
        className="absolute z-50 bg-white shadow-xl rounded p-4 border border-slate-50"
        // style={popoverStyles}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <h2 className="text-slate-800 text-xs mb-2">Edit Task</h2>

        <div className="shadow-sm bg-slate-100 p-2 text-xs text-slate-800 mb-2 rounded">
          Planning session
        </div>

        <div className="inline-block">
          <div className="flex flex-row justify-start items-center bg-pink-200 p-1 px-2 rounded-md">
            <div className="w-2 h-2 rounded-full bg-pink-600 block "></div>
            <div className="ml-2 text-xs text-pink-600 leading-tight">Work</div>
          </div>
        </div>

        <div className="flex mb-2">
          <div className="mr-4">
            <label htmlFor="" className="text-slate-500 text-xs">
              Start
            </label>
            <input
              type="time"
              name=""
              id=""
              className="block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm"
            />
          </div>

          <div>
            <label htmlFor="" className="text-slate-500 text-xs">
              End
            </label>
            <input
              type="time"
              name=""
              id=""
              className="block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="" className="text-slate-500 text-xs">
            Duration
          </label>
          <div>
            <span className="bg-slate-100 p-2 text-xs text-slate-800 mb-2 rounded">
              1:15:22
            </span>
          </div>
        </div>

        {/* bottom */}
        <div className="pt-4 border-t border-slate-200 mt-4">
          <button className="bg-purple-600 text-white rounded px-4 py-2 text-xs shadow-md mr-2">
            Save
          </button>
          <button className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md">
            Close
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
