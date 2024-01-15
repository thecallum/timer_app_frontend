import { CreateProjectModalContext } from ".";
import { useProjectModal } from "./hooks/useProjectModal";

interface Props {
  children: JSX.Element;
}

const CreateProjectModalContextProvider = (props: Props) => {
  const { children } = props;

  return (
    <CreateProjectModalContext.Provider value={useProjectModal()}>
      {children}
    </CreateProjectModalContext.Provider>
  );
};

export default CreateProjectModalContextProvider;
