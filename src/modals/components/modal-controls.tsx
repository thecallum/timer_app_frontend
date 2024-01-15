interface Props {
  children: JSX.Element
}

export const ModalControls = (props: Props) => {
  const { children } = props

  return <div className="border-t border-slate-200 p-4">{children}</div>
}
