import { useState } from "react";
import { IProject, ProjectColor } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const placeholderProjects: IProject[] = [
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

  const updateProject = (project: IProject) => {
    setProjects((state) =>
      state.map((x) => {
        if (x.id === project.id) return project;
        return x;
      })
    );
  };

  const deleteProject = (project: IProject) => {
    setProjects((state) => [...state].filter((x) => x.id !== project.id));
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
};
