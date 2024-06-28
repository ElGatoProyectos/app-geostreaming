import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AccountFormSchema } from "@/app/schemas/accountFormSchema";
import axios from "axios";

type Inputs = {
  id?: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  product_id: number;
  platform_id: number;
  user_id: number;
  description: string;
};

interface AccountFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const AccountForm: React.FC<AccountFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
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
        const [productResponse, userResponse] = await Promise.all([
          axios.get("/api/product"),
          axios.get("/api/user"),
        ]);

        setProducts(productResponse.data.products);
        setUsers(userResponse.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await onSubmit({
        ...data,
        is_active: data.is_active ? true : false,
        numb_profiles: Number(data.numb_profiles),
        numb_days_duration: Number(data.numb_days_duration),
        product_id: Number(data.product_id),
        user_id: Number(data.user_id),
      });
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
      <label htmlFor="product_id">
        Producto
        <select
          id="product_id"
          defaultValue={""}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.product_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("product_id", { valueAsNumber: true })}
        >
          <option value="" disabled>
            Seleccione un producto
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.platform.name}{" "}
              <input
                type="number"
                value={product.platform.id}
                id="platform_id"
                className="hidden"
                {...register("platform_id", { valueAsNumber: true })}
              />
            </option>
          ))}
        </select>
        {errors?.product_id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.product_id.message}
          </p>
        )}
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
      <InputField
        id="numb_days_duration"
        label="Tiempo de duración (días)"
        type="number"
        register={register("numb_days_duration", { valueAsNumber: true })}
        error={errors.numb_days_duration}
      />
      <InputField
        id="numb_profiles"
        label="Número de perfiles"
        type="number"
        register={register("numb_profiles", { valueAsNumber: true })}
        error={errors.numb_profiles}
      />
      <label htmlFor="is_active">
        Estado
        <select
          id="is_active"
          defaultValue={""}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.is_active
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("is_active", { valueAsNumber: false })}
        >
          <option value="" disabled>
            Seleccione el estado de la cuenta
          </option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        {errors?.is_active && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.is_active.message}
          </p>
        )}
      </label>

      <label htmlFor="user_id">
        Usuario
        <select
          id="user_id"
          defaultValue={"Seleccione un banco"}
          className={`w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.user_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("user_id")}
        >
          <option value="" disabled>
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
      </label>
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
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
