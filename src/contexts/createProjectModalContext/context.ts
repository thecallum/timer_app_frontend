import { createContext } from "react";
import { ICreateProjectModalContext } from "./types";

const CreateProjectModalContext = createContext<
  ICreateProjectModalContext | undefined
>(undefined);

export default CreateProjectModalContext;
