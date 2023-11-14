import dayjs from "dayjs";
import { Project } from "../project";
import { PopoverContainer } from "./popover-container";

interface Props {
  close: () => void;
  time: dayjs.Dayjs;
  showAddProjectModal: () => void;
}

export const AddEventPopover = (props: Props) => {
  const { close, time, showAddProjectModal } = props;

  return (
    <PopoverContainer title="Add Task">
      <>
        <div className="shadow-sm bg-slate-100 p-2 text-xs text-slate-800 mb-2 rounded">
          What have you done?
        </div>

        <div className="inline-block">
          <Project showAddProjectModal={showAddProjectModal} />
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
              defaultValue={time.format("YYYY-MM-DDThh:mm")}
              autoFocus
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
              defaultValue={time.add(15, "minute").format("YYYY-MM-DDThh:mm")}
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
              0:00:00
            </span>
          </div>
        </div>

        {/* bottom */}
        <div className="pt-4 border-t border-slate-200 mt-4">
          <button className="bg-purple-600 text-white rounded px-4 py-2 text-xs shadow-md mr-2">
            Add
          </button>
          <button
            onClick={close}
            className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md"
          >
            Close
          </button>
        </div>
      </>
    </PopoverContainer>
  );
};
