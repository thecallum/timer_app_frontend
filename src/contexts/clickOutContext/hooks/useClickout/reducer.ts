
type ClickOutTarget = {
  element: HTMLElement | null;
  callback: () => void;
};

type ClickOutReducerState = {
  subscriberStack: {
    [key: string]: ClickOutTarget;
  };
  subscriberOrder: string[];
};

type Action =
  | {
      type: "SUBSCRIBE";
      subscriptionId: string;
      subscription: ClickOutTarget;
    }
  | { type: "UNSUBSCRIBE"; subscriptionId: string };

export const reducer = (state: ClickOutReducerState, action: Action) => {
  switch (action.type) {
    case "SUBSCRIBE": {
      const newSubscriberOrder = [
        ...state.subscriberOrder,
        action.subscriptionId,
      ];

      const newSubscriberStack = {
        ...state.subscriberStack,
        [action.subscriptionId]: action.subscription,
      };

      return {
        ...state,
        subscriberOrder: newSubscriberOrder,
        subscriberStack: newSubscriberStack,
      };
    }

    case "UNSUBSCRIBE": {
      const newSubscriberOrder = state.subscriberOrder.filter(
        (y) => y !== action.subscriptionId
      );

      const newSubscriberStack = {
        ...state.subscriberStack,
      };

      delete newSubscriberStack[action.subscriptionId];

      return {
        ...state,
        subscriberOrder: newSubscriberOrder,
        subscriberStack: newSubscriberStack,
      };
    }

    default:
      return state;
  }
};
