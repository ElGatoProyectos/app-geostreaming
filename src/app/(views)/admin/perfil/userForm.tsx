import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/* CAMBIAR SCHEMA */
import { UserSchema } from "@/app/schemas/userSchema";
import axios from "axios";
import CountrySelect from "@/app/components/forms/countrySelect";

type Inputs = {
  /* dni?: string; */
  full_name?: string;
  email?: string;
  phone?: string;
  country_code?: string;
  file?: string;
};

interface UserFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
  avatar: string;
}
const UserForm: React.FC<UserFormProps> = ({
  defaultValues,
  onSubmit,
  avatar,
}) => {
  const [loading, setLoading] = useState(false);

  console.log(onsubmit);

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
        id="full_name"
        label="Nombre"
        register={register("full_name")}
        error={errors.full_name}
      />
      <InputField
        id="email"
        label="Correo"
        register={register("email")}
        error={errors.email}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <CountrySelect
          id="country_code"
          error={errors.country_code}
          defaultValue={defaultValues?.country_code}
          register={register("country_code")}
        />
        <InputField
          id="phone"
          label="Celular"
          register={register("phone")}
          error={errors.phone}
        />
      </div>

      <div className="flex items-center space-x-4"></div>
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#F2308B] text-white mt-4 px-4 py-1 rounded hover:bg-[#F06FAC] transition-all duration-300 mx-auto "
          disabled={loading}
        >
          {loading ? (
            <span>
              <AiOutlineLoading3Quarters className=" animate-spin inline-block" />
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

export default UserForm;
