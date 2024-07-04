import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PlatformFormSchema } from "@/app/schemas/plataformFormSchema";
import { CiCircleAlert } from "react-icons/ci";

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
  const [priceInCents, setPriceInCents] = useState<string>(
    defaultValues?.price_in_cents?.toString() ?? ""
  );
  const [priceDistributorInCents, setPriceDistributorInCents] = useState<string>(
    defaultValues?.price_distributor_in_cents?.toString() ?? ""
  );
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
    setPriceInCents(defaultValues?.price_in_cents?.toString() ?? "");
    setPriceDistributorInCents(
      defaultValues?.price_distributor_in_cents?.toString() ?? ""
    );
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

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceInCents(e.target.value);
  };

  const handlePriceDistributorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceDistributorInCents(e.target.value);
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
      <div className="w-full">
        <div className="w-full text-[#444]">
          <label htmlFor="price_in_cents" className=" capitalize">
          Precio consumidor: {priceInCents && `$ ${priceInCents}`}
          </label>
          <div className="relative mt-2 ">
            <input
              type="number"
              id="price_in_cents"
              placeholder=""
              spellCheck="true"
              className={` bg-gray-100 w-full text-[#666] bg-gray-10 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.price_in_cents
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              value={priceInCents}
              {...register("price_in_cents")}
              onChange={handlePriceInputChange}
            />
            <CiCircleAlert
              className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                errors.price_in_cents ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.price_in_cents && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.price_in_cents.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <div className="w-full text-[#444]">
          <label htmlFor="price_distributor_in_cents" className=" capitalize">
          Precio Distribuidor: {priceDistributorInCents && `$ ${priceDistributorInCents}`}
          </label>
          <div className="relative mt-2 ">
            <input
              type="number"
              id="price_distributor_in_cents"
              placeholder=""
              spellCheck="true"
              
              className={` bg-gray-100 w-full text-[#666] bg-gray-10 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
                errors.price_distributor_in_cents
                  ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 "
              }`}
              value={priceDistributorInCents}
              {...register("price_distributor_in_cents")}
              onChange={handlePriceDistributorInputChange}
            />
            <CiCircleAlert
              className={`absolute text-xl right-2 top-1/2 -translate-y-1/2 font-bold text-red-500 ${
                errors.price_distributor_in_cents ? "block" : "hidden"
              } `}
            />
          </div>
        </div>
        {errors.price_distributor_in_cents && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.price_distributor_in_cents.message}
          </p>
        )}
      </div>
      {/* <InputField
        id="price_in_cents"
        label={`Precio Consumidor: ${values.price_in_cents}`}
        placeholder="10"
        type="number"
        register={register("price_in_cents", { valueAsNumber: true })}
        error={errors.price_in_cents}
      /> */}
      {/* <InputField
        id="price_distributor_in_cents"
        label={`Precio Distribuidor: ${values.price_distributor_in_cents}`}
        placeholder="10"
        type="number"
        register={register("price_distributor_in_cents", {
          valueAsNumber: true,
        })}
        error={errors.price_distributor_in_cents}
      /> */}
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
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
};

export default PlatformForm;
