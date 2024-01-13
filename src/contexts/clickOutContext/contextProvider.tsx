import ClickOutContext from "./context";
import { useClickout } from "./hooks/useClickout";

interface Props {
  children: JSX.Element;
}

const ClickOutContextProvider = (props: Props) => {
  const { children } = props;

  const { state, actions } = useClickout();

  const value = {
    state,
    actions,
  };

  return (
    <ClickOutContext.Provider value={value}>
      {children}
    </ClickOutContext.Provider>
  );
};

export default ClickOutContextProvider;
