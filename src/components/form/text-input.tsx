import classNames from "classnames";

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export interface Props {
  value: string;
  setValue: (value: string) => void;
  id: string;
  name: string;
  ariaLabel: string;
  error?: string;
  autoFocus?: boolean;
  placeholder?: string;
  type?: InputType;
}

export const TextInput = (props: Props) => {
  const {
    value,
    setValue,
    id,
    name,
    ariaLabel,
    error,
    placeholder,
    autoFocus = false,
    type: inputType = "text",
  } = props;

  return (
    <input
      type={inputType}
      name={name}
      aria-label={ariaLabel}
      id={id}
      placeholder={placeholder}
      autoFocus={autoFocus}
      value={value}
      onInput={(e) => setValue(e.target.value)}
      className={classNames(
        "shadow-sm text-xs flex-grow text-slate-800 rounded block p-2 w-full border bg-white outline-none",
        {
          "border-red-600": !!error,
        }
      )}
    />
  );
};
