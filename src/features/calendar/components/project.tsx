import { PopoverWrapper } from "./popover-wrapper";
import { SelectProjectPopover } from "./popovers/select-project-popover";
import { IProject, defaultProject } from "../types/types";
import { getColor } from "../helpers/colors";

interface Props {
  project: IProject | null;
  projects: IProject[];
  containerRef: HTMLDivElement | null;
  showAddProjectModal: () => void;
  setProject: (project: IProject | null) => void;
}

export const Project = (props: Props) => {
  const { showAddProjectModal, projects, project, setProject, containerRef } =
    props;

  return (
    <>
      <PopoverWrapper
        containerRef={containerRef}
        // placement="bottom"
        // offset={[0, 0]}
        popoverComponent={({ close }) => (
          <SelectProjectPopover
            projects={projects}
            showAddProjectModal={showAddProjectModal}
            currentProject={project ?? defaultProject}
            selectProject={(x) => {
              setProject(x);

              setTimeout(close);
            }}
          />
        )}
      >
        {({ ref, onClick }) => {
          const projectColor = getColor(project?.color);

          return (
            <button
              type="button"
              onClick={onClick}
              ref={ref}
              className="flex flex-row justify-start items-center  p-1 px-2 rounded-md"
              style={{
                background: projectColor.light,
              }}
            >
              <div
                className="w-2 h-2 rounded-full block "
                style={{
                  background: projectColor.dark,
                }}
              ></div>
              <div
                className="ml-2 text-xs leading-tight"
                style={{
                  color: projectColor.dark,
                }}
              >
                {project?.name ?? defaultProject.name}
              </div>
            </button>
          );
        }}
      </PopoverWrapper>
    </>
  );
};
