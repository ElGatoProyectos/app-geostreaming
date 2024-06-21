import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { productFormSchema } from "@/app/schemas/productFormSchema";
import { useEffect, useState } from "react";
import InputField from "./inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Inputs = {
  id: string;
  producto: string;
  precio_consumidor: string;
  precio_distribuidor: string;
  descripcion: string;

};

interface CategoryFormProps {
    defaultValues?: Inputs;
    onSubmit: SubmitHandler<Inputs>;
  }

const categoryForm:React.FC<CategoryFormProps> = ({ defaultValues, onSubmit}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex w-full flex-col gap-4">
        {/* (input id, solo lo puede ver no editar) */}
      <InputField
          id="id"
          label="ID"
          register={register("id")}
          error={errors.id}
          isDisabled={true}
        ></InputField>
      <InputField
          id="producto"
          label="PRODUCTO"
          register={register("producto")}
          error={errors.producto}
        ></InputField>
      <InputField
          id="precio_consumidor"
          label="PRECIO DE CONSUMIDOR"
          register={register("precio_consumidor")}
          error={errors.precio_consumidor}
        ></InputField>
      <InputField
          id="precio_distribuidor"
          label="PRECIO DISTRIBUIDOR"
          register={register("precio_distribuidor")}
          error={errors.precio_distribuidor}
        ></InputField>
       
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#277FF2] text-white mt-4 px-4 py-1 rounded hover:bg-[#4E98F9] transition-all duration-300 mx-auto "
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

export default categoryForm;
