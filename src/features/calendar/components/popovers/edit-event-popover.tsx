import { CalendarEvent } from "../../types/calendar-event";

interface Props {
  close: () => void;
  event: CalendarEvent;
  duration: string;
}

export const EditEventPopover = (props: Props) => {
  const { close, event, duration } = props;
  const {description, project, start, end} = event

  return (
    <div className="bg-white shadow-xl rounded p-4 border border-slate-50">
      <h2 className="text-slate-800 text-xs mb-2">Edit Task</h2>

      <div className="shadow-sm bg-slate-100 p-2 text-xs text-slate-800 mb-2 rounded">
        {description}
      </div>

      <div className="inline-block">
        <div className="flex flex-row justify-start items-center bg-pink-200 p-1 px-2 rounded-md">
          <div className="w-2 h-2 rounded-full bg-pink-600 block "></div>
          <div className="ml-2 text-xs text-pink-600 leading-tight">{project}</div>
        </div>
      </div>

      <div className="flex mb-2">
        <div className="mr-4">
          <label htmlFor="" className="text-slate-500 text-xs">
            Start
          </label>
          <input
            type="datetime-local"
            name=""
            id=""
            defaultValue={start.format("YYYY-MM-DDThh:mm")}
            className="block border rounded py-2 px-4 shadow-sm text-slate-600 text-sm"
          />
        </div>

        <div>
          <label htmlFor="" className="text-slate-500 text-xs">
            End
          </label>
          <input
            type="datetime-local"
            name=""
            defaultValue={end.format("YYYY-MM-DDThh:mm")}

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
            {duration}
          </span>
        </div>
      </div>

      {/* bottom */}
      <div className="pt-4 border-t border-slate-200 mt-4">
        <button className="bg-purple-600 text-white rounded px-4 py-2 text-xs shadow-md mr-2">
          Save
        </button>
        <button
          onClick={close}
          className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
