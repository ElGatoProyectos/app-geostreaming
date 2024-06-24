'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { creditacionesFormSchema } from "@/app/schemas/creditacionesFormSchema";
type Inputs = {
  number: string;
  valor: string;
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
      console.error("Error al registrar la deposito:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <h2>{info.title}</h2>
      <p>{info.numberAccount}</p>
      {/* (input id, solo lo puede ver no editar) */}
      <InputField
        id="number"
        label="Numero de comprobante"
        register={register("number")}
        error={errors.number}
      />
      <InputField
        id="valor"
        label="Valor"
        register={register("valor")}
        error={errors.valor}
        placeholder="El valor minimo es de $10"
      />
      <InputField
        id="date"
        label="Fecha del deposito"
        register={register("date")}
        error={errors.date}
        type="date"
      />

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
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
};

export default creditacionesForm;
