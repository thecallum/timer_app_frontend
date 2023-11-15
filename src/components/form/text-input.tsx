import classNames from "classnames";

interface Props {
  value: string;
  setValue: (value: string) => void;
  id: string;
  name: string;
  ariaLabel: string;
  error?: string;
  placeholder?: string;
}

export const TextInput = (props: Props) => {
  const { value, setValue, id, name, ariaLabel, error, placeholder } = props;

  return (
      <input
        type="text"
        name={name}
        aria-label={ariaLabel}
        id={id}
        placeholder={placeholder}
        value={value}
        onInput={(e) => setValue(e.target.value)}
        className={classNames(
          "shadow-sm text-xs flex-grow text-slate-800 rounded block p-2 w-full border bg-slate-100 outline-none",
          {
            "border-red-600": !!error,
          }
        )}
      />
  );
};
