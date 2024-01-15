import { useEffect, useReducer, useState } from "react";
import { reducer } from "../reducer";
import { v4 as uuidv4 } from "uuid";

export const useClickout = () => {
  const [state, dispatch] = useReducer(reducer, {
    subscriberStack: {},
    subscriberOrder: [],
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const subscribe = (element: HTMLElement | null, callback: () => void) => {
    const subscriptionId = uuidv4();

    dispatch({
      type: "SUBSCRIBE",
      subscriptionId,
      subscription: {
        element,
        callback,
      },
    });

    return subscriptionId;
  };

  const unsubscribe = (subscriptionId: string) => {
    dispatch({
      type: "UNSUBSCRIBE",
      subscriptionId,
    });
  };

  const getTopSubscriber = () => {
    if (state.subscriberOrder.length === 0) return null;

    const topSubscriberId =
      state.subscriberOrder[state.subscriberOrder.length - 1];

    return state.subscriberStack[topSubscriberId];
  };

  const clickWithinElement = (element: HTMLElement, event: MouseEvent) => {
    return element.contains(event.target as Node);
  };

  const handleClick = (event: MouseEvent) => {
    // Ignore any click events if modal is open
    if (modalIsOpen) return;

    const topSubscriber = getTopSubscriber();
    if (!topSubscriber?.element) return;

    if (!clickWithinElement(topSubscriber.element, event)) {
      topSubscriber.callback();
    }
  };

  const setModalAsOpen = (isOpen: boolean) => {
    setModalIsOpen((x) => isOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
    // This may or may result in slow performance,
    // running every time state updates
  }, [state, modalIsOpen]);

  return {
    state: {
      clickoutSubscriberCount: state.subscriberOrder.length,
      modalIsOpen,
    },
    actions: {
      setModalAsOpen,
      subscribe,
      unsubscribe,
    },
  };
};
