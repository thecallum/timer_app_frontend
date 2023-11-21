import { useState, useEffect, useRef } from "react";

const LOCAL_STORAGE_KEY = "startTime";

export const useTimer = () => {
  const interval = useRef<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    // initial load
    const savedStartTime = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedStartTime !== null) {
      const time = getElapsedSeconds(savedStartTime);
      console.log({ time });
      setTime(time);
      startTimer();
    }
  }, []);

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

  const getElapsedSeconds = (timestampString: string) => {
    const timestamp = new Date(parseInt(timestampString));

    const now = new Date();
    const differenceInMilliseconds = now.getTime() - timestamp.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    return differenceInSeconds;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const handleStartTimer = () => {
    startTimer();

    // record timer started
    const timestamp = Date.now().toString();
    window.localStorage.setItem(LOCAL_STORAGE_KEY, timestamp);
  };

  const stopTimer = () => {
    setIsRunning(false);
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    reset();
  };

  const reset = () => {
    setTime(0);
  };

  return {
    startTimer: handleStartTimer,
    stopTimer,
    time,
    isRunning,
  };
};
