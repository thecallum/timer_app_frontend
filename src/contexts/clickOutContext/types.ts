export type ClickOutTarget = {
  element: HTMLElement | null;
  callback: () => void;
};

export type ClickOutState = {
  clickoutSubscriberCount: number;
  modalIsOpen: boolean;
};

export interface ClickOutActions {
  subscribe: (element: HTMLElement, callback: () => void) => string;
  unsubscribe: (subscriptionId: string) => void;
  setModalAsOpen: (isOpen: boolean) => void;
}
