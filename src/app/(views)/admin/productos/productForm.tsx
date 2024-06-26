import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { productSchema } from "@/lib/validations/product";

type ProductStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";

interface Platform {
  id: number;
  name: string;
  description: string;
  img_url: string;
}

type Inputs = {
  id: number;
  price_in_cents: number;
  price_distributor_in_cents: number;
  platform: Platform;
  status: ProductStatus;
};

interface ProductFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        const response = await axios.get("/api/platform", {
          params: {
            status: "IMMEDIATE_DELIVERY",
          },
        });
        setPlatforms(response.data.platform);
      } catch (error) {
        console.error("Error fetching platform:", error);
      }
    };
    fetchPlatform();
  }, []);

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
      <InputField
        id="name"
        label="Producto"
        register={register("platform.name")}
        error={errors.platform?.name}
      />
      <label htmlFor="platform_id" className="text-[#444]">
        Plataforma:
        <select
          id="platform_id"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.platform?.id
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("platform.id")}
        >
          <option value="">Seleccione una plataforma</option>
          <option value="1">plataforma 1</option>
          <option value="2">plataforma 2</option>
        </select>
        {errors.platform?.id && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.platform.id.message}
          </p>
        )}
      </label>
      <label htmlFor="status" className="text-[#444]">
        Tipo:
        <select
          id="status"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.platform?.id
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
      <InputField
        id="description"
        label="Descripción"
        register={register("platform.description")}
        error={errors.platform?.description}
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
