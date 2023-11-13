interface Props {
  close: () => void;
}

export const SelectProjectPopover = (props: Props) => {
  const { close } = props;

  return (
    <div className="bg-white shadow-xl rounded p-4 border border-slate-50 w-48">
      <h2 className="text-slate-800 text-xs mb-2">Project</h2>

      <ul className="">
        <li>
          <button className="flex flex-row justify-start items-center p-2 rounded-md w-full bg-slate-100">
            <div className="w-2 h-2 rounded-full bg-slate-600 block "></div>
            <div className="ml-2 text-sm text-slate-600 leading-tight">
              No project
            </div>
          </button>
        </li>

        <li>
          <button className="flex flex-row justify-start items-center p-2 rounded-md w-full">
            <div className="w-2 h-2 rounded-full bg-purple-600 block "></div>
            <div className="ml-2 text-sm text-purple-600 leading-tight">
              Work
            </div>
          </button>
        </li>

        <li>
          <button className="flex flex-row justify-start items-center p-2 rounded-md w-full">
            <div className="w-2 h-2 rounded-full bg-lime-600 block "></div>
            <div className="ml-2 text-sm text-lime-600 leading-tight">
              Planning
            </div>
          </button>
        </li>

        <li>
          <button className="flex flex-row justify-start items-center p-2 rounded-md w-full">
            <div className="w-2 h-2 rounded-full bg-amber-600 block "></div>
            <div className="ml-2 text-sm text-amber-600 leading-tight">
              Emails
            </div>
          </button>
        </li>
      </ul>

      {/* bottom */}
      <div className="pt-2 border-t border-slate-200 mt-4 flex items-center justify-center">
        <button className="text-slate-600  underline underline-offset-1 mt-2 text-sm">
          Create a new project
        </button>
      </div>
    </div>
  );
};
