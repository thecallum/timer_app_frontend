import { v4 as uuidv4 } from "uuid";
import { IProject, ProjectColor } from "./types";

const placeholderProjects: IProject[] = [
  {
    id: uuidv4(),
    name: "Work",
    color: ProjectColor.Amber,
  },
  { id: uuidv4(), name: "Planning", color: ProjectColor.Teal },
  { id: uuidv4(), name: "Emails", color: ProjectColor.Lime },
];

export default placeholderProjects;
