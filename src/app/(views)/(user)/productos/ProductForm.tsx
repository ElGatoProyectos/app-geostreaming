'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { AccountFormSchema } from "@/app/schemas/accountFormSchema";type Inputs = {
  email: string;
};

interface CreditacionesProps {
  info: {
    title: string;
    numberAccount?: string;
    url?: string;
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
    resolver: zodResolver(AccountFormSchema),
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
            <img className="h-16 w-16 object-contain" src={info.url} alt={info.title} />
            <h2 className="font-semibold">{info.title}</h2>
          </div>
      ): (
        <div> <h2 className="font-semibold">{info.title}</h2>
      <p className=""><span className="font-semibold">Cuenta: </span>{info.numberAccount}</p></div>
      )}
      
      
      <InputField
        id="email"
        label="Correo electrónico"
        placeholder="Ingrese el correo electrónico de su cliente"
        register={register("email")}
        error={errors.email}
        type="email"
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
