"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "@/app/schemas/userRegisterSchema";

type Inputs = {
  name: string;
  email: string;
  user: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const register = () => {
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
    <div className="relative bg-white shadow-md shadow-[#277FF2] rounded-xl h-auto md:max-w-[50%] xl:max-w-[33%] w-full p-1 m-4 ">
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
              Nombre usuario o cédula:
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.user ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.name ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {errors.name?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.name?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-8">
          <div className="flex flex-col w-full lg:w-1/2 gap-2 ">
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.email ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {errors.email?.message && (
              <p className="text-red-500 text-sm font-semibold">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-2">
            <label htmlFor="phone" className=" flex items-center">
              Celular (whatsapp):
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.phone ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.password ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
              <svg
                className={` absolute right-2 top-1/2 -translate-y-1/2 ${
                  errors.confirmPassword ? "block" : "hidden"
                }`}
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1_2)">
                  <mask
                    id="mask0_1_2"
                    fontStyle={"mask-type:luminance"}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                  >
                    <path d="M0 0H14V14H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V6.5C7.5 6.77614 7.27614 7 7 7C6.72386 7 6.5 6.77614 6.5 6.5V3.5C6.5 3.22386 6.72386 3 7 3Z"
                      fill="#FE0101"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5C7.55228 8.5 8 8.94772 8 9.5C8 10.0523 7.55228 10.5 7 10.5C6.44772 10.5 6 10.0523 6 9.5Z"
                      fill="#FE0101"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
        <Link href={"/users/login"} className="text-[#F2308B] underline">
          Accede a tu cuenta
        </Link>
        <small className="text-center">
          SitioPremium Copyright ©2024. Todos los derechos reservados
        </small>
      </form>
    </div>
  );
};

export default register;
