"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/* CAMBIAR SCHEMA */
import { userRegisterSchema } from "@/app/schemas/userRegisterSchema";

type Inputs = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    /* modal de confirmacion? */
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 "
    >
      <div className="w-full">
        <div className="relative w-full text-[#444]">
          <label htmlFor="currentPassword" className="relative">Contraseña actual:</label>
          <button type="button" className="absolute right-4 bottom-2 text-[#888] text-xl">
          <FaEyeSlash />
          </button>
          <input
            type="password"
            id="currentPassword"
            placeholder="Ingresa tu contraseña actual"
            className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
              errors.password
                ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                : "border-gray-200 "
            }`}
            {...register("currentPassword")}
          />
          <CiCircleAlert
            className={`absolute text-xl right-2 top-1/2 font-bold text-red-500 ${
              errors.currentPassword ? "block" : "hidden"
            } `}
          />
        </div>
        {errors.currentPassword && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#277FF2] text-white mt-4 px-4 py-1 rounded hover:bg-[#4E98F9] transition-all duration-300 mx-auto "
          disabled={loading}
        >
         {loading ? (
            <span>
              <AiOutlineLoading3Quarters className=" animate-spin inline-block" />{" "}
              Cargando
            </span>
          ) : (
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
