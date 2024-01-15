interface Props {
  message: string
}

export const ErrorMessage = (props: Props) => {
  const { message } = props

  return (
    <div className="bg-red-200 mb-2 border-l-4 border-red-600 text-red-600 rounded p-2">
      {message}
    </div>
  )
}
