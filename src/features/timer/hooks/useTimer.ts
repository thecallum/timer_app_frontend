import { useState, useEffect, useRef } from "react";

export const useTimer = () => {
  const interval = useRef<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(interval.current);
      return;
    }

    interval.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    reset();
  };

  const reset = () => {
    setTime(0);
  };

  return {
    startTimer,
    stopTimer,
    time,
    isRunning,
  };
};
