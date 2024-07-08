"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { AlertFormSchema } from "@/app/schemas/alertFromSchema";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url_backend, url_front_to_wsp } from "@/context/token";

type Inputs = {
  description: string;
};

const AlertForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(AlertFormSchema),
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    // api alert
    try {
     const response = await axios.post("/api/alerts",{description: data.description})
      toast.success("La description se guardo correctamente");
    } catch (error) {
      console.error("Error al guardar descripción:", error);
      toast.error("Error al guardar descripción");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4 "
    >
      <div>
        <label htmlFor="description" className="text-[#444]">
          Descripción
        </label>
        <textarea
          id="description"
          className={`w-full text-[#666] bg-gray-100 border rounded outline-none pr-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.description
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.description?.message}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-4"></div>
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#F2308B] text-white mt-4 px-4 py-1 rounded hover:bg-[#F06FAC] transition-all duration-300 mx-auto "
          disabled={loading}
        >
          {loading ? (
            <span>
              <AiOutlineLoading3Quarters className=" animate-spin inline-block" />
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

export default AlertForm;
