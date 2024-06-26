import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { productFormSchema } from "@/app/schemas/productFormSchema";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Inputs = {
  id: number;
  platform_id: number;
  name: string;
  price_in_cents: string;
  price_distributor_in_cents: string;
  description: string;
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
    resolver: zodResolver(productFormSchema),
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
      console.error("Error al registrar el prodcuto:", error);
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
        id="name"
        label="Producto"
        register={register("name")}
        error={errors.name}
      />
      <label htmlFor="platform_id" className="text-[#444]">
        Plataforma:
        <select
          id="platform_id"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.platform_id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("platform_id")}
        >
          <option value="">
            Seleccione una plataforma
          </option>
          <option value="1">plataforma 1</option>
          <option value="2">plataforma 2</option>
        </select>
        {errors.platform_id && (
        <p className="text-red-500 text-sm font-medium mt-1">{errors.platform_id.message}</p>
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
      <InputField
        id="description"
        label="Descripción"
        register={register("description")}
        error={errors.description}
      />

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
