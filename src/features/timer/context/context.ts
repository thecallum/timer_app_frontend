import { createContext } from "react";
import { ITimerContext } from "./types";

const TimerContext = createContext<ITimerContext | undefined>(undefined);

export default TimerContext;
