import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { categoryFormSchema } from "@/app/schemas/categoryFormSchema";
import { useEffect, useState } from "react";
import InputField from "./inputField";

type Inputs = {
  id: string;
  category: string;
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
    resolver: zodResolver(categoryFormSchema),
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
      console.error("Error al registrar la categoría:", error);
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
          id="category"
          label="Categoria"
          register={register("category")}
          error={errors.category}
        ></InputField>
      <div className=" w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-[#277FF2] text-white mt-4 px-4 py-1 rounded hover:bg-[#4E98F9] transition-all duration-300 mx-auto "
          disabled={loading}
        >
            {loading ? "Guardando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
};

export default categoryForm;
