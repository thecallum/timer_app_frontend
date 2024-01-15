import { createContext } from "react";
import { ICreateProjectModalContext } from "./types";

export const CreateProjectModalContext = createContext<
  ICreateProjectModalContext | undefined
>(undefined);
