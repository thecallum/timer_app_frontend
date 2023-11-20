import { useState } from "react";
import { IProject, ProjectColor, defaultProject } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const placeholderProjects: IProject[] = [
  defaultProject,
  {
    id: uuidv4(),
    name: "Work",
    color: ProjectColor.Amber,
  },
  { id: uuidv4(), name: "Planning", color: ProjectColor.Teal },
  { id: uuidv4(), name: "Emails", color: ProjectColor.Lime },
];

export const useCalendarProjects = () => {
  const [projects, setProjects] = useState<IProject[]>(placeholderProjects);

  const addProject = (newProject: IProject) => {
    setProjects((x) => [...x, newProject]);
  };

  return {
    projects,
    addProject,
  };
};
