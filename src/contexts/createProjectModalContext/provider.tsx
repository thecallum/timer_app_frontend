import { useEffect, useState } from "react";
import { useProjectsContext } from "../projectsContext";
import { IProject } from "../projectsContext/types";
import { CreateProjectModalContext } from ".";
import { useClickOutContext } from "../clickOutContext";

interface Props {
  children: JSX.Element;
}

const CreateProjectModalContextProvider = (props: Props) => {
  const { children } = props;

  const { addProject } = useProjectsContext();
  const { actions } = useClickOutContext();
  const { setModalAsOpen } = actions;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalAsOpen(modalIsOpen);
  }, [modalIsOpen]);

  const closeModal = () => {
    setTimeout(() => setModalIsOpen(false));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const onCreateProject = (newProject: IProject) => {
    addProject(newProject);
    closeModal();
  };

  const value = {
    modalIsOpen,
    closeModal,
    openModal,
    onCreateProject,
  };

  return (
    <CreateProjectModalContext.Provider value={value}>
      {children}
    </CreateProjectModalContext.Provider>
  );
};

export default CreateProjectModalContextProvider;
