import { ProjectsContext } from ".";
import { useProjects } from "./hooks/useProjects";

interface Props {
  children: JSX.Element;
}

const ProjectsContextProvider = (props: Props) => {
  const { children } = props;

  const value = useProjects();

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
