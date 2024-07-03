import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { roleEditSchema } from "@/app/schemas/roleEditSchema";

type userEnabled = "y" | "n";
type Inputs = {
  role: string;
  enabled: userEnabled;
};

interface DistributorProps {
  defaultValues?: Inputs;
  onSubmit: SubmitHandler<Inputs>;
}

const DistributorForm: React.FC<DistributorProps> = ({
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
    resolver: zodResolver(roleEditSchema),
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
      <label htmlFor="type" className="text-[#444]">
        Estado del usuario:
        <select
          id="enabled"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.enabled
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("enabled")}
        >
          <option value="">Seleccione estado</option>
          <option value="y">Activo</option>
          <option value="n">Inactivo</option>
        </select>
        {errors.enabled && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.enabled.message}
          </p>
        )}
      </label>
     
      <label htmlFor="type" className="text-[#444]">
        Role:
        <select
          id="role"
          className={`mt-2 w-full text-[#666] bg-gray-50 border rounded outline-none px-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.role
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("role")}
        >
          <option value="">Seleccione Rol</option>
          <option value="USER">Consumidor</option>
          <option value="DISTRIBUTOR">Distribuidor</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.role.message}
          </p>
        )}
      </label>
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

export default DistributorForm;
