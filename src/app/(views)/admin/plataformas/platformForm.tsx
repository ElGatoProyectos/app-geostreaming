import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { PlatformFormSchema } from "@/app/schemas/plataformFormSchema";

type ProductStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";


type Inputs = {
  id?: number;
  name?: string;
  description?: string;
  img_url?: string;
  price_in_cents?: number;
  price_distributor_in_cents?: number;
  status?: ProductStatus;
  days_duration?: number;
  account?: number;
  
};

interface ProductFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const ProductForm: React.FC<ProductFormProps> = ({
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
    resolver: zodResolver(PlatformFormSchema),
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
      console.error("Error al registrar el producto:", error);
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
          Subir imagen
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
            {errors.img_url.message}
          </p>
        )}
      </div>
      <InputField
        id="name"
        label="Plataforma"
        register={register("name")}
        error={errors.name}
      />
      <InputField
        id="description"
        label="Descripción"
        register={register("description")}
        error={errors.description}
      />
      
      <label htmlFor="status" className="text-[#444]">
        Tipo:
        <select
          id="status"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.status
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("status")}
        >
          <option value="">Seleccione tipo de producto</option>
          <option value="IMMEDIATE_DELIVERY">Entrega inmediata</option>
          <option value="UPON_REQUEST">A pedido</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.status.message}
          </p>
        )}
      </label>
      <InputField
        id="price_in_cents"
        label="Precio Consumidor"
        register={register("price_in_cents")}
        error={errors.price_in_cents}
      />
      <InputField
        id="price_distributor_in_cents"
        label="Precio Distribuidor"
        register={register("price_distributor_in_cents")}
        error={errors.price_distributor_in_cents}
      />
       {/* <label htmlFor="account" className="text-[#444]">
        Cuenta:
        <select
          id="account"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.account
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("account", {valueAsNumber:true} )}
        >
          <option value="">Seleccione una cuenta</option>
          {error ? (
            <option value="">No hay cuentas disponibles</option>
          ) : (
            
            accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.email}</option>
            ))
          )}
        </select>
        {errors.account && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.account.message}
          </p>
        )}
      </label> */}
     
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

export default ProductForm;
