import React from "react";
import { FieldError } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  isDisabled?: boolean;
  register?: any;
  error?: FieldError | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder,
  isDisabled = false
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <label htmlFor={id}>{label}:</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
          spellCheck="true"
          className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
            error
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register}
        />
        <CiCircleAlert
          className={`absolute right-2 top-1/2 -translate-y-1/2 text-red-500 ${
            error ? "block" : "hidden"
          } `}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm font-semibold">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;
