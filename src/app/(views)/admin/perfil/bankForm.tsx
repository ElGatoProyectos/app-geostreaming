import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { BankFormSchema } from "@/app/schemas/bankFormSchema";

type Inputs = {
  bank: string;
  number: string;
  name: string;
  type: string;
};

interface BankFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const BankForm: React.FC<BankFormProps> = ({ defaultValues, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(BankFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error al registrar la cuenta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <label htmlFor="bank">
        Banco
        <select
          id="bank"
          defaultValue={"Seleccione un banco"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.bank
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register}
        >
          <option value="" disabled>
            Seleccione un banco
          </option>
          <option value="">banco 1</option>
          <option value="">banco2</option>
        </select>
      </label>
      <InputField
        id="number"
        label="Número"
        register={register("number")}
        error={errors.number}
      ></InputField>
      <InputField
        id="name"
        label="Nombre (Titular)"
        register={register("name")}
        error={errors.name}
      ></InputField>
      <label htmlFor="type">
        Tipo
        <select
          id="type"
          defaultValue={"Seleccione un tipo de cuenta"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.type
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("type")}
        >
          <option value="" disabled>
            Seleccione tipo de cuenta
          </option>
          <option value="">Corriente</option>
          <option value="">Ahorros</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.type?.message}
          </p>
        )}
      </label>
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
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default BankForm;
