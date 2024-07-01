"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { getProductFormSchema } from "@/app/schemas/getProductFormSchema";
type Inputs = {
  platform_id:number,
};

interface PlatformProps {
  info: {
    title: string;
    numberAccount?: string;
    id: number;
    url?: string;
  };
  onSubmit: SubmitHandler<Inputs>;
}

const PlatformForm: React.FC<PlatformProps> = ({
  info,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(getProductFormSchema),
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      {info.numberAccount == null ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            className="h-16 w-16 object-contain"
            src={info.url}
            alt={info.title}
          />
          <h2 className="font-semibold">{info.title}</h2>
        </div>
      ) : (
        <div>
          <h2 className="font-semibold">{info.title}</h2>
          <p className="">
            <span className="font-semibold">Cuenta: </span>
            {info.numberAccount}
          </p>
        </div>
      )}
      
      <input type="hidden" id="platform_id" {...register("platform_id")}/>
     {/*  <div>
        <p>¿Deseas enviarte los datos de la cuenta?</p>
        <div className="flex gap-8 w-fit mx-auto mt-2">
          <div className="flex items-center">
            <input
              id="option_no"
              type="radio"
              value="false"
              name="send_radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="option_no"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="option_si"
              type="radio"
              value="false"
              name="send_radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 full dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="option_si"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              si
            </label>
          </div>
        </div>
        {errors.send_radio && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.send_radio?.message}
          </p>
        )}
      </div> */}

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

export default PlatformForm;
