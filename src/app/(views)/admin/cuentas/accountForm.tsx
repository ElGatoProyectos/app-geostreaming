import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AccountFormSchema } from "@/app/schemas/accountFormSchema";
import axios from "axios";

type Inputs = {
  id?: number;
  is_active?: string;
  email?: string;
  password?: string;
  pin?: string;
  purchase_date?: string;
  renewal_date?: string;
  user_id?: number;
  description?: string;
  platform_id?: number;
  status?: string;
};

interface AccountFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const AccountForm: React.FC<AccountFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [platforms, setPlatforms] = useState<any[]>([]);
  /* const [users, setUsers] = useState<any[]>([]); */
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [platformResponse /* , userResponse */] = await Promise.all([
          axios.get("/api/platform"),
        ]);

        setPlatforms(platformResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(defaultValues);
  }, []);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit(
        data /* {
        ...data,
        is_active: data.is_active === "1" ? true: false,
      } */
      );
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
      {defaultValues?.id && (
        <input type="hidden" {...register("id")} value={defaultValues.id} />
      )}
      <label htmlFor="platform_id">
        Plataforma
        <select
          id="platform_id"
          defaultValue={defaultValues?.platform_id || ""}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.platform_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("platform_id", { valueAsNumber: true })}
        >
          <option value="">Seleccione un plataforma</option>
          {platforms.map((platform) => (
            <option
              selected={platform.id === defaultValues?.platform_id}
              key={platform.id}
              value={platform.id}
            >
              {platform.name}
            </option>
          ))}
        </select>
        {errors?.platform_id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.platform_id.message}
          </p>
        )}
      </label>
      <InputField
        id="email"
        label="Correo"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <InputField
        id="password"
        label="Contraseña"
        register={register("password")}
        error={errors.password}
      />
      <InputField
        id="pin"
        label="PIN"
        register={register("pin")}
        error={errors.pin}
      />
      {/*<InputField
        id="purchase_date"
        label="Fecha de compra"
        type="datetime-local"
        register={register("purchase_date", { valueAsDate: true })}
        error={errors.purchase_date}
      />
       <InputField
        id="renewal_date"
        label="fecha de renovación"
        type="datetime-local"
        register={register("renewal_date", { valueAsDate: true })}
        error={errors.renewal_date}
      /> */}
      <label htmlFor="is_active">
        Estado de la cuenta
        <select
          id="is_active"
          defaultValue={defaultValues?.is_active && "0"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.is_active
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("is_active")}
        >
          <option value="">Seleccione el estado de la cuenta</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
        {errors?.is_active && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.is_active.message}
          </p>
        )}
      </label>
      <label htmlFor="status">
        Disponibilidad de la cuenta
        <select
          id="status"
          defaultValue={defaultValues?.status ?? "NOT_BOUGHT"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.status
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("status")}
        >
          <option value="">Seleccione el estado de la cuenta</option>
          <option value="BOUGHT">Comprado</option>
          <option value="NOT_BOUGHT">No comprado</option>
        </select>
        {errors?.status && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.status.message}
          </p>
        )}
      </label>

      {/* <label htmlFor="user_id">
        Usuario
        <select
          id="user_id"
          defaultValue={defaultValues?.user_id ?? ""}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.user_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("user_id", { valueAsNumber: true })}
        >
          <option value="">
            Seleccione un usuario
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>
        {errors?.user_id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.user_id.message}
          </p>
        )}
      </label> */}
      <div className="w-full text-[#444]">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          rows={3}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.user_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.description.message}
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

export default AccountForm;
