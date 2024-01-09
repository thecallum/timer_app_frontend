import { createContext } from "react";
import { TimerActions, TimerState } from "./types";

const TimerContext = createContext<
  | {
      state: TimerState;
      actions: TimerActions;
    }
  | undefined
>(undefined);

export default TimerContext