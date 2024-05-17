import { Bounce, Id, toast, UpdateOptions } from 'react-toastify'

export const displayToast = (
  notification: Id,
  options: UpdateOptions<unknown>,
) => {
  toast.update(notification, {
    isLoading: false,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    ...options,
  })
}
