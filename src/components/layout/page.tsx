interface Props {
  children: JSX.Element
}

export const Page = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-white p-4 sm:p-8 shadow-lg rounded border-purple-500 border-t-8 relative">
      {children}
    </div>
  )
}
