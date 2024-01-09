import { useContext } from "react";
import { TimerContext } from "@/contexts/timerContext";

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }

  return context;
};
