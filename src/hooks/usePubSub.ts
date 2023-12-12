import { useState } from "react";

export const usePubSub = () => {
  const [subscribers, setSubscribers] = useState<Set<{ (): void }>>(new Set());

  const subscribe = (cb: () => void) => {
    setSubscribers((x) => new Set([...x, cb]));
  };

  const unsubscribe = (cb: () => void) => {
    setSubscribers((x) => {
      x.delete(cb);
      return x;
    });
  };

  const call = () => {
    subscribers.forEach((cb) => cb());
  };

  return {
    subscribe,
    unsubscribe,
    call,
  };
};
