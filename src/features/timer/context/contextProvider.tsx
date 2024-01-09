import TimerContext from "./context";
import { useTimerContext } from "./hooks/useTimerContext";

interface Props {
  children: JSX.Element;
}

const TimerContextProvider = (props: Props) => {
  const { children } = props;

  const { state, actions } = useTimerContext();

  const value = {
    state,
    actions,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export default TimerContextProvider;
