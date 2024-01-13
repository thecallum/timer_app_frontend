import classNames from "classnames";
import {
  PopoverContainer,
  PopoverControls,
  PopoverLayout,
} from "@/components/popover";
import { getColor } from "../../helpers/colors";
import { useProjectModalContainerContext } from "@/modals/create-project-modal-container";
import { useProjectsContext } from "@/contexts/projectsContext/hooks/useProjectsContext";
import { IProject, defaultProject } from "@/contexts/projectsContext/types";

interface Props {
  currentProject: IProject;
  selectProject: (project: IProject) => void;
}

export const SelectProjectPopover = (props: Props) => {
  const { selectProject, currentProject } = props;

  const { projects } = useProjectsContext();
  const { openModal } = useProjectModalContainerContext();

  return (
    <PopoverContainer width="w-48">
      <>
        <PopoverLayout title="Project">
          <ul className="">
            {[defaultProject, ...projects].map((x) => {
              const { name, color, id } = x;

              const projectColor = getColor(color);

              return (
                <li key={id}>
                  <button
                    type="button"
                    className={classNames(
                      "flex flex-row justify-start items-center p-2 my-1 rounded-md w-full hover:bg-slate-100",
                      {
                        "bg-slate-200": id === currentProject?.id,
                      }
                    )}
                    onClick={() => selectProject(x)}
                  >
                    <div
                      className="w-2 h-2 rounded-full block "
                      style={{ background: projectColor.dark }}
                    ></div>
                    <div
                      className="ml-2 text-sm leading-tight"
                      style={{ color: projectColor.dark }}
                    >
                      {name}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </PopoverLayout>

        <PopoverControls>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="text-slate-600  underline underline-offset-1 text-sm"
            >
              Create a new project
            </button>
          </div>
        </PopoverControls>
      </>
    </PopoverContainer>
  );
};
