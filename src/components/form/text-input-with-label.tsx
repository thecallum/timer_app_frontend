import { TextInput, Props as TextInputProps } from './text-input'

interface Props extends TextInputProps {
  label: string
}

export const TextInputWithLabel = (props: Props) => {
  const {
    value,
    setValue,
    id,
    name,
    ariaLabel,
    error,
    placeholder,
    autoFocus = false,
    label,
    type,
  } = props

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-slate-500 text-xs mb-1">
        {label}
      </label>
      <div className="mb-2">
        <TextInput
          type={type}
          autoFocus={autoFocus}
          value={value}
          setValue={setValue}
          id={id}
          name={name}
          ariaLabel={ariaLabel}
          error={error}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
