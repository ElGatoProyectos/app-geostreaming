import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {UserSchema } from "@/app/schemas/userSchema";

type Inputs = {
  username: string;
  email: string;
  full_name: string;
  phone: string;
  date: string;
};

interface AfiliadorProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const AfiliadosForm: React.FC<AfiliadorProps> = ({
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
    resolver: zodResolver(UserSchema),
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
       {/* <label htmlFor="type" className="text-[#444]">
        Referido:
        <select
          id="ref_id"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.ref_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("ref_id")}
        >
          <option value="">Seleccione Referido</option>
          <option value="1">referido 1</option>
          <option value="2">referido 2</option>
        </select>
        {errors.ref_id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.ref_id.message}
          </p>
        )}
      </label> */}
      <InputField
        id="username"
        label="Nombre de usuario"
        register={register("username")}
        error={errors.username}
      />
      <InputField
        id="full_name"
        label="Nombre Completo"
        register={register("full_name")}
        error={errors.full_name}
      />
       {/* <label htmlFor="type" className="text-[#444]">
        Role:
        <select
          id="ref_id"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.ref_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("ref_id")}
        >
          <option value="">Seleccione Rol</option>
          <option value="1">Consumidor</option>
          <option value="2">Afiliado</option>
        </select>
        {errors.ref_id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.ref_id.message}
          </p>
        )}
      </label> */}
      <InputField
        id="email"
        label="Correo"
        register={register("email")}
        error={errors.email}
        type="email"
      />
     
      <InputField
        id="phone"
        label="Celular"
        register={register("phone")}
        error={errors.phone}
      />
      {/* <InputField
        id="dni"
        label="DNI"
        register={register("dni")}
        error={errors.dni}
      /> */}
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

export default AfiliadosForm;
