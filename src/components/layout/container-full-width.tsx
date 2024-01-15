interface Props {
  children: JSX.Element
}

export const ContainerFullWidth = (props: Props) => {
  const { children } = props

  return (
    <div
      id="mainElement"
      className="flex justify-between items-center w-full flex-col h-full"
    >
      <div className="w-[calc(100%-60px)] h-[calc(100%-4rem)]">{children}</div>
    </div>
  )
}
