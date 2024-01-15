import TimerContext from "./context";
import { useTimer } from "./hooks/useTimer";

interface Props {
  children: JSX.Element;
}

const TimerContextProvider = (props: Props) => {
  const { children } = props;

  const { state, actions } = useTimer();

  const value = {
    state,
    actions,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export default TimerContextProvider;
