import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PlatformFormSchema } from "@/app/schemas/plataformFormSchema";

type PlatformStatus = "IMMEDIATE_DELIVERY" | "UPON_REQUEST";

type Inputs = {
  id?: number;
  name?: string;
  description?: string;
  img_url?: string;
  price_in_cents?: number;
  price_distributor_in_cents?: number;
  status?: PlatformStatus;
  days_duration?: number;
};

interface PlatformFormProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const PlatformForm: React.FC<PlatformFormProps> = ({
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
      {defaultValues?.id && (
        <input type="hidden" {...register("id")} value={defaultValues.id} />
      )}
      <InputField
        id="img_url"
        label="Imagen del logo (url)"
        register={register("img_url")}
        error={errors.img_url}
      />
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
          defaultValue={defaultValues?.status ?? ""}
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
        label="Precio Consumidor (centavos)"
        placeholder="$ 1000"
        type="number"
        register={register("price_in_cents", { valueAsNumber: true })}
        error={errors.price_in_cents}
      />
      <InputField
        id="price_distributor_in_cents"
        label="Precio Distribuidor (centavos)"
        placeholder="$ 1000"
        type="number"
        register={register("price_distributor_in_cents", {
          valueAsNumber: true,
        })}
        error={errors.price_distributor_in_cents}
      />
      <InputField
        id="days_duration"
        label="Días de duración"
        placeholder="30"
        type="number"
        register={register("days_duration", { valueAsNumber: true })}
        error={errors.days_duration}
      />
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
            "Ingresar"
          )}
        </button>
      </div>
    </form>
  );
};

export default PlatformForm;
