'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";
import { creditacionesFormSchema } from "@/app/schemas/creditacionesFormSchema";
type Inputs = {
  id?: number;
  number: string;
  value: string;
  date: string;
  file: string;
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
  const [monto, setMonto] = useState<string>("");

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
      setMonto('');
      reset(); 
    } catch (error) {
      console.error("Error al registrar el depósito:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonto(e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <h2 className="font-semibold">{info.title}</h2>
      <p className=""><span className="font-semibold">Cuenta: </span>{info.numberAccount}</p>
      <InputField
        id="number"
        label="Numero de comprobante"
        register={register("number")}
        error={errors.number}
      />
      <div className="w-full">
        <div className="w-full text-[#444]">
          <label htmlFor="value" className=" capitalize">
          Value: {monto && `$ ${monto}`}
          </label>
          <div className="relative mt-2 ">
            <input
              type="number"
              id="Valor"
              placeholder="El monto mínimo es de $5"
              spellCheck="true"
              className={` bg-gray-100 w-full text-[#666] bg-gray-10 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.value
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              {...register("value")}
              onChange={handlePriceInputChange}
            />
            <CiCircleAlert
              className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                errors.value ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.value && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.value.message}
          </p>
        )}
      </div>
      {/* <InputField
        id="value"
        label={`Valor ${monto && `$ ${monto}`}`}
        register={register("value")}
        error={errors.value}
        placeholder="Ingrese el valor en centavos"
        onChange={handlePriceInputChange}
      /> */}
      <InputField
        id="date"
        label="Fecha del depósito"
        register={register("date")}
        error={errors.date} 
        type="datetime-local"
      />

       <div>
        <label htmlFor="file" className="text-[#444]">
          Foto del comprobante
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
