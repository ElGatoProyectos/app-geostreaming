import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { PlatformFormSchema } from "@/app/schemas/platformFormSchema";

type Inputs = {
  img_url: string
  name: string;
  description: string;
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
      <div>
        <label htmlFor="file_input" className="text-[#444]">
          Imagen
        </label>
        <input
          id="input_file"
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
            {errors.img_url?.message}
          </p>
        )}
      </div>
      {/* <InputField
        id="img_url"
        label="Imagen (URL)"//x ahora creo
        register={register("img_url")}
        error={errors.img_url}
      /> */}
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

export default PlatformForm;
