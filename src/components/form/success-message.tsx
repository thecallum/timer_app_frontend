interface Props {
  children: JSX.Element
}

export const SuccessMessage = (props: Props) => {
  const { children } = props

  return (
    <div className="bg-lime-200 text-lime-700 p-1 text-sm mt-2 border-l-4 border-lime-500 rounded-sm">
      {children}
    </div>
  )
}
