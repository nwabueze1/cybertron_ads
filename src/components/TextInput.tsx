import { ChangeEventHandler, FC, FocusEventHandler } from "react";

export type TextInputProps = {
  name: string;
  onChange?: (e: { name: string; value: string }) => void;
  onFocus?: (e: { name: string; value: string }) => void;
  label?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  isRequired?: boolean;
};

export const TextInput: FC<TextInputProps> = ({
  name,
  onChange,
  onFocus,
  label,
  placeholder,
  errorMessage,
  isError,
  value,
  isRequired,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.({ name, value: e.target.value });
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus?.({ name, value: e.target.value });
  };

  return (
    <div>
      {label && (
        <label className="uppercase text-xs text-slate-500">
          {label} {isRequired && <sup className="text-sm text-red-500">*</sup>}
        </label>
      )}
      <div
        className={`border-slate-300 hover:border-slate-500 active:border-slate-500 focus-visible:border-slate-500 border-solid border-[1px] px-2 py-2 rounded-md flex flex-col ${
          isError ? "border-red-500" : "border-slate-300"
        }`}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 outline-none text-sm text-black"
          name={name}
          onChange={handleChange}
          onFocus={value ? handleFocus : undefined}
          onBlur={handleFocus}
          value={value}
        />
      </div>
      {isError && (
        <span className="block text-sm text-red-600 my-1">{errorMessage}</span>
      )}
    </div>
  );
};
