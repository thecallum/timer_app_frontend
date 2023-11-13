import { useState } from "react";
import { PopoverWrapper } from "./popover-wrapper";
import { SelectProjectPopover } from "./popovers/select-project-popover";
import { IProject, defaultProject } from "../types/types";

interface Props {
  project?: IProject;
}

export const Project = (props: Props) => {
  const [project, setProject] = useState(props?.project ?? defaultProject);

  return (
    <>
      <PopoverWrapper
        placement="bottom"
        offset={[0, 0]}
        useOverlay
        popoverComponent={({ close }) => (
          <SelectProjectPopover
            currentProject={project}
            selectProject={(x) => {
              setProject(x);

              setTimeout(close);
            }}
          />
        )}
      >
        {({ ref, onClick }) => (
          <button
            onClick={onClick}
            ref={ref}
            className="flex flex-row justify-start items-center  p-1 px-2 rounded-md"
            style={{
              background: project?.colors.light ?? defaultProject.colors.light,
            }}
          >
            <div
              className="w-2 h-2 rounded-full block "
              style={{
                background: project?.colors.dark ?? defaultProject.colors.dark,
              }}
            ></div>
            <div
              className="ml-2 text-xs leading-tight"
              style={{
                color: project?.colors.dark ?? defaultProject.colors.dark,
              }}
            >
              {project?.name ?? defaultProject.name}
            </div>
          </button>
        )}
      </PopoverWrapper>
    </>
  );
};
