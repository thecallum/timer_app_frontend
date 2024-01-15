import { useProjects } from "./hooks/useProjects";
import { ProjectsContext } from "./projectsContext";

interface Props {
  children: JSX.Element;
}

export const ProjectsContextProvider = (props: Props) => {
  const { children } = props;

  const value = useProjects();

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
