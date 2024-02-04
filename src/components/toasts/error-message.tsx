interface Props {
  message: string
  label: string
}

export const ErrorMessage = (props: Props) => {
  const { message, label } = props
  return (
    <div>
      <span>{label}</span>
      <p className="text-red-600">{message}</p>
    </div>
  )
}
