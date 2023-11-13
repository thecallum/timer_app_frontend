import classNames from "classnames";
import {
  IProject,
  ProjectColors,
  defaultProject,
  projectColors,
} from "../../types/types";

interface Props {
  currentProject: IProject;
  selectProject: (project: IProject) => void;
}

export const SelectProjectPopover = (props: Props) => {
  const { selectProject, currentProject } = props;

  const projects: IProject[] = [
    defaultProject,
    {
      name: "Work",
      colors: projectColors[ProjectColors.Amber],
    },
    { name: "Planning", colors: projectColors[ProjectColors.Teal] },
    { name: "Emails", colors: projectColors[ProjectColors.Lime] },
  ];

  return (
    <div className="bg-white shadow-xl rounded p-4 border border-slate-50 w-48">
      <h2 className="text-slate-800 text-xs mb-2">Project</h2>

      <ul className="">
        {projects.map((x, index) => {
          const { name, colors } = x;

          return (
            <li key={name}>
              <button
                className={classNames(
                  "flex flex-row justify-start items-center p-2 my-1 rounded-md w-full hover:bg-slate-100",
                  {
                    "bg-slate-200": name === currentProject?.name,
                  }
                )}
                onClick={() => selectProject(x)}
              >
                <div
                  className="w-2 h-2 rounded-full block "
                  style={{ background: colors.dark }}
                ></div>
                <div
                  className="ml-2 text-sm leading-tight"
                  style={{ color: colors.dark }}
                >
                  {name}
                </div>
              </button>
            </li>
          );
        })}
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
