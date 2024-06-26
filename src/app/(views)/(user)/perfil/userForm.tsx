import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/* CAMBIAR SCHEMA */
import { categoryFormSchema } from "@/app/schemas/categoryFormSchema";

type Inputs = {
  username: string;
  name: string;
  email: string;
  phone: string;
  acreditaciones: string;
  avatar: string;
};

interface UserFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const UserForm: React.FC<UserFormProps> = ({ defaultValues, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(categoryFormSchema),
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
      className="flex w-full flex-col gap-4 "
    >
      <InputField
        id="username"
        label="Usuario"
        register={register("username")}
        error={errors.username}
        isDisabled={true}
      ></InputField>
      <InputField
        id="name"
        label="Nombre"
        register={register("name")}
        error={errors.name}
        isDisabled={true}
      ></InputField>
      {/* (input id, solo lo puede ver no editar) */}
      <InputField
        id="email"
        label="Correo"
        register={register("email")}
        error={errors.email}
        isDisabled={true}
      ></InputField>
      <InputField
        id="phone"
        label="Celular"
        register={register("phone")}
        error={errors.phone}
      ></InputField>
      <label htmlFor="acreditaciones">
        Acreditacion de ganancias
        <select
          id="acreditaciones"
          defaultValue={"Seleccione un metodo de pago"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.acreditaciones
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register}
        >
          <option value="">saldo a plataforma</option>
          <option value="">saldo a cuenta bancaria</option>
        </select>
      </label>
      <div>
        <img className="h-12 w-12 object-cover rounded-full" src="./user.jpg " alt="user" />
            {/* falta el input */}
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
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
