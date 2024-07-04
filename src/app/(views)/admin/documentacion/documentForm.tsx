"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { DocumentSchema } from "@/app/schemas/documentSchema";
import axios from "axios";
import CountrySelect from "@/app/components/forms/countrySelect";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  file: string;
};

const DocumentForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(DocumentSchema),
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      // aqui va fetch pdf
      const formDataAll = new FormData();
      formDataAll.append("file", data.file[0]);
      await axios.post("/api/", formDataAll);
      console.log(formDataAll);
      toast.success("El documento se subió correctamente");
    } catch (error) {
      console.error("Error al registrar la cuenta:", error);
      toast.error("Error al subir el documento");
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
        <label htmlFor="file_input" className="text-[#444]">
          Subir archivo
        </label>
        <input
          id="file"
          type="file"
          className={`w-full text-[#666] bg-gray-100 border rounded outline-none pr-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.file
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("file")}
        />
        {errors.file && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.file?.message}
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

export default DocumentForm;
