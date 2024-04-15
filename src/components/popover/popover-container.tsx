import classNames from 'classnames'

interface Props {
  children: JSX.Element
  width?: string
  id: string
}

export const PopoverContainer = (props: Props) => {
  const { children, width, id } = props

  return (
    <div
      id={id}
      className={classNames(
        'bg-white shadow-2xl  rounded-md border border-slate-50 z-10 max-w-[calc(100vw-30px)] w-full',
        { [width as string]: width },
      )}
    >
      {children}
    </div>
  )
}
