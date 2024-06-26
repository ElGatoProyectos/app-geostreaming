"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { changePasswordSchema } from "@/app/schemas/changePasswordSchema";

type Inputs = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

type StateKeys = "password" | "newPassword" | "confirmPassword";

const ChangePassword = () => {
  const [states, setStates] = useState<Record<StateKeys, boolean>>({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    /* modal de confirmacion? */
    reset();
  };

  const toggleState = (key: StateKeys) => {
    setStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 "
    >
      <div className="w-full">
        <div className="relative w-full text-[#666]">
          <label htmlFor="password">Contraseña actual:</label>
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] text-xl"
              onClick={() => toggleState("password")}
            >
              {states.password ? <FaEye /> : <FaEyeSlash />}
            </button>
            <input
              type={states.password ? "text" : "password"}
              id="password"
              placeholder="Ingresa tu contraseña actual"
              className={`w-full text-[#666] bg-gray-50 border round mt-2 ed outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.password
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              {...register("password")}
            />
            <CiCircleAlert
              className={`absolute text-xl right-9 top-1/2 -translate-y-1/2  font-bold text-red-500 ${
                errors.password ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <div className="relative w-full text-[#666]">
          <label htmlFor="newPassword">Nueva contraseña:</label>
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] text-xl"
              onClick={() => toggleState("newPassword")}
            >
              {states.newPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <input
              type={states.newPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Ingresa tu nueva contraseña"
              className={`w-full text-[#666] bg-gray-50 border round mt-2 ed outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.newPassword
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              {...register("newPassword")}
            />
            <CiCircleAlert
              className={`absolute text-xl right-9 top-1/2 -translate-y-1/2  font-bold text-red-500 ${
                errors.newPassword ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <div className="relative w-full text-[#666]">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <div className="relative">
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888] text-xl"
              onClick={() => toggleState("confirmPassword")}
            >
              {states.confirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <input
              type={states.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirmar contraseña"
              className={` mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              {...register("confirmPassword")}
            />
            <CiCircleAlert
              className={`absolute text-xl right-9 top-1/2 -translate-y-1/2  font-bold text-red-500 ${
                errors.confirmPassword ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#F2308B] text-white mt-4 px-4 py-1 rounded hover:bg-[#F06FAC] transition-all duration-300 mx-auto "
          disabled={loading}
        >
          {loading ? (
            <span>
              <AiOutlineLoading3Quarters className=" animate-spin inline-block" />{" "}
              Cargando
            </span>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
