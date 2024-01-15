import { useState } from "react";
import { IProject } from "../../types";
import { placeholderProjects } from "./placeholderProjects";

export const useProjects = () => {
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
