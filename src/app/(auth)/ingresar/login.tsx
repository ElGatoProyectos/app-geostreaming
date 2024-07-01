"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@/app/schemas/userLoginSchema";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {  toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCircleAlert } from "react-icons/ci";


type Inputs = {
  email: string;
  password: string;
};

const login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const responseAuth = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(responseAuth);

      if (responseAuth?.ok) {
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "ADMIN") {
          console.log("run to admin");
          router.push("/admin");
        } else if (role === "USER" || role === "DISTRIBUTOR") {
          router.push("/home");
        } else {
          router.push("/");
        }
        reset();
      } else {
        toast.error("Error de autenticación");
      }
    } catch (error) {
      toast.error("Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white shadow-md shadow-[#277FF2] rounded-xl h-auto md:max-w-[50%] xl:max-w-[640px] w-full m-4 pb-2 ">
      <div className="w-full p-2 bg-[#277FF2] text-white text-center rounded-t-lg">
        Accede
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-8 pt-8 flex flex-col gap-6 items-center"
      >
        <div className="w-full">
          <label htmlFor="user" className="flex flex-col md:flex-row gap-2">
            <span className="md:w-1/3 xl:text-right flex items-center">
              Correo:
            </span>
            <div className="md:w-2/3">
              <div className="relative w-full">
                <input
                  type="text"
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
                  {errors.email.message}
                </p>
              )}
            </div>
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="user" className="flex flex-col md:flex-row gap-2">
            <span className="md:w-1/3 xl:text-right flex items-center">
              Contraseña
            </span>
            <div className="md:w-2/3">
              <div className="relative w-full">
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
          </label>
        </div>

        {/* <div className="inline-flex items-center w-full lg:w-auto">
          <label
            className="relative flex items-center rounded-full cursor-pointer"
            htmlFor="check"
          >
            <input
              type="checkbox"
              className="peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-md before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 focus:before:opacity-30 mr-4"
              id="check"
            />
            <span className="absolute left-[1px] top-1/2 transform -translate-y-1/2 text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>

           <label
            className="mt-px font-light cursor-pointer select-none"
            htmlFor="check"
          >
            Recordar
          </label>
        </div> */}
        <button
          type="submit"
          className={`px-6 py-2 bg-[#F2308B] rounded text-white hover:bg-[#F06FAC] transition-all duration-300 ${
            loading
              ? "opacity-50 pointer-events-none flex items-center justify-center"
              : ""
          }`}
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
        <Link href={"/registrarse"} className="text-[#F2308B] underline">
          Crea una cuenta
        </Link>
        <small className="text-center">
          Geostreaming Copyright ©2024. Todos los derechos reservados
        </small>
      </form>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default login;
