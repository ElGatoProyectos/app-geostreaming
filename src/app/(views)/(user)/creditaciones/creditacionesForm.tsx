'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { creditacionesFormSchema } from "@/app/schemas/creditacionesFormSchema";
type Inputs = {
  voucher_number: string;
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
      {/* (input id, solo lo puede ver no editar) */}
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
        type="date"
      />

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
