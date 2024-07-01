'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { creditacionesFormSchema } from "@/app/schemas/creditacionesFormSchema";
type Inputs = {
  id: number;
  voucher_number: string;
  voucher_image: string;
  value: string;
  date: string;
};

interface CreditacionesProps {
  info: {
    title: string;
    numberAccount: string;
    
  };
  onSubmit: SubmitHandler<Inputs>;
}

const creditacionesForm: React.FC<CreditacionesProps> = ({ info, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(creditacionesFormSchema),
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit(data);
      reset(); 
    } catch (error) {
      console.error("Error al registrar el depósito:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <h2 className="font-semibold">{info.title}</h2>
      <p className=""><span className="font-semibold">Cuenta: </span>{info.numberAccount}</p>
      <InputField
        id="voucher_number"
        label="Numero de comprobante"
        register={register("voucher_number")}
        error={errors.voucher_number}
      />
      <InputField
        id="value"
        label="Valor"
        register={register("value")}
        error={errors.value}
        placeholder="El valor mínimo es de $10"
      />
      <InputField
        id="date"
        label="Fecha del depósito"
        register={register("date")}
        error={errors.date}
        type="datetime-local"
      />

       <div>
        <label htmlFor="voucher_image" className="text-[#444]">
          Foto del comprobante
        </label>
        <input
          id="voucher_image"
          type="file"
          className={`w-full text-[#666] bg-gray-100 border rounded outline-none pr-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.voucher_image
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("voucher_image")}
        />
        {errors.voucher_image && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.voucher_image?.message}
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

export default creditacionesForm;
