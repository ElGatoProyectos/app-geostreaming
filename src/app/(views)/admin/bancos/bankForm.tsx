import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { BankFormSchema } from "@/app/schemas/bankFormSchema";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Inputs = {
  bank?: string;
  number?: string;
  name?: string;
  type?: string;
  img_url?: string;
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
      <div>
        <label htmlFor="img_url" className="text-[#444]">
          Subir logo
        </label>
        <input
          id="img_url"
          type="file"
          className={`w-full text-[#666] bg-gray-100 border rounded outline-none pr-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.img_url
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("img_url")}
        />
        {errors.img_url && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.img_url?.message}
          </p>
        )}
      </div>
      <InputField
        id="bank"
        label="bank"
        register={register("bank")}
        error={errors.bank}
      />
      <InputField
        id="number"
        label="Número"
        register={register("number")}
        error={errors.number}
      />
      <InputField
        id="name"
        label="Nombre"
        register={register("name")}
        error={errors.name}
      />
      <label htmlFor="type" className="text-[#444]">
        Tipo:
        <select
          id="type"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.type
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("type")}
        >
          <option value="">Seleccione tipo de cuenta</option>
          <option value="ahorros">Ahorros</option>
          <option value="corrientes">Corriente</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.type.message}
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
