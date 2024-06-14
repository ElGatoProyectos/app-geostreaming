"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@/app/schemas/userLoginSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
  user: string;
  password: string;
};

const login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    /* modal de confirmacion? */
    const responseAuth = await signIn("credentials", {
      username: data.user,
      password: data.password,
      role: "-",
      redirect: false,
    });
    if (responseAuth?.ok) {
      router.push("/..... la app");
      reset();
    } else {
      //! error de autenticacion
    }
  };
  return (
    <div className="relative bg-white shadow-md shadow-[#277FF2] rounded-xl h-auto md:max-w-[50%] xl:max-w-[640px] w-full p-1 m-4 ">
      <div className="w-full p-2 bg-[#277FF2] text-white text-center rounded-t-lg">
        Accede
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full px-8 pt-8 flex flex-col gap-6 items-center"
      >
        <div className="w-full">
          <label htmlFor="user" className="flex flex-col md:flex-row gap-2">
            <span className="md:w-1/3 xl:text-right flex items-center">
              Nombre usuario:
            </span>
            <div className="md:w-2/3">
              <div className="relative w-full">
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
          </label>
        </div>

        <div className="inline-flex items-center w-full lg:w-auto">
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
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
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
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-[#F2308B] rounded text-white hover:bg-[#F06FAC] transition-all duration-300"
        >
          Login
        </button>
        <Link href={"/users/register"} className="text-[#F2308B] underline">
          Crea una cuenta
        </Link>
        <small className="text-center">
          SitioPremium Copyright ©2024. Todos los derechos reservados
        </small>
      </form>
    </div>
  );
};

export default login;
