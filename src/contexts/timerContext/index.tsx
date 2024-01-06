import { createContext, useEffect, useRef, useState } from "react";

interface ITimerState {
  isRunning: boolean;
  time: number;
  startedAt: Date | undefined;
}

interface ITimerContext {
  state: ITimerState;
  actions: {
    startTimer: () => void;
    stopTimer: () => void;
  };
}

export const TimerContext = createContext<ITimerContext | undefined>(undefined);

interface Props {
  children: JSX.Element;
}
const LOCAL_STORAGE_KEY = "startTime";

export const TimerContextProvider = (props: Props) => {
  const { children } = props;

  const interval = useRef<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [startedAt, setStartedAt] = useState<Date>();

  useEffect(() => {
    // initial load
    const savedStartTime = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedStartTime !== null) {
      const timestamp = getTimestamp(savedStartTime);

      setStartedAt(timestamp);
      const time = getElapsedSeconds(timestamp);

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

  const getTimestamp = (timestampString: string) => {
    return new Date(parseInt(timestampString));
  };

  const getElapsedSeconds = (timestamp: Date) => {
    // const timestamp = new Date(parseInt(timestampString));

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

  const value: ITimerContext = {
    state: {
      isRunning,
      startedAt,
      time,
    },
    actions: {
      startTimer: handleStartTimer,
      stopTimer,
    },
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
