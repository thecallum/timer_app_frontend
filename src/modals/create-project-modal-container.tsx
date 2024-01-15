import { CreateProjectModal } from "./create-project-modal";
import { useProjectsContext } from "@/contexts/projectsContext/hooks/useProjectsContext";
import { useCreateProjectModalContext } from "@/contexts/createProjectModalContext";

export const CreateProjectModalContainer = () => {
  const { modalIsOpen, closeModal, onCreateProject } =
    useCreateProjectModalContext();

  const { projects } = useProjectsContext();

  return (
    <div className="z-20">
      <CreateProjectModal
        isOpen={modalIsOpen}
        close={closeModal}
        onCreate={onCreateProject}
        projects={projects}
      />
    </div>
  );
};
