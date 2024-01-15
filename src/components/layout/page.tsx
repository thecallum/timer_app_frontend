interface Props {
  children: JSX.Element
}

export const Page = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-white p-8 h-full shadow-lg rounded border-purple-600  border-t-8   ">
      {children}
    </div>
  )
}
