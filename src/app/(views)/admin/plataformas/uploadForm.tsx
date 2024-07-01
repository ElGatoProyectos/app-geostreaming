import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "@/app/components/forms/inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UploadFormSchema } from "@/app/schemas/uploadFormSchema";
import axios from "axios";
import Link from "next/link";

type Inputs = {
  file: string,
};

interface UploadFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

const UploadForm: React.FC<UploadFormProps> = ({
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(UploadFormSchema),
  });

  useEffect(() => {
    reset();
  }, []);


  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      console.log(data);
      await onSubmit({
        ...data,
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
      <div>
        <label htmlFor="file_input" className="text-[#444]">
          Subir Archivo
        </label>
        <input
          id="input_file"
          type="file"
          className={`w-full text-[#666] bg-gray-100 border rounded outline-none pr-6 py-1 focus:bg-white focus:border-blue-400 disabled:bg-gray-200 ${
            errors.file
              ? "border-red-500 focus:ring focus:ring-red-200 focus:border-red-500"
              : "border-gray-200 "
          }`}
          {...register("file")}
        />
        {errors.file && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.file?.message}
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
            "Subir"
          )}
        </button>
        <Link href={"/models/modeloplataforma.xlsx"} target="_blank"
              as="/models/modeloplataforma.xlsx"  download className="mx-auto hover:text-[#F2308B]">Descargar</Link>
      </div>
    </form>
  );
};

export default UploadForm;
