
export interface IClickOutContext {
  subscribe: (element: HTMLElement, callback: () => void) => string;
  unsubscribe: (subscriptionId: string) => void;
  setModalAsOpen: (isOpen: boolean) => void;
  clickoutSubscriberCount: number;
  modalIsOpen: boolean;

}