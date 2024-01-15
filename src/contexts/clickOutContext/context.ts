import { createContext } from "react";
import { IClickOutContext } from "./types";

const ClickOutContext = createContext<IClickOutContext | undefined>(undefined);

export default ClickOutContext;
