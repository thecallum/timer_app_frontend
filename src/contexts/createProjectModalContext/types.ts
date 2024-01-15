import { IProject } from "../projectsContext/types";

export interface ICreateProjectModalContext {
  modalIsOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  onCreateProject: (newProject: IProject) => void;
}
