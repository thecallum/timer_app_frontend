import { createContext } from "react";
import { IProjectsContext } from "./types";

const ProjectsContext = createContext<IProjectsContext | undefined>(undefined);

export default ProjectsContext;
