interface ButtonProps {
  children: JSX.Element | string
  type?: 'button' | 'reset' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const ButtonPrimary = (props: ButtonProps) => {
  const { children, type = 'button', onClick } = props

  return (
    <button
      className="bg-purple-500 text-white rounded px-4 py-2 text-xs shadow-md mr-2"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const ButtonSecondary = (props: ButtonProps) => {
  const { children, type = 'button', onClick } = props

  return (
    <button
      className="bg-purple-200 text-purple-500 rounded px-4 py-2 text-xs shadow-md"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
