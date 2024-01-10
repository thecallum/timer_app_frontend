import { getColor } from "../../../helpers/colors";
import { formatDuration } from "../helpers/formatter";
import { IProject, defaultProject } from "../types/types";

interface Props {
  description: string;
  project: IProject | null;
  durationInSeconds: number;
}

export const CalendarEventView = (props: Props) => {
  const { description, project, durationInSeconds } = props;

  const projectColor = getColor(project?.color);

  return (
    <div className="w-full h-full p-2 flex flex-col justify-between overflow-hidden">
      <span className="text-start">
        <div
          className="font-semibold text-s"
          style={{
            color: projectColor.darkest,
          }}
        >
          {description || "(no description)"}
        </div>
        <div
          className="text-xs whitespace-nowrap"
          style={{
            color: projectColor.dark,
          }}
        >
          {project?.name ?? defaultProject.name}
        </div>
      </span>
      <div
        className="text-s whitespace-nowrap text-left"
        style={{
          color: projectColor.darkest,
        }}
      >
        {formatDuration(durationInSeconds)}
      </div>
    </div>
  );
};
