import { createContext } from "react";
import { ITimerContext } from "./types";

export const TimerContext = createContext<ITimerContext | undefined>(undefined);
