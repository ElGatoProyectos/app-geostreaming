import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {AfiliadosFormSchema } from "@/app/schemas/afiliadosFormSchema";
import CountrySelect from "@/app/components/forms/countrySelect";

type Inputs = {
  email?: string;
  full_name?: string;
  phone?: string;
  password?: string;
  country_code?: string;
  dni?: string;
};

interface AfiliadosProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const AfiliadosForm: React.FC<AfiliadosProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(AfiliadosFormSchema),
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
      console.error("Error al registrar la categoría:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <InputField
        id="dni"
        label="N de documento de identidad"
        register={register("dni")}
        error={errors.dni}
      />
      <InputField
        id="full_name"
        label="Nombre Completo"
        register={register("full_name")}
        error={errors.full_name}
      />
      <InputField
        id="email"
        label="Correo"
        register={register("email")}
        error={errors.email}
        type="email"
      />
      <InputField
        id="password"
        label="Contraseña"
        register={register("password")}
        error={errors.password}
      />
     <div className="flex flex-col md:flex-row gap-4">
        <CountrySelect
          id="country_code"
          register={register("country_code")}
        />
         <InputField
        id="phone"
        label="Celular"
        register={register("phone")}
        error={errors.phone}
      />
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

export default AfiliadosForm;
