import Modal from 'react-modal'

interface Props {
  isOpen: boolean
  close: () => void
  children: JSX.Element
  contentLabel: string
}

export const ModalContainer = (props: Props) => {
  const { isOpen, close, children, contentLabel } = props

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel={contentLabel}
      className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[500px] max-w-[calc(100%-120px)] outline-none z-30 bg-white shadow-xl rounded-md   border border-slate-50"
    >
      {children}
    </Modal>
  )
}
