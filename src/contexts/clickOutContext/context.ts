import { createContext } from "react";
import { ClickOutActions, ClickOutState } from "./types";

const ClickOutContext = createContext<
  | {
      state: ClickOutState;
      actions: ClickOutActions;
    }
  | undefined
>(undefined);

export default ClickOutContext;
