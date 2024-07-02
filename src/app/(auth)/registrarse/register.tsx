"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "@/app/schemas/userRegisterSchema";
import { CiCircleAlert } from "react-icons/ci";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CountrySelect from "@/app/components/forms/countrySelect";

type Inputs = {
  name: string;
  email: string;
  user: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country_code: string;
};

const register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", {
        full_name: data.name,
        email: data.email,
        dni: data.user,
        country_code: data.country_code,
        phone: data.phone,
        password: data.password,
      });
      router.push("/ingresar");
    } catch (e) {
      console.error("Error en el registro:", e);
      toast.error("Error en el registro");
    }
    reset();
  };

  return (
    <div className="relative bg-white shadow-md shadow-[#277FF2] rounded-xl h-auto md:max-w-[50%] xl:max-w-[33%] w-full pb-2 m-4 ">
      <div className="w-full p-2 bg-[#277FF2] text-white text-center rounded-t-lg">
        Regístrate
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-8 pt-8 flex flex-col gap-4 items-center"
      >
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-8">
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="user" className="">
              Documento de identidad:
            </label>
            <div className="relative">
              <input
                type="text"
                id="user"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.user
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                autoComplete="user"
                {...register("user")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.user ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.user?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.user?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="name" className="">
              Nombre y apellido:
            </label>
            <div className="relative">
              <input
                title="Ingrese solo letras y espacios"
                type="text"
                id="name"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.name
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                autoComplete="name"
                {...register("name")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.name ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.name?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.name?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-8">
          <div className="flex flex-col w-full gap-2 ">
            <label htmlFor="email" className=" flex items-center">
              Email:
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.email
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                autoComplete="email"
                {...register("email")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.email ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.email?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-8">
          <div className="w-full lg:w-1/2">
            <CountrySelect
              id="country_code"
              register={register("country_code")}
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="phone" className=" flex items-center">
              Celular (WhatsApp):
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.phone
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                autoComplete="phone"
                {...register("phone")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.phone ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.phone?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-8">
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="password" className=" flex items-center">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.password
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                {...register("password")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.password ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="confirm_password" className=" flex items-center">
              Confirmar contraseña:
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirm_password"
                spellCheck="true"
                className={`w-full bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                    : "border-gray-200 "
                }`}
                {...register("confirmPassword")}
              />
              <CiCircleAlert
                className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                  errors.confirmPassword ? "block" : "hidden"
                } `}
              />
            </div>
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-[#F2308B] rounded text-white hover:bg-[#F06FAC] transition-all duration-300"
        >
          Registrar
        </button>
        <Link href={"/ingresar"} className="text-[#F2308B] underline">
          Accede a tu cuenta
        </Link>
        <small className="text-center">
          Geostreaming Copyright ©2024. Todos los derechos reservados
        </small>
      </form>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default register;
