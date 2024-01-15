import { useContext } from "react";
import { CreateProjectModalContext } from "..";

export const useCreateProjectModalContext = () => {
  const context = useContext(CreateProjectModalContext);
  if (context === undefined) {
    throw new Error(
      "useCreateProjectModalContext must be used within a CreateProjectModalContextProvider"
    );
  }

  return context;
};
