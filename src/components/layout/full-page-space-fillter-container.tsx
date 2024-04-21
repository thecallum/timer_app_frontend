interface Props {
  top: JSX.Element
  children: JSX.Element
}

export const FullPageSpaceFillerContailer = (props: Props) => {
  const { top, children } = props

  return (
    <div className="w-full flex overflow-hidden items-center flex-col h-[calc(100vh-180px)] lg:h-[calc(100vh-124px)]">
      <div className="w-full max-w-[1600px] h-full flex flex-col overflow-hidden ">
        <div>{top}</div>
        <div className="flex-grow overflow-hidden h-full">{children}</div>
      </div>
    </div>
  )
}
