interface Props {
  message: string
}

export const ErrorMessage = (props: Props) => {
  const { message } = props

  return (
    <div className="bg-red-100 mb-2 border-l-4 mt-2 text-xs border-red-600 text-red-600 rounded-sm p-1">
      {message}
    </div>
  )
}
