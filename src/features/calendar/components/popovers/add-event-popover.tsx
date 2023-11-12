interface Props {
  close: () => void;
}

export const AddEventPopover = (props: Props) => {
  const { close } = props 

  return (
    <div
      className="bg-white shadow-xl rounded p-4 border border-slate-50"
    >
      <h2 className="text-slate-800 text-xs mb-2">Add Task</h2>

      <div className="shadow-sm bg-slate-100 p-2 text-xs text-slate-800 mb-2 rounded">
        What have you done?
      </div>

      <div className="inline-block">
        <div className="flex flex-row justify-start items-center bg-slate-200 p-1 px-2 rounded-md">
          <div className="w-2 h-2 rounded-full bg-slate-600 block "></div>
          <div className="ml-2 text-xs text-slate-600 leading-tight">No project</div>
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
        className="bg-purple-200 text-purple-600 rounded px-4 py-2 text-xs shadow-md">
          Close
        </button>
      </div>
    </div>
  );
};