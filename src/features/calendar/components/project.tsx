import { PopoverWrapper } from "./popover-wrapper";
import { SelectProjectPopover } from "./popovers/select-project-popover";

export const Project = () => {
  return (
    <>
      <PopoverWrapper
        placement="bottom"
        offset={[0, 0]}
        requireNoOtherPopovers
        popoverComponent={({ close }) => <SelectProjectPopover close={close} />}
      >
        {({ ref, onClick }) => (
          <button
            onClick={onClick}
            ref={ref}
            className="flex flex-row justify-start items-center bg-slate-200 p-1 px-2 rounded-md"
          >
            <div className="w-2 h-2 rounded-full bg-slate-600 block "></div>
            <div className="ml-2 text-xs text-slate-600 leading-tight">
              No project
            </div>
          </button>
        )}
      </PopoverWrapper>
    </>
  );
};
