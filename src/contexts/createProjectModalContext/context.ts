import { createContext } from "react";
import { IProject } from "../projectsContext/types";

interface ContextState {
  modalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  onCreateProject: (newProject: IProject) => void;
}

const CreateProjectModalContext = createContext<ContextState | undefined>(
  undefined
);

export default CreateProjectModalContext;
