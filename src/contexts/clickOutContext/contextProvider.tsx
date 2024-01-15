import ClickOutContext from "./context";
import { useClickout } from "./hooks/useClickout";

interface Props {
  children: JSX.Element;
}

const ClickOutContextProvider = (props: Props) => {
  const { children } = props;

  return (
    <ClickOutContext.Provider value={useClickout()}>
      {children}
    </ClickOutContext.Provider>
  );
};

export default ClickOutContextProvider;
