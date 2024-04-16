interface Props {
  children: JSX.Element
}

export const Page = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-white h-full p-4 mb-[30px] shadow-lg rounded border-purple-500 border-t-8 relative">
      {children}
    </div>
  )
}
