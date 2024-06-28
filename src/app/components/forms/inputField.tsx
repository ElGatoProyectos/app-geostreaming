import React from "react";
import { CiCircleAlert } from "react-icons/ci";
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  isDisabled?: boolean;
  register?: any;
  error?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder,
  isDisabled = false,
}) => {
  return (
    <div className="w-full">
      <div className="w-full text-[#444]">
        <label htmlFor={id} className=" capitalize">{label.toLowerCase()}:</label>
        <div className="relative mt-2 ">
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            disabled={isDisabled}
            spellCheck="true"
            className={` bg-gray-100 w-full text-[#666] bg-gray-10 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
              error
                ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                : "border-gray-200 "
            }`}
            {...register}
          />
          <CiCircleAlert
            className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
              error ? "block" : "hidden"
            } `}
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm font-medium mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;
